let buttonElement = document.querySelector('button')
let nameInput = document.getElementById('name')
let surnameInput = document.getElementById('surname')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPasswordInput = document.getElementById('confirm-password')
let corFundoValidado = "rgb(223, 237, 236)" //'#dfedec'

//função para limpar campos

function limparCampos(){
    nameInput.value = ""
    surnameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
    confirmPasswordInput.value = ""
}

//-----------------------Sing up user object--------------------------
let signUpUserObject = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': ''
}

//-----------------------Name validations--------------------------
nameInput.addEventListener('keyup', event => {
    let nameInfo = document.getElementById('name-info')
    if (nameInput.value.length < 2) {
        if (!nameInput.value.length) {
            nameInfo.style.visibility = 'visible'
            nameInfo.innerText = 'Needed field'
        } else {
            nameInfo.style.visibility = 'visible'
            nameInfo.innerText = 'Insert your first name'
        }
        if (event.key) {
            nameInput.style.boxShadow = '0 0 0 2px #CAEDEB'
            nameInput.style.backgroundColor = '#fff'
        }
    } else {
        nameInfo.style.visibility = 'hidden'
        nameInput.style.boxShadow = 'none'
        nameInput.style.backgroundColor = corFundoValidado
    }
    buttonValidation(nameInput.style.backgroundColor, surnameInput.style.backgroundColor, emailInput.style.backgroundColor, confirmPasswordInput.style.backgroundColor)
})

nameInput.addEventListener('blur', () => {
    let nameInfo = document.getElementById('name-info')
    if (nameInput.value.length < 2) {
        nameInfo.style.visibility = 'visible'
        nameInput.style.boxShadow = '0 0 0 2px #EB5E5E'
        nameInput.style.backgroundColor = 'hsl(0, 49%, 90%)'
    } else {
        nameInfo.style.visibility = 'hidden'
        nameInput.style.boxShadow = 'none'
    }
})

//-----------------------Surname validations--------------------------
surnameInput.addEventListener('keyup', event => {
    let surnameInfo = document.getElementById('surname-info')
    if (surnameInput.value.length < 2) {
        if (!surnameInput.value.length) {
            surnameInfo.style.visibility = 'visible'
            surnameInfo.innerText = 'Needed field'
        } else {
            surnameInfo.style.visibility = 'visible'
            surnameInfo.innerText = 'Insert your last surname'
        }
        if (event.key) {
            surnameInput.style.boxShadow = '0 0 0 2px #CAEDEB'
            surnameInput.style.backgroundColor = '#fff'
        }
    } else {
        surnameInfo.style.visibility = 'hidden'
        surnameInput.style.boxShadow = 'none'
        surnameInput.style.backgroundColor = corFundoValidado
    }
    buttonValidation(nameInput.style.backgroundColor, surnameInput.style.backgroundColor, emailInput.style.backgroundColor, confirmPasswordInput.style.backgroundColor)
})

surnameInput.addEventListener('blur', () => {
    let surnameInfo = document.getElementById('name-info')
    if (surnameInput.value.length < 2) {
        surnameInfo.style.visibility = 'visible'
        surnameInput.style.boxShadow = '0 0 0 2px #EB5E5E'
        surnameInput.style.backgroundColor = 'hsl(0, 49%, 90%)'
    } else {
        surnameInfo.style.visibility = 'hidden'
        surnameInput.style.boxShadow = 'none'
    }
})

//-----------------------E-mail validations--------------------------
emailInput.addEventListener('keyup', event => {
    let infoEmail = document.getElementById('email-info')
    if (!emailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        if (emailInput.value == ``) {
            infoEmail.style.visibility = 'visible'
            infoEmail.innerText = `Needed field`
        } else {
            infoEmail.innerText = `Insert a valid e-mail`
            infoEmail.style.visibility = 'visible'
        }
        if (event.key) {
            emailInput.style.boxShadow = '0 0 0 2px #CAEDEB'
            emailInput.style.backgroundColor = '#fff'
        }
    } else {
        emailInput.style.boxShadow = 'none'
        emailInput.style.backgroundColor = corFundoValidado
        infoEmail.style.visibility = 'hidden'
    }
    buttonValidation(nameInput.style.backgroundColor, surnameInput.style.backgroundColor, emailInput.style.backgroundColor, confirmPasswordInput.style.backgroundColor)
})

emailInput.addEventListener('blur', () => {
    let infoEmail = document.getElementById('email-info')
    if (!emailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        infoEmail.style.visibility = 'visible'
        emailInput.style.boxShadow = '0 0 0 2px #EB5E5E'
        emailInput.style.backgroundColor = 'hsl(0, 49%, 90%)'
    } else {
        infoEmail.style.visibility = 'hidden'
        emailInput.style.boxShadow = 'none'
    }
})

