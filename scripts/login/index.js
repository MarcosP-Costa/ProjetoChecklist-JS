let buttonElement = document.getElementById('login-button')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let corFundoValidado = "rgb(223, 237, 236)" //'#dfedec'

function limparCampos() {
    emailInput.value = ""
    passwordInput.value = ""
}

//-----------------------User object--------------------------
let userObject = {
    'email': '',
    'password': ''
}

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
    buttonValidation(emailInput.style.backgroundColor, passwordInput.style.backgroundColor)
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
    buttonValidation(emailInput.style.backgroundColor, passwordInput.style.backgroundColor)
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

//------------------------Button validations----------------------------
function buttonValidation(emailStyle, passwordStyle) {
    if (emailStyle == corFundoValidado && passwordStyle == corFundoValidado) {
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
    mostrarSpinner()

    let email = removeBlankSpace(emailInput.value)
    let password = removeBlankSpace(passwordInput.value)

    userObject.email = email
    userObject.password = password

    let userObjectJSON = JSON.stringify(userObject)
    // console.log(userObjectJSON)

    event.preventDefault()

    let configRequest = {
        method: "POST", //método HTTP
        headers: { //Cabeçalho da requisição
            "Content-type": "Application/json"
        },
        body: userObjectJSON //Corpo da requisição
    }
    setTimeout(() => {
        fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login', configRequest)
            .then(resultado => {
                if (resultado.status == 200 || resultado.status == 201) {
                    return resultado.json()
                } else if (resultado.status == 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'O email e/ou a senha estão erradas!',
                    })
                    throw resultado
                } else if (resultado.status == 404) {
                    Swal.fire({
                        icon: 'question',
                        title: 'Oops...',
                        text: 'Parece que você não possui uma conta 😥',
                    })
                    throw resultado
                } else {
                    throw resultado
                }
            })
            .then(resultado => {
                console.log(resultado);
                sessionStorage.setItem("jwt", resultado.jwt)
                location.href = "tarefas.html";
            })
            .catch(erro => {
                console.log(erro);
                ocultarSpinner()
            })
    }, 1000);
    limparCampos()
})

//------------------------function to remove blank spaces from any border----------------------------
function removeBlankSpace(text) {
    return text.trim()
}

//implementar função de buscar foto do github

let botaoGithub = document.getElementById("github")
let imagem;

botaoGithub.addEventListener("click", event =>{
    event.preventDefault()
    pegarFotoGitHub()
})

function pegarFotoGitHub (){
    Swal.fire({
        title: 'Digite seu usuario do GitHub',
        text: 'Caso queira usar a mesma foto de perfil',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Não achamos seu perfil 😣`
              )
              console.log(error);
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `Salvamos sua foto ${result.value.login} 😎`,
            imageUrl: result.value.avatar_url
          })
          salvaFotoGithub(result.value.avatar_url)
        }
      })
}

function salvaFotoGithub(param){
    sessionStorage.setItem("fotoGitHub", param)
    imagem = sessionStorage.getItem("fotoGitHub");
    console.log(imagem);
}
