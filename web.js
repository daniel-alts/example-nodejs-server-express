const express = require('express');
const { readFile } = require('fs');
const path = require('path')
const fs = require('fs').promises

const port = 3002;

const server = express();

server.use(express.static('public'));

const HomepagePath = path.join(__dirname, 'public', 'index.html')
const NotFoundPagePath = path.join(__dirname, 'public', '404.hmtl')

const handleHomepage = async (req, res) => {
    const file = await fs.readFile(HomepagePath)
    res.status(200).sendFile(file)
}


server.get('/index.html', handleHomepage)

server.get('*', async (req, res) => {
    try {
        const file = await fs.readFile(NotFoundPagePath)
        res.sendFile(file)
    } catch(error) {
        console.log(error)
    }
})



server.listen(port, () => console.log(`listening on port: ${port}`))
