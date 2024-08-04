let express = require('express')
let session = require('express-session')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')

let randomstring = require("randomstring")

let app = express()

//Utilisation de socket.io
let http = require('http').Server(app)
let io = require('socket.io')(http,{path:"/api/ws",cors:{origin:'*',methods:['GET','POST','PUT','DELETE']}})

//Middleware
// cookie parser middleware
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


let escape_html = (t)=>{
    return t.replace(/'/g, "\\'").replace(/"/g, "\\\"")
}


let _state = {
    uti_role:{'admin':"Administrateur","normal":"Utilisateur normal"},
    project_state:{'new':"A faire","in_progress":"En cours","finish":"Terminé"},
    project_state_default:"new"
}

app.use((req,res,next)=>{
    req.io = io
    req.escape_html = escape_html
    req.hash_salt = 10 //salt de bcrypt
    req.randomstring = randomstring
    req.state = _state
    next()
})

let init = async () =>{
    let db = require('./models/data')
    try {
        const t = await Data.execute('data')
    } catch (e) {
        console.error(e)
    }
}
//init()

io.on('connection',(socket)=>{})


app.use('/api',require('./routes/api.route'))
http.listen(4040)







