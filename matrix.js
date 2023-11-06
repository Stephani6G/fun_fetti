// JavaScript functionality for the Circular Eisenhower Matrix with local storage

// Quadrants
const importantUrgent = document.querySelector(".important-urgent");
const importantNotUrgent = document.querySelector(".important-not-urgent");
const notImportantUrgent = document.querySelector(".not-important-urgent");
const notImportantNotUrgent = document.querySelector(".not-important-not-urgent");

// Task input
const taskInput = document.createElement("input");
taskInput.setAttribute("type", "text");
taskInput.setAttribute("placeholder", "Add a task");
document.body.appendChild(taskInput);

// Add task event listener
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && taskInput.value.trim() !== "") {
        addTask(taskInput.value);
        taskInput.value = "";
    }
});

// View Tasks button
const viewTasksButton = document.createElement("button");
viewTasksButton.textContent = "View Tasks";
document.body.appendChild(viewTasksButton);

// Event listener for the "View Tasks" button
viewTasksButton.addEventListener("click", function () {
    displayTasksFromLocalStorage();
});

// Add tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
});

function addTask(taskText) {
    const task = document.createElement("div");
    task.className = "task";
    task.textContent = taskText;

    // Click event to move tasks between quadrants
    task.addEventListener("click", function () {
        if (task.parentElement === importantUrgent) {
            importantNotUrgent.appendChild(task);
        } else if (task.parentElement === importantNotUrgent) {
            notImportantUrgent.appendChild(task);
        } else if (task.parentElement === notImportantUrgent) {
            notImportantNotUrgent.appendChild(task);
        } else {
            importantUrgent.appendChild(task);
        }

        // Save tasks to local storage after a change
        saveTasksToLocalStorage();
    });

    // Initial placement in "Not Important & Not Urgent"
    notImportantNotUrgent.appendChild(task);

    // Save the new task to local storage
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    // Gather all tasks in an array
    const allTasks = document.querySelectorAll(".task");
    const taskList = Array.from(allTasks).map((task) => task.textContent);

    // Store the task list in local storage
    localStorage.setItem("eisenhowerMatrixTasks", JSON.stringify(taskList));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("eisenhowerMatrixTasks");
    if (storedTasks) {
        const taskList = JSON.parse(storedTasks);
        taskList.forEach((taskText) => addTask(taskText));
    }
}

function displayTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("eisenhowerMatrixTasks");

    if (storedTasks) {
        const taskList = JSON.parse(storedTasks);

        // Create a modal or an alert to display the tasks
        const taskListDisplay = document.createElement("div");
        taskListDisplay.className = "task-list-modal";
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        taskListDisplay.appendChild(closeButton);

        // Create an unordered list to display the tasks
        const taskListUl = document.createElement("ul");
        taskList.forEach((taskText) => {
            const taskItem = document.createElement("li");
            taskItem.textContent = taskText;
            taskListUl.appendChild(taskItem);
        });

        taskListDisplay.appendChild(taskListUl);
        document.body.appendChild(taskListDisplay);

        // Event listener to close the task list modal
        closeButton.addEventListener("click", function () {
            document.body.removeChild(taskListDisplay);
        });
    } else {
        alert("No tasks found in local storage.");
    }
}
