const express = require('express')
require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')

// Initialize Express
const app = express()

// Enable CORS

app.use(express.static(__dirname + '/public'))
app.set('views', './public/views')
app.set('view engine', 'ejs')

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const translate = async text => {
	var subscriptionKey = process.env.API_KEY
	var endpoint = 'https://api.cognitive.microsofttranslator.com'

	// Add your location, also known as region. The default is global.
	// This is required if using a Cognitive Services resource.
	var location = 'global'

	try {
		const response = await axios({
			baseURL: endpoint,
			url: '/translate',
			method: 'post',
			headers: {
				'Ocp-Apim-Subscription-Key': subscriptionKey,
				'Ocp-Apim-Subscription-Region': location,
				'Content-type': 'application/json',
				'X-ClientTraceId': uuidv4().toString(),
			},
			params: {
				'api-version': '3.0',
				from: 'en',
				to: ['tr'],
			},
			data: [
				{
					text: text,
				},
			],
			responseType: 'json',
		})
		const data = await response.data[0].translations[0].text
		return data
	} catch (err) {
		console.error(err)
	}
}

const convert = inch => {
	return inch * 2.54
}

app.get('/', (req, res) => {
	res.render('index')
})
app.post('/translate', async (req, res) => {
	try {
		const trans = await translate(req.body.desc)
		const conv = convert(req.body.measure)
		res.status(200).json({ trans, conv })
	} catch (err) {
		console.error(err)
	}
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
