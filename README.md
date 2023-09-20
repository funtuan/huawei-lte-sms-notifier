# Huawei LTE SMS Notifier

This is a Node.js application that uses the Huawei LTE API and Line Notify to monitor SMS messages on a Huawei LTE device and send notifications.

# Installation

Download or clone this repository to your local machine.
Run npm install in the project directory to install dependencies.
Copy the .env.example file and rename it to .env.
Modify the settings in the .env file according to your needs.

# Configuration

In the .env file, you need to set the following parameters:

CONNECT_URL: The connection URL for your Huawei LTE device.
ex. http://admin:password@192.168.8.1/

LINE_NOTIFY_TOKEN: The access token for your Line Notify account.

# Usage

Run npm start in the project directory to start the application. The program will check for new SMS messages every 10 seconds and send a notification to your Line Notify account if there are any.

# License

This project is licensed under the MIT License.