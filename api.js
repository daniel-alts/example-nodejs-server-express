const express = require('express');
const studentsrouter = require('./api.router');

const port = 3002;

const app = express()

app.use(express.json()) // body parser

app.use('/students', studentsrouter)

app.get('*', (req, res) => {
    res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})


app.listen(port, () => console.log(`listening on port: ${port}`))