import * as routes from './modules/routes.js'
import { globalResponse } from '../src/middlewares/globalResponse.js'
import cors from 'cors'; 



export const initiateApp = (express,app)=>{


const port = process.env.PORT


app.use(express.json())

app.use(cors());


app.use('/api/user',routes.userRouter)
app.use('/api/card',routes.cardRouter)
app.use('/api/follow',routes.followersRouter)
app.use('/api/category',routes.categoryRouter)
app.use('/api/plan',routes.planRouter)
app.use('/api/blog',routes.blogRouter)
app.use('/api/notification',routes.notificationRouter)
app.use('/api/promocode',routes.promocodeRouter)



app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not Found' })
})


app.use(globalResponse)


const expressServer=app.listen(port, () => console.log(`app listening on port ${port}!`))

}