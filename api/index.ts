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

// app.use(myLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/public', express.static('public'))
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

app.listen(port, async () => {
  console.log('Server running at http://localhost:' + port)
  // connectDB()
})
connectDB()
app.use((res, req, next) => {
  const error = createHttpError(404, 'Router no found')
  next(error)
})

app.use(errorHandler)
