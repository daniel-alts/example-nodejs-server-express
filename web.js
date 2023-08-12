const express = require('express');
const { readFile } = require('fs');
const path = require('path')
const fs = require('fs').promises

const port = 3002;

const app = express();

app.use(express.static('public'));

const HomepagePath = path.join(__dirname, 'public', 'index.html')
const NotFoundPagePath = path.join(__dirname, 'public', '404.hmtl')

const handleHomepage = async (req, res) => {
    const file = await fs.readFile(HomepagePath)
    res.status(200).sendFile(file)
}


app.get('/index.html', handleHomepage)

app.get('*', async (req, res) => {
    try {
        const file = await fs.readFile(NotFoundPagePath)
        res.sendFile(file)
    } catch(error) {
        console.log(error)
    }
})



app.listen(port, () => console.log(`listening on port: ${port}`))
