let listaULPendentes = document.querySelector(".tarefas-pendentes")

function renderizaTarefasPendentes(tarefa){
    let li = document.createElement("li");
    li.classList.add("tarefa")

    li.innerHTML = //troquei a div "not-done" por botao, para executar a função pegarIdAtualizar
    `
    <button class="not-done" id="${tarefa.id} "onClick="pegarIdAtualizar(this.id)""></button> 
    <div class="descricao">
        <p class="nome">${tarefa.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i> ${tarefa.createdAt}</p>
    </div>
    `
    listaULPendentes.appendChild(li)
}







