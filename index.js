import express from 'express'
import { ConnectDB } from './Config/db.js';
import AuthRoute from './Route/AuthRoute.js';
import TaskRoute from './Route/TaskRoute.js'
const app = express()

app.use(express.json());

ConnectDB();

app.use('/api/v1/auth', AuthRoute);

app.use('/api/v1/auth', TaskRoute);

app.get('/', function (req, res) {
    res.send('Hello World')
})

const PORT = 8080
app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`)
})
