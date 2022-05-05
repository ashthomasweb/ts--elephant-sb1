// server.ts

const express = require("express")
const path = require('path')
const app = express()
let port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'build')))

app.listen(port, () => console.log(`Server accessible at port ${port}.`))

// END of document
