const express = require('express')
const ffStalk = require('./ffStalk')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('public'))

app.get('/api/stalk/:uid', async (req, res) => {
    try {
        const data = await ffStalk(req.params.uid)
        res.json(data)
    } catch (e) {
        res.status(500).json({ error: 'Gagal mengambil data' })
    }
})

app.listen(3000, () => console.log('Server ready at http://localhost:3000'))
