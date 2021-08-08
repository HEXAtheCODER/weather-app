const form = document.querySelector('form');
const inputField = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const currentLocation = document.querySelector('#my-current-location');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let value = inputField.value

    const url = '/weather?address=' + value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageOne.style.color = 'black'

    fetch(url).then(response => {
        response.json().then((data) => {
            if (data.error) { 
                messageOne.textContent = data.error
                messageOne.style.color = 'red'
            } else {
                messageOne.textContent = value
                messageTwo.textContent = data.data.forecast
                messageTwo.style.color = 'green'
            }    
        })
    })
})

currentLocation.addEventListener('click' , ()=>{
    
    navigator.geolocation.getCurrentPosition((pos)=>{
        const urlForCurrentLocation = `/weather/currentLocation?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}`

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        messageOne.style.color = 'black'

        fetch(urlForCurrentLocation).then(response => {
            response.json().then((data) => {
                if (data.error) { 
                    messageOne.textContent = data.error
                    messageOne.style.color = 'red'
                } else {
                    messageOne.textContent = ''
                    messageTwo.textContent = data.data.forecast
                    messageTwo.style.color = 'green'
                }    
            })
        })

    });
})
