
import express, { Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './app/routers/routes';
import globalErrorhandler from './app/middleware/globalErrorhandler';
import noRoutefound from './app/middleware/notfound';


const app = express()

app.use(cors({origin:['http://localhost:3000'], credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
  res.send('Tech  service running..!')
})

app.use(globalErrorhandler)

app.use(noRoutefound)


export default app;