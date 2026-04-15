// Lista de tarefas (memória do app)
let tarefas = [];

// Carrega tarefas salvas ao abrir
window.onload = function () {
    let dados = localStorage.getItem("tarefas");
    if (dados) {
        tarefas = JSON.parse(dados);
        renderizar();
    }
};

// Salvar no navegador
function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Adicionar tarefa
function adicionarTarefa() {
    let texto = document.getElementById("tarefa").value;
    let prioridade = document.getElementById("prioridade").value;

    if (texto === "") return;

    // cria objeto tarefa
    let tarefa = {
        texto: texto,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    salvar();
    renderizar();

    document.getElementById("tarefa").value = "";
}

// Renderizar lista na tela
function renderizar(filtro = "todas") {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let filtradas = tarefas.filter(t => {
        if (filtro === "ativas") return !t.concluida;
        if (filtro === "concluidas") return t.concluida;
        return true;
    });

    filtradas.forEach((tarefa, index) => {

        let item = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = tarefa.texto;

        if (tarefa.concluida) {
            span.classList.add("concluida");
        }

        span.onclick = function () {
            tarefa.concluida = !tarefa.concluida;
            salvar();
            renderizar(filtro);
        };

        let botao = document.createElement("button");
        botao.textContent = "🗑️";
        botao.classList.add("deletar");

        botao.onclick = function () {
            tarefas.splice(index, 1);
            salvar();
            renderizar(filtro);
        };

        item.appendChild(span);
        item.appendChild(botao);

        item.classList.add(tarefa.prioridade);

        lista.appendChild(item);
    });

    // Atualiza contador
    document.getElementById("contador").textContent =
        tarefas.length + " tarefas";
}

// Filtro
function filtrar(tipo) {
    renderizar(tipo);
}
