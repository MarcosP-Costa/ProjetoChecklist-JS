let listaULFinalizadas = document.querySelector(".tarefas-terminadas")

function renderizaTarefasFinalizadas(tarefa) {
    let li = document.createElement("li");
    li.classList.add("tarefa")
    li.innerHTML =
`
    <div class="done"></div>
    <div class="descricao">
    <p class="nome">${tarefa.description}</p>
    <div>
        <button id="${tarefa.id}"onClick="atualizarStatusTarefa(this.id, true)"><i  class="fas fa-undo-alt change"></i></button>
        <button id="${tarefa.id}" onClick="deletarTarefa(this.id)"><i class="far fa-trash-alt"></i></button>
    </div>
    </div>
`

    listaULFinalizadas.appendChild(li)
}


