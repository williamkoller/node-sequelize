const express = require('express')
const routers = require('./routes/routes')
require('./database')
const app = express()
const port = 3333

app.use(express.json())
app.use(routers)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
