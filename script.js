
const form = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');

let tasks = [];

function addTask(event) {
  event.preventDefault();

  const name = form.elements['task-name'].value;
  const dueDate = form.elements['due-date'].value;
  const status = form.elements['status'].value;

  const task = { name, dueDate, status };

  tasks.push(task);

  form.reset();

  updateTaskList();
}

function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.classList.add('task-name'); 
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    const dueDateCell = document.createElement('td');
    dueDateCell.classList.add('due-date'); 
    dueDateCell.textContent = task.dueDate;
    row.appendChild(dueDateCell);

    const statusCell = document.createElement('td');
    statusCell.classList.add('status'); 
    statusCell.textContent = task.status;
    row.appendChild(statusCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    taskList.appendChild(row);
  });
}
function updateTaskList() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.classList.add('task-name'); 
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    const dueDateCell = document.createElement('td');
    dueDateCell.classList.add('due-date'); 
    dueDateCell.textContent = task.dueDate;
    row.appendChild(dueDateCell);

    const statusCell = document.createElement('td');
    statusCell.classList.add('status'); 
    statusCell.textContent = task.status;
    row.appendChild(statusCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    taskList.appendChild(row);
  });
}

function editTask(index) {
  const task = tasks[index];

  form.elements['task-name'].value = task.name;
  form.elements['due-date'].value = task.dueDate;
  form.elements['status'].value = task.status;

  form.querySelector("input[type='submit']").value = "Save Changes";

  form.dataset.editIndex = index;
}

function deleteTask(index) {
  tasks.splice(index, 1);

  updateTaskList();
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = form.elements['task-name'].value;
  const dueDate = form.elements['due-date'].value;
  const status = form.elements['status'].value;

  const editIndex = form.dataset.editIndex;

  if (editIndex !== undefined) {
    tasks[editIndex].name = name;
    tasks[editIndex].dueDate = dueDate;
    tasks[editIndex].status = status;

    form.querySelector("input[type='submit']").value = "Add Task";

    delete form.dataset.editIndex;
  } else {
    const task = {
      name: name,
      dueDate: dueDate,
      status: status
    };

    tasks.push(task);
  }

  updateTaskList();

  form.reset();
});

const filterNameInput = document.getElementById("filter-name");
const filterStatusSelect = document.getElementById("filter-status");
const filterDueDateInput = document.getElementById("filter-due-date");

filterNameInput.addEventListener("input", applyFilters);
filterStatusSelect.addEventListener("change", applyFilters);
filterDueDateInput.addEventListener("change", applyFilters);

function applyFilters() {
  const tasks = document.querySelectorAll("tbody tr");
  tasks.forEach(function(task) {
    const taskName = task.querySelector(".task-name");
    const taskStatus = task.querySelector(".status");
    const taskDueDate = task.querySelector(".due-date");
    const nameFilter = filterNameInput.value.toLowerCase();
    const nameMatch = taskName.textContent.toLowerCase().includes(nameFilter);

    const statusFilter = filterStatusSelect.value.toLowerCase();
    const statusMatch = statusFilter === "" || taskStatus.textContent.toLowerCase() === statusFilter;

    const dueDateFilter = filterDueDateInput.value;
    const dueDateMatch = !dueDateFilter || new Date(taskDueDate.textContent).getTime() === new Date(dueDateFilter).getTime();

    if (nameMatch && statusMatch && dueDateMatch) {
      task.classList.remove("hidden");
    } else {
      task.classList.add("hidden");
    }
  });
}