//-----------------------Password validations--------------------------
passwordInput.addEventListener('keyup', event => {
    let passwordInfo = document.getElementById('password-info')
    if (passwordInput.value.length < 8) {
        if (passwordInput.value.length == ``) {
            passwordInfo.innerText = `Needed field`
            passwordInfo.style.visibility = 'visible'
        } else if (passwordInput.value.length >= 1 && passwordInput.value.length < 8) {
            passwordInfo.innerText = `Password must be at least 8 characters`
            passwordInfo.style.visibility = 'visible'
        }
        if (event.key) {
            passwordInput.style.boxShadow = '0 0 0 2px #CAEDEB'
            passwordInput.style.backgroundColor = '#fff'
        }
    } else {
        passwordInput.style.boxShadow = 'none'
        passwordInput.style.backgroundColor = corFundoValidado
        passwordInfo.style.visibility = 'hidden'
    }
})

passwordInput.addEventListener('blur', () => {
    let passwordInfo = document.getElementById('password-info')
    if (passwordInput.value.length < 8) {
        passwordInfo.style.visibility = 'visible'
        passwordInput.style.boxShadow = '0 0 0 2px #EB5E5E'
        passwordInput.style.backgroundColor = 'hsl(0, 49%, 90%)'
    } else {
        passwordInfo.style.visibility = 'hidden'
        passwordInput.style.boxShadow = 'none'
    }
})

//-----------------------Confirm Password validations--------------------------
confirmPasswordInput.addEventListener('keyup', event => {
    let confirmPasswordInfo = document.getElementById('confirm-password-info')
    if (confirmPasswordInput.value != passwordInput.value) {
        if (passwordInput.value.length == ``) {
            confirmPasswordInfo.innerText = `Needed field`
            confirmPasswordInfo.style.visibility = 'visible'
        } else {
            confirmPasswordInfo.innerText = `Passwords are different`
            confirmPasswordInfo.style.visibility = 'visible'
        }
        if (event.key) {
            confirmPasswordInput.style.boxShadow = '0 0 0 2px #CAEDEB'
            confirmPasswordInput.style.backgroundColor = '#fff'
        }
    } else {
        confirmPasswordInput.style.boxShadow = 'none'
        confirmPasswordInput.style.backgroundColor = corFundoValidado
        confirmPasswordInfo.style.visibility = 'hidden'
    }
    buttonValidation(nameInput.style.backgroundColor, surnameInput.style.backgroundColor, emailInput.style.backgroundColor, confirmPasswordInput.style.backgroundColor)
})

confirmPasswordInput.addEventListener('blur', () => {
    let confirmPasswordInfo = document.getElementById('confirm-password-info')
    if (confirmPasswordInput.value != passwordInput.value) {
        confirmPasswordInfo.style.visibility = 'visible'
        confirmPasswordInput.style.boxShadow = '0 0 0 2px #EB5E5E'
        confirmPasswordInput.style.backgroundColor = 'hsl(0, 49%, 90%)'
    } else {
        confirmPasswordInfo.style.visibility = 'hidden'
        confirmPasswordInput.style.boxShadow = 'none'
    }
})

//------------------------Button validations----------------------------
function buttonValidation(nameStyle, surnameStyle, emailStyle, passwordStyle) {
    if (nameStyle == corFundoValidado && surnameStyle == corFundoValidado && emailStyle == corFundoValidado && passwordStyle == corFundoValidado) {
        buttonElement.removeAttribute('disabled')
        buttonElement.style.cursor = 'pointer'
        buttonElement.style.backgroundColor = '#fbb232'
    } else {
        buttonElement.setAttribute('disabled', true)
        buttonElement.style.cursor = 'not-allowed'
        buttonElement.style.backgroundColor = 'rgb(251, 217, 159)'
    }
}

//------------------------Button action----------------------------
buttonElement.addEventListener('click', event => {
    let name = removeBlankSpace(nameInput.value)
    let surname = removeBlankSpace(surnameInput.value)
    let email = removeBlankSpace(emailInput.value)
    let password = removeBlankSpace(passwordInput.value)

    signUpUserObject.firstName = name
    signUpUserObject.lastName = surname
    signUpUserObject.email = email
    signUpUserObject.password = password

    let signUpUserObjectJSON = JSON.stringify(signUpUserObject)

    //aqui esta o spinner
    mostrarSpinner()

    let configRequest = {
        method: "POST", //método HTTP
        headers: { //Cabeçalho da requisição
            "Content-type": "Application/json"
        },
        body: signUpUserObjectJSON //Corpo da requisição
    }

    setTimeout(() => {
        fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users', configRequest)
            .then(resultado => {
                //Verifica se ocorreu sucesso ao fazer o login
                if (resultado.status == 201 || resultado.status == 200) {
                    return resultado.json();
                } else {
                    //Lança uma exceção em caso de erro no login
                    throw resultado;
                }
            })
            .then(resultado => {
                console.log(resultado);
                Swal.fire({
                    icon: 'success',
                    title: 'Conta Criada!',
                    text: 'Cadastro feito com sucesso!'
                })
                //alert("Cadastro Feito com Sucesso!")
                ocultarSpinner()
            })
            .catch(erro => {
                console.log(erro);
                if(erro.status == 400){
                 Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Usuario já registrado!`
                })

                }
                

                ocultarSpinner()
            })
    }, 1000);
    limparCampos()
})

//------------------------function to remove blank spaces from any border----------------------------
function removeBlankSpace(text) {
    return text.trim()
}