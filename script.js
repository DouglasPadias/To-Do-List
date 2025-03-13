// Aguarda o carregamento completo do HTML antes de executar o JavaScript
document.addEventListener("DOMContentLoaded", function () {
    
    // Seleciona os elementos do HTML para manipulação
    const taskInput = document.getElementById("taskInput"); // Input onde o usuário digita a tarefa
    const addTaskButton = document.getElementById("addTask"); // Botão de adicionar tarefa
    const taskList = document.getElementById("taskList"); // Lista onde as tarefas aparecem

    // Recupera as tarefas salvas no localStorage ou inicia um array vazio
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Função para salvar os dados no localStorage
    function salvarDados() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Função para renderizar as tarefas na tela
    function renderTodos() {
        taskList.innerHTML = ""; // Limpa a lista antes de renderizar novamente

        todos.forEach((todo, index) => {
            // Cria um novo elemento <li> para armazenar a tarefa
            const li = document.createElement("li");
            li.textContent = todo.text; // Define o texto da tarefa como o que foi digitado

            // Se a tarefa estiver concluída, adiciona a classe "completed"
            if (todo.completed) li.classList.add("completed");

            // Adiciona um evento de clique na tarefa para marcar como concluída
            li.addEventListener("click", function () {
                todos[index].completed = !todos[index].completed; // Alterna o estado
                salvarDados(); // Salva a mudança
                renderTodos(); // Atualiza a exibição
            });

            // Cria um botão "X" para remover a tarefa
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X"; // Texto do botão
            deleteButton.classList.add("delete"); // Adiciona a classe de estilo

            // Adiciona um evento de clique ao botão "X" para remover a tarefa
            deleteButton.addEventListener("click", function (event) {
                event.stopPropagation(); // Evita que o clique marque a tarefa como concluída
                todos.splice(index, 1); // Remove a tarefa do array
                salvarDados(); // Atualiza o localStorage
                renderTodos(); // Atualiza a exibição
            });

            // Adiciona o botão "X" dentro do <li>
            li.appendChild(deleteButton);
            // Adiciona a tarefa na lista <ul>
            taskList.appendChild(li);
        });
    }

    // Evento de clique para adicionar uma nova tarefa
    addTaskButton.addEventListener("click", function () {
        // Verifica se o input está vazio antes de adicionar
        if (taskInput.value.trim() === "") return;

        // Adiciona um novo item ao array de tarefas
        todos.push({ text: taskInput.value, completed: false });

        taskInput.value = ""; // Limpa o campo de entrada
        salvarDados(); // Salva no localStorage
        renderTodos(); // Atualiza a exibição
    });

    // Renderiza as tarefas ao carregar a página
    renderTodos();
});
