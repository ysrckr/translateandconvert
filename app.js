const express = require("express")
require("dotenv").config()
const cors = require("cors")
const axios = require("axios").default


// Initialize Express
const app = express()

// Enable CORS
app.use(cors())

express.static('public')
app.set('views', './public/views')
app.set('view engine', 'ejs')

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/',  (req, res) => {
 
    var options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'accept-encoding': 'application/gzip',
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': process.env.API_HOST
      },
      data: {q: 'Hello, world!', target: 'tr', source: 'en'}
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
)