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
        <button><i id="${tarefa.id}" class="fas fa-undo-alt change"></i></button>
        <button><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
    </div>
    </div>
`

    listaULFinalizadas.appendChild(li)
}