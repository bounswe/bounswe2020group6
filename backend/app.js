const express =  require("express");
const app = express();
const bodyParser =  require("body-parser");
const authRouter = require('./routers/authRouter')
const postRouter = require('./routers/postRouter')
const searchRouter = require("./routers/searchRouter")
const validateRouter = require('./routers/validateRouter')
const tokenController = require('./util/authCheck')


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', authRouter)
app.use(tokenController.authCheckMiddleware)
app.use('/post', postRouter)
app.use('/validate', validateRouter)
app.use('/search', searchRouter)


app.get('*',(req,res) => {
    res.status(404).send({error: "Not Found"})
})


app.listen(port, () => console.log("Example app listening at port", port))
