
'use strict'

require('dotenv').config()
const app = require('./server')

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}...`))