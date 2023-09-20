const { CronJob } = require('cron');
const { Connection, Device, Sms } = require('huawei-lte-api');
require('dotenv').config();

const connection = new Connection(process.env.CONNECT_URL);

let lastDate

const cronTime = process.env.CRON_TIME || '*/10 * * * * *'

const job = new CronJob(
  // every 10 seconds
  cronTime,
  async function() {
    if (lastDate) {
      const sms = new Sms(connection)
      const { Messages: { Message: msgs } } = await sms.getSmsList()

      const newMsgs = msgs.filter(msg => new Date(msg.Date) > lastDate)

      if (newMsgs.length > 0) {
        console.log('new messages', newMsgs)
        await sendLineNotify(newMsgs.map(msg => `${msg.Date}\n${msg.Content}`).join('\n'), process.env.LINE_NOTIFY_TOKEN)
      }

      lastDate = new Date(msgs[0].Date)
    }
  },
  null,
  false,
)

// send line notify
async function sendLineNotify(message, token) {
  const res = await fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
    body: new URLSearchParams({
      message: '\n' + message,
    }),
  })

  return res
}

async function main() {
  await connection.ready

  const sms = new Sms(connection)

  const { Messages: { Message: msgs } } = await sms.getSmsList()

  lastDate = new Date(msgs[0].Date)

  job.start()
}

main()
