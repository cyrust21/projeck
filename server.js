const express = require('express')
const ffStalk = require('./ffStalk')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => res.send('FFStalk API is Running!'))

app.get('/api/stalk/:uid', async (req, res) => {
  try {
    const data = await ffStalk(req.params.uid)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message || 'Fetch error' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running on port ${PORT}`))
