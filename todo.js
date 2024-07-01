// Declare variables using var, let, and const
const taskTable = document
  .getElementById("taskTable")
  .getElementsByTagName("tbody")[0];
const addTaskButton = document.getElementById("addTaskButton");
const removeTaskButton = document.getElementById("removeTaskButton");
const taskNameInput = document.getElementById("taskName");
const taskDateInput = document.getElementById("taskDate");

// Create an array to hold list of tasks
let list = [];

// Create three task items
const task1 = {
  name: "Clean Apartment",
  date: "06/30/24",
};

const task2 = {
  name: "Complete College Assignments",
  date: "06/30/24",
};

const task3 = {
  name: "Submit Job Application",
  date: "07/01/24",
};

// Add the tasks to the array
list.push(task1, task2, task3);

// Function to display list data in the HTML table
function displayList() {
  taskTable.innerHTML = ""; // Clear existing rows
  list.forEach((task, index) => {
    const row = taskTable.insertRow();

    // Name cell
    const nameCell = row.insertCell(0);
    nameCell.textContent = task.name;

    // Date cell
    const dateCell = row.insertCell(1);
    dateCell.textContent = task.date;

    // Checkbox cell
    const checkboxCell = row.insertCell(2);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.index = index; // Store the index of the task in dataset
    checkboxCell.appendChild(checkbox);
  });
}

// Event handler to remove selected tasks
function removeSelectedTasks() {
  const checkboxes = taskTable.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  checkboxes.forEach((checkbox) => {
    const index = checkbox.dataset.index;
    list.splice(index, 1); // Remove task from list
  });

  displayList(); // Update table
}

// Event handler to add a new task
function addTask() {
  const nameToAdd = taskNameInput.value.trim();
  const dateToAdd = taskDateInput.value.trim();

  if (nameToAdd && dateToAdd) {
    const newTask = { name: nameToAdd, date: dateToAdd };
    list.push(newTask); // Add new task to list
    displayList(); // Update table
    taskNameInput.value = "";
    taskDateInput.value = "";
  } else {
    alert("Please fill in both task name and date fields.");
  }
}

// Add event listeners
addTaskButton.addEventListener("click", addTask);
removeTaskButton.addEventListener("click", removeSelectedTasks);

// Display initial list
displayList();
