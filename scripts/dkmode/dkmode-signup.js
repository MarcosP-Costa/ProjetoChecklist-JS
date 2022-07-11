const createBtn = document.getElementById('create-button')
const chk = document.getElementById('chk');
const forms = document.getElementById('forms')
const nameTitle = document.getElementById('name-title');
const surnameTitle = document.getElementById('surname-title');
const emailTitle = document.getElementById('email-title');
const passwordTitle = document.getElementById('password-title');
const confirmPassword = document.getElementById('confirm-password-title');
const formTitle = document.getElementById('form-Title');
const mail = document.getElementById('email')
const pass = document.getElementById('password')
const msgBtn = document.getElementById('msgBtn')




chk.addEventListener('change', (event) => {
    createBtn.classList.toggle('dark');
    document.body.classList.toggle('dark');
    forms.classList.toggle('dark');
    nameTitle.classList.toggle('dark');
    surnameTitle.classList.toggle('dark');
    emailTitle.classList.toggle('dark')
    passwordTitle.classList.toggle('dark');
    confirmPassword.classList.toggle('dark');
    formTitle.classList.toggle('dark');
    msgBtn.classList.toggle('dark');

});
