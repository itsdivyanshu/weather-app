console.log('Client side javascript is running')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.getElementById('msg-1')
const messageTwo = document.getElementById('msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    url = '/weather?address=' + encodeURIComponent(location)

    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error)
                messageOne.innerHTML = data.error
            else
            {
                messageOne.innerHTML = data.location
                messageTwo.innerHTML = data.forecast
            }
        })
    })
})