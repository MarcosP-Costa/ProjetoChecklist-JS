let tokenJwt;
let usuarioGithub;
let finalizar = document.getElementById('closeApp')
let botaoNovaTarefa = document.getElementById('botaoNovaTarefa')


// ----------------objeto nova tarefa -----------------
let novaTarefaObject = {
    'description': '',
    'completed': ''
}

/* Função é chamada automaticamente ao carregar a página de tarefas */
onload = function () {

    //Busca o token do usuário no Storage
    tokenJwt = sessionStorage.getItem("jwt");


    //Verifica se o token existe/é valido
    if (!tokenJwt) { //Caso NÃO seja...

        Swal.fire({
            icon: 'error',
            title: 'Opa Opa Opa',
            text: `Você não tem permissão de acesso`
        })
        //Direciona o usuário para a tela de Login novamente
        location.href = "index.html";

    } else { //Caso SEJA válido

        //Chama a função que busca os dados do usuário na API
        buscaDadosUsuario()

        //Chama a função que busca as tarefas do usuário na API
        buscarTarefas()



    }
}

/* Função do tipo assincrona */
async function buscaDadosUsuario() {
    /* Cria o arquivo de configuração */
    let configRequest = {
        headers: { //Cabeçalho da requisição
            "Authorization": tokenJwt //Token JWT esperado pela API
        },
    }

    try { //Tenta executar as seguintes ações...
        let resposta = await fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe", configRequest);

        if (resposta.status == 200) {
            let respostaConvertida = await resposta.json(); 
            exibeNomeUsuario(respostaConvertida); //Chama a função que exibe/altera o nome do usuário e envia o objeto capturado na API
        } else {
            throw "Problema ao buscar o usuário na API";
        }
    } catch (error) { //Caso tenha algum problema/erro...
        console.log(error);
    }
}

/* Altera as informações do usuário na página */
function exibeNomeUsuario(objetoUsuario) {
    //console.log(objetoUsuario);
    let p = document.getElementById("nomeUsuario");
    p.innerText = `${objetoUsuario.firstName} ${objetoUsuario.lastName}`
}

//------------------busca tarefas API --------------
function buscarTarefas() {
        qtSkeletons()

    let configRequest = {
        headers: {
            'content-type': 'application/json',
            'authorization': tokenJwt
        }
    }

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', configRequest)
        .then(resultado => {
            if (resultado.status == 200 || resultado.status == 201) {
                return resultado.json()
            } else {
                throw 'Algum problema ocorreu'
            }
        })
        .then(resultado => {
            setTimeout(() => {
                removerSkeleton(".tarefas-pendentes")
                removerSkeleton(".tarefas-terminadas")
                for (tarefa of resultado) {
                    if (tarefa.completed) {
                        renderizaTarefasFinalizadas(tarefa)
                    } else {
                        renderizaTarefasPendentes(tarefa)
                    }
                }
            }, 500);
        })
        .catch(error => {
            removerSkeleton(".tarefas-pendentes")
            removerSkeleton(".tarefas-terminadas")
            console.log(error);
        })
}

//----------------- funçao para criação de tarefas na API (Felipe) - feito com promise ---------------------
function criarTarefa(novaTarefaObjectJSON) {
    let configRequest = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': tokenJwt
        },
        body: novaTarefaObjectJSON
    }

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', configRequest)
        .then(resultado => {
            if (resultado.status == 201 || resultado.status == 200) {
                return resultado.json()
            } else {
                throw 'Algum erro ocorreu'
            }
        })
        .then(resultado => {
            window.location.reload();
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            })
        })
}

