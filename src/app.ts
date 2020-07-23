import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import bodyParser from "body-parser"
import path from "path"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4300

/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});*/

app.use(express.static(path.join(__dirname, 'public')));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())
app.use(todoRoutes)

const MONGO_USER = process.env.MONGO_USER || "Chasty"
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "Chascos0"
const MONGO_DB = process.env.MONGO_DB || "mibd"

const uri: string = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.zchzm.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
})