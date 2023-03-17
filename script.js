// Seleciona o elemento de entrada de tarefa
const taskInput = document.querySelector("#task-input");

// Seleciona a lista de tarefas
const taskList = document.querySelector("#task-list");

// Cria um objeto para rastrear as tarefas
let tasks = [];

// Função para adicionar tarefas à lista
function addTask() {
  // Obtém o valor da entrada de tarefa
  const taskValue = taskInput.value;

  // Verifica se a entrada de tarefa está vazia
  if (taskValue === "") {
    alert("Digite uma tarefa!");
    return;
  }

  // Cria um objeto de tarefa com a descrição da tarefa e um id único
  const task = {
    id: Date.now(),
    description: taskValue,
  };

  // Adiciona a tarefa ao array de tarefas
  tasks.push(task);

  // Limpa o valor da entrada de tarefa
  taskInput.value = "";

  // Atualiza a lista de tarefas
  updateTaskList();

  // Salva as tarefas no Local Storage
  saveTasksToLocalStorage();
}

 

//Função para atualizar a lista de tarefas
function updateTaskList() {
  // Remove todas as tarefas da lista
  taskList.innerHTML = "";

  // Adiciona cada tarefa à lista
  tasks.forEach(function (task) {
    // Cria um elemento de lista para a tarefa
    const li = document.createElement("li");

    // Cria um elemento de texto para a descrição da tarefa
    const span = document.createElement("span");
    span.textContent = task.description;

    // Cria um botão para remover a tarefa
    const button = document.createElement("button");
    button.textContent = "Remover";
    button.addEventListener("click", function () {
      removeTask(task.id);
    });

    // Adiciona o texto e o botão à lista
    li.appendChild(span);
    li.appendChild(button);

    // Adiciona o elemento de lista à lista de tarefas
    taskList.appendChild(li);
  });
}

// Função para remover uma tarefa
function removeTask(id) {
  // Filtra as tarefas para remover a tarefa com o id correspondente
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  // Atualiza a lista de tarefas
  updateTaskList();

  // Salva as tarefas atualizadas no Local Storage
  saveTasksToLocalStorage();
}

// Função para salvar as tarefas no Local Storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar as tarefas do Local Storage
function loadTasksFromLocalStorage() {
  const tasksFromStorage = localStorage.getItem("tasks");
  if (tasksFromStorage) {
    tasks = JSON.parse(tasksFromStorage);
  }
}

// Atualiza a lista de tarefas ao carregar a página
window.addEventListener("load", function () {
  loadTasksFromLocalStorage();
  updateTaskList();
});
