const elLoginform = document.querySelector('.loginForm')
const elLoginInput = document.querySelector('.login')
const elPasswordInput = document.querySelector('.password')
const elregistr = document.querySelector('#registr')
let loader = document.querySelector('.loadingWrapper')
const select = document.querySelector('.select')
const registerForm = document.querySelector('.registrationForm')
const logo = document.querySelector('.logo')
const error = document.querySelector('.error')

elLoginform.addEventListener('submit', (evt) => {
    let logindata = {}
    evt.preventDefault()
    logindata.mainadmin_login = elLoginInput.value
    logindata.mainadmin_password = elPasswordInput.value
    fetch('https://mokhir.herokuapp.com/admin', {
            method: 'POST',
            body: JSON.stringify(logindata),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json2 => {
            if(json2 == 'false'){
                error.textContent = 'Invalid login or password'
            }else{
                window.localStorage.setItem('token', json2)
                window.location.replace("courses.html");
            }
        })
        .catch(err => console.log(err));
})

