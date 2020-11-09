const express =  require("express");
const app = express();
const bodyParser =  require("body-parser");
const authCheck = require('./util/authCheck')
const firstRouter = require('./routers/router_demo_1')
const secondRouter = require('./routers/router_demo_2')

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(authCheck.authCheckMiddleware)    //checks if logged in when uncommented

app.use('/foo', firstRouter)
app.use('/boo', secondRouter)

app.get('*',(req,res) => {
    res.send(404)
})


app.listen(port, () => console.log("Example app listening at port", port))
