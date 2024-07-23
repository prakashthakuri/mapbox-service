const express = require('express')
import cors from 'cors';


const app = express()
app.use(cors(), express.json())
const port = 8080

app.get('/live', (req, res) => {
  res.send('Server is live')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})