const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to device management API!!'})
})

const routes = require('./api/routes')
routes.categoryRoutes(app)
routes.deviceRoutes(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
