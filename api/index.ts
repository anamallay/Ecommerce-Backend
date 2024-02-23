import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRouter from '../src/routers/authRoute'
import usersRouter from '../src/routers/usersRoute'
import ordersRouter from '../src/routers/ordersRoute'
import categoriesRouter from '../src/routers/categoriesRoute'
import productsRouter from '../src/routers/productsRoute'
import myLogger from '../src/middlewares/logger'
import { errorHandler } from '../src/middlewares/errorHandler'
import { createHttpError } from '../src/util/createHttpError'
import cors from 'cors'
import contactRoute from '../src/routers/contactRoute'
import { dev } from '../src/config'
import { connectDB } from '../src/config/db'

const app: Application = express()
const port: number = dev.app.port

app.use(myLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/public', express.static('public'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  connectDB()
  next()
})
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.get('/', (req, res) => {
  res.send('healthe checkup')
})
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/contactus', contactRoute)

// app.listen(port, async () => {
//   console.log('Server running at http://localhost:' + port)
//   // connectDB()
// })
// // connectDB()
// Correct placement of connectDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
  });
});

app.use((req, res, next) => {
  const error = createHttpError(404, 'Route not found')
  next(error)
})
app.use(errorHandler)
