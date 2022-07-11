let listaULPendentes = document.querySelector(".tarefas-pendentes")





function renderizaTarefasPendentes(tarefa) {
    let li = document.createElement("li");
    li.classList.add("tarefa")
    let data = new Date(tarefa.createdAt)
    let dataConvertida = data.toLocaleDateString()
    let horaConvertida = data.toLocaleTimeString()

    li.innerHTML = //troquei a div "not-done" por botao, para executar a função pegarIdAtualizarStatus
        `
    <button class="not-done" id="${tarefa.id}" onClick="atualizarStatusTarefa(this.id, false)" ></button> 
    <div class="descricao">
        <p class="nome">${tarefa.description}</p>
        <p class="timestamp"> <button id="${tarefa.id}" onClick="atualizarTextoTarefa(this.id)"><i class="fas fa-pen"></i></button>  
        <i class="far fa-calendar-alt"></i> ${dataConvertida} às ${horaConvertida}
        <button id="${tarefa.id}" onClick="deletarTarefa(this.id)"><i class="far fa-trash-alt"></i></button></p>
        </div>
    `
    listaULPendentes.appendChild(li)
}

//<button class="far fa-trash-alt" id="${tarefa.id}" onClick="atualizarTextoTarefa(this.id)"></button>