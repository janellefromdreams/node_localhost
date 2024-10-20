# Node.js Localhost Project

This is a simple web application built with Node.js, Express, and MySQL that allows users to input an email address, 
which is then checked against a MySQL database to see if it exists. The result is returned to the user through a WebSocket connection.

## Features

- interface with an input field and a button.
- Real-time checking of email existence in the database using WebSockets.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Frontend**: HTML, JavaScript
- **WebSocket**: For real-time communication

## installations:

- npm init -y
- npm install express mysql2 socket.io
