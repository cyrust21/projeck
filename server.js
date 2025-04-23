const express = require('express')
const cors = require('cors')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

app.use(cors())

app.get('/api/stalk/:uid', async (req, res) => {
  try {
    const formdata = new URLSearchParams()
    formdata.append('uid', req.params.uid)

    const { data } = await axios.post(
      'https://tools.freefireinfo.in/profileinfo.php?success=1',
      formdata.toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "origin": "https://tools.freefireinfo.in",
          "referer": "https://tools.freefireinfo.in/profileinfo.php?success=1",
          "user-agent": "Mozilla/5.0"
        }
      }
    )

    const $ = cheerio.load(data)
    const result = $('div.result').html()?.split('<br>')
    if (!result || result.length < 10) return res.status(404).json({ error: 'Invalid UID' })

    const name = result[0].split('Name: ')[1]
    const level = result[3].split(': ')[1]
    res.json({ name, level }) // Simpel, bisa kamu perluas lagi
  } catch (e) {
    res.status(500).json({ error: 'Gagal fetch data', details: e.message })
  }
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
