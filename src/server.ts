import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { dev } from './config'
import { connectDB } from './config/db'
import authRouter from './routers/authRoute'
import productsRouter from './routers/productsRoute'
import usersRouter from './routers/usersRoute'
import ordersRouter from './routers/ordersRoute'
import categoriesRouter from './routers/categoriesRoute'
import myLogger from './middlewares/logger'
import { errorHandler } from './middlewares/errorHandler'
import { createHttpError } from './util/createHttpError'
import cors from 'cors'
import contactRoute from './routers/contactRoute'

const app: Application = express()
const port: number = dev.app.port

app.use(myLogger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/public', express.static('public'))
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/contactus', contactRoute)

app.listen(port, async () => {
  console.log('Server running at http://localhost:' + port)
})
connectDB()
app.use((res, req, next) => {
  const error = createHttpError(404, 'Router no found')
  next(error)
})

app.use(errorHandler)
