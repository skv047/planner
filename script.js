const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progressPercent = document.getElementById("progressPercent");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    progressPercent.textContent = percentage + "%";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskElement = document.createElement("div");

        taskElement.className = `task ${task.priority.toLowerCase()}`;

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <div class="task-left">
                <h3>${task.title}</h3>
                <p>Prioritate: ${task.priority}</p>
                <p>Deadline: ${task.deadline || "Nespecificat"}</p>
            </div>

            <div class="task-actions">
                <button
                    class="complete-btn"
                    onclick="toggleTask(${task.id})"
                >
                    ${task.completed ? "↩" : "✅"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    🗑
                </button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });

    updateStats();
}

function addTask() {
    const title = taskInput.value.trim();
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;

    if (title === "") {
        alert("Introdu un task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        title,
        priority,
        deadline,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    deadlineInput.value = "";
    priorityInput.value = "Medium";
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

renderTasks();
