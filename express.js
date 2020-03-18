const express =require('express')
const bodyParser =require('body-parser')
const cookieParser =require('cookie-parser')
const compress =require('compression')
const cors =require('cors')
const helmet =require('helmet')
const userRoutes =require('./routes/user.routes')

//comment out before building for production
// const devBundle =require('./devBundle')
const app = express()

// //comment out before building for production
// devBundle.compile(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', userRoutes)

app.get('/', (req, res) =>{
  res.send('server is up at port 8000')
})
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }
})

module.exports =  app;
