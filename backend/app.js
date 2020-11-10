const express =  require("express");
const app = express();
const bodyParser =  require("body-parser");
const authCheck = require('./util/authCheck')
const loginRouter = require('./routers/login_router')
const registerRouter = require('./routers/register_router')

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(authCheck.authCheckMiddleware)    //checks if logged in when uncommented

app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.get('*',(req,res) => {
    res.send(404)
})


app.listen(port, () => console.log("Example app listening at port", port))
