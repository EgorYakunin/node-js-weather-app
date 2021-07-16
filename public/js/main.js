console.log('client side js file')

const weatherForm = document.querySelector('#weatherForm')
const weatherInput = document.querySelector('#weatherInput')
const temperature = document.querySelector('#temperature')
const weatherDescription = document.querySelector('#weatherDescription')
const cloudCover = document.querySelector('#cloudCover')
const errorMsg = document.querySelector('#err-msg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let location = weatherInput.value

    location ? fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return errorMsg.textContent = data.error
            }
            errorMsg.textContent = ''
            console.log(data)
            temperature.textContent = data.temperature + '°C'
            weatherDescription.textContent = 'Weather condition: ' + data.weatherDescription
            cloudCover.textContent = 'Cloud cover: ' + data.cloudCover + '%'

        })
    }) : errorMsg.textContent = 'Please enter your location'

})