async function deletarTarefa(idParam) {
    let configRequest = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "id": idParam,
            "Authorization": tokenJwt
        },
    }
    try {
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${idParam}`, configRequest)
        if (resposta.status == 200 || resposta.status == 201) {
            let respostaConvertida = await resposta.json()
            console.log(respostaConvertida);
            window.location.reload();
        } else {
            throw "Problema ao Deletar"
        }

    } catch (error) {
        console.log(error);
    }
}

function pegarIdDeletar(tarefaClicada) {
    deletarTarefa(tarefaClicada)
}

async function atualizarStatusTarefa(idParam, statusParam) { // atualiza status da tarefa
    let bodyNormal
    console.log(statusParam);
    if (statusParam) {
        bodyNormal = {
            "completed": false
        }
    } else {
        bodyNormal = {
            "completed": true
        }
    }
    let bodyJson = JSON.stringify(bodyNormal)
    let configRequest = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "id": idParam,
            "Access-Control-Allow-Origin": "*",
            "Authorization": tokenJwt
        },
        body: bodyJson
    }
    try {
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${idParam}`, configRequest)
        if (resposta.status == 200 || resposta.status == 201) {
            let respostaConvertida = await resposta.json();
            console.log(respostaConvertida);
            window.location.reload();
        } else {
            throw resposta
        }
    } catch (error) {

    }
}

async function atualizarTextoTarefa(idParam) { // atualiza o texto da tarefa
    let bodyNormal = {
        "description": prompt("Atualizar Tarefa: ")
    }
    let bodyJson = JSON.stringify(bodyNormal)
    let configRequest = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "id": idParam,
            "Access-Control-Allow-Origin": "*",
            "Authorization": tokenJwt
        },
        body: bodyJson
    }
    console.log(bodyJson);
    try {
        let resposta = await fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${idParam}`, configRequest)
        if (resposta.status == 200 || resposta.status == 201) {
            let respostaConvertida = await resposta.json();
            console.log(respostaConvertida);
            window.location.reload();
        } else {
            throw resposta
        }
    } catch (error) {

    }
}

//----------------- adicionando evento no botao para adicionar tarefa ---------------------
botaoNovaTarefa.addEventListener('click', event => {
    event.preventDefault()
    let novaTarefa = document.getElementById('novaTarefa')
    let statusNovaTarefa = document.querySelector('input[name="status-nova-tarefa"]:checked').value
    novaTarefaObject.description = novaTarefa.value
    novaTarefaObject.completed = statusNovaTarefa
    let novaTarefaObjectJSON = JSON.stringify(novaTarefaObject)
    //console.log(novaTarefaObjectJSON)
    if (novaTarefa.value.length < 5) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `No mínimo 5 caracteres pra uma tarefa! 🙂`
        })
    } else {
        criarTarefa(novaTarefaObjectJSON)
        novaTarefa.value = ""
    }
})

//------------------ finalizar sessao --------------
finalizar.addEventListener('click', () => {
    //swal fire para deslogar
    Swal.fire({
        title: '',
        text: "Quer mesmo deslogar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sair',
        cancelButtonText: 'Continuar'
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem('jwt')
            location.href = 'index.html'
        }
    })
/*     if (confirm("Tem Certeza?")) {
        sessionStorage.removeItem('jwt')
        location.href = 'index.html'
    } */
})

function qtSkeletons() {
    let qtSkeletonsPententes = 0
    let qtSkeletonsCompletas = 0


    let configRequest = {
        headers: {
            'content-type': 'application/json',
            'authorization': tokenJwt
        }
    }

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', configRequest)
        .then(resultado => {
            if (resultado.status == 200 || resultado.status == 201) {
                return resultado.json()
            } else {
                throw 'Algum problema ocorreu'
            }
        })
        .then(resultado => {
                for (tarefa of resultado) {
                    if (tarefa.completed) {
                        qtSkeletonsCompletas++
                    } else {
                        qtSkeletonsPententes++
                    }
                }
                renderizarSkeletons(qtSkeletonsPententes, ".tarefas-pendentes");
                renderizarSkeletons(qtSkeletonsCompletas, ".tarefas-terminadas");

        })
        .catch(error => {

            console.log(error);
        })
}
