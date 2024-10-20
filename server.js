const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '0000', 
    database: 'mydb' 
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к MySQL:', err);
        return;
    }
    console.log('Подключено к MySQL');
});

app.use(express.static('public'));
app.use(express.json());

// WebSocket
io.on('connection', (socket) => {
    console.log('Новое соединение');

    socket.on('checkEmail', (email) => {
        const query = 'SELECT * FROM user WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                console.error('Ошибка выполнения запроса:', err);
                socket.emit('response', 'Error');
                return;
            }
            if (results.length > 0) {
                socket.emit('response', 'Yes');
            } else {
                socket.emit('response', 'No');
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключен');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
