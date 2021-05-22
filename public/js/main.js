const form = document.querySelector('#form')
const descList = document.querySelector('.list-desc')
const measureList = document.querySelector('.list-measure')

const addDescription = async (desc, measure) => {
	const res = await axios.post('http://localhost:5000/translate', {
		desc,
		measure,
	})
	const translation = res.data.trans
	const convertion = res.data.conv
	return {
		translation,
		convertion,
	}
}

const capitalizeFirstLetter = string => {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

form.addEventListener('submit', async e => {
	e.preventDefault()
	const desc = e.target.description.value
	const measure = e.target.measurement.value
	const result = await addDescription(desc, measure)
	const htmlDesc = `<li class="list-item">
				${capitalizeFirstLetter(result.translation)}			
	</li>`
	const htmlMeasure = `<li class="list-item">
			${result.convertion}
	</li>`

	descList.innerHTML += htmlDesc
	measureList.innerHTML += htmlMeasure

	e.target.description.value = ''
	e.target.measurement.value = ''
	e.target.description.focus()
})
