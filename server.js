const express = require('express')
const cors = require('cors')
const ffStalk = require('./ffStalk') // fungsi yang kamu buat

const app = express()
app.use(cors())

app.get('/api/ffstalk/:uid', async (req, res) => {
  try {
    const data = await ffStalk(req.params.uid)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
