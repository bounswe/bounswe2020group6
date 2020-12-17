require('dotenv').config()
const express =  require("express");
const cors = require("cors")
const fileUpload = require('express-fileupload');
const path = require("path")

const app = express();
const bodyParser =  require("body-parser");
const authRouter = require('./routers/authRouter')
const postRouter = require('./routers/postRouter')
const searchRouter = require("./routers/searchRouter")
const validateRouter = require('./routers/validateRouter')
const profileRouter = require('./routers/profileRouter')
const followRouter = require('./routers/followRouter')
const fileRouter = require('./routers/fileRouter')
const collabRouter = require('./routers/collabRouter')
const tokenController = require('./util/authCheck')
const autoCompleteRouter = require('./routers/autoCompleteRouter')
//const path = require("path")


const port = process.env.PORT || 3000;

app.use('/profile',fileUpload({
    createParentPath: true
}))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/auth', authRouter)
app.use(tokenController.authCheckMiddleware)
app.use('/validate', validateRouter)
app.use(tokenController.validationCheckMiddleware)
app.use('/post', postRouter)
app.use('/search', searchRouter)
app.use('/profile',profileRouter)
app.use('/follow', followRouter)
app.use('/autoComplete', autoCompleteRouter)
app.use('/file',fileRouter)
app.use('/collab', collabRouter)

app.use('/static', express.static(path.join(__dirname,'./uploads')));

app.get('*',(req,res) => {
    res.status(404).send({error: "Not Found"})
})


app.listen(port, () => console.log("Example app listening at port", port))
