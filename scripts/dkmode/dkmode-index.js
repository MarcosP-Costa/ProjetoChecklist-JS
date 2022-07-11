const loginBtn = document.getElementById('login-button')
const github = document.getElementById('github')
const chk = document.getElementById('chk');
const forms = document.getElementById('forms')
const emailTitle = document.getElementById('email-title');
const passwordTitle = document.getElementById('password-title');
const formTitle = document.getElementById('form-title');
// const nameInput = document.getElementById('name');
// const surnameInput = document.getElementById('surname');
// const emailInput = document.getElementById('email');
// const passworInput = document.getElementById('password');
// const confirmPasswordInput = document.getElementById('confirm-password');

const msgCrt = document.getElementById('msgCrt')

chk.addEventListener('change', (event) => {
    loginBtn.classList.toggle('dark');
    github.classList.toggle('dark');
    document.body.classList.toggle('dark');
    forms.classList.toggle('dark');
    emailTitle.classList.toggle('dark')
    passwordTitle.classList.toggle('dark');
    msgCrt.classList.toggle('dark');
    formTitle.classList.toggle('dark')

});

