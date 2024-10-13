
import express, { Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './app/routers/routes';
import globalErrorhandler from './app/middleware/globalErrorhandler';
import noRoutefound from './app/middleware/notfound';
import config from './app/config/config';


const app = express()

app.use(cors({ origin: [`${config.OriginUrl}`], credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
  res.send('Tech  service running..!')
})

app.use(globalErrorhandler)

app.use(noRoutefound)


export default app;