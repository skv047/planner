const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progressPercent = document.getElementById("progressPercent");

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

/* TASKS */

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateStats() {

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    totalTasks.textContent =
        tasks.length;

    completedTasks.textContent =
        completed;

    const percentage =
        tasks.length === 0
        ? 0
        : Math.round(
            (completed / tasks.length) * 100
        );

    progressPercent.textContent =
        percentage + "%";
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const taskDiv =
            document.createElement("div");

        taskDiv.className =
            `task ${task.priority.toLowerCase()}`;

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        taskDiv.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>Prioritate: ${task.priority}</p>
                <p>Deadline: ${task.deadline || "Nespecificat"}</p>
            </div>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${task.id})">

                    ${task.completed ? "↩️" : "✅"}

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    🗑️

                </button>

            </div>
        `;

        taskList.appendChild(taskDiv);

    });

    updateStats();
}

function addTask() {

    const title =
        taskInput.value.trim();

    if (!title) {
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title,
        priority: priorityInput.value,
        deadline: deadlineInput.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    deadlineInput.value = "";
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

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();
    renderTasks();
}

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

addTaskBtn.addEventListener(
    "click",
    addTask
);

renderTasks();

/* SETTINGS */

const settingsBtn =
    document.getElementById("settingsBtn");

const settingsModal =
    document.getElementById("settingsModal");

const closeSettings =
    document.getElementById("closeSettings");

settingsBtn.addEventListener(
    "click",
    () => {
        settingsModal.classList.remove("hidden");
    }
);

closeSettings.addEventListener(
    "click",
    () => {
        settingsModal.classList.add("hidden");
    }
);

/* THEMES */

const themeButtons =
    document.querySelectorAll(".theme-btn");

themeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const theme =
                button.dataset.theme;

            document.body.classList.remove(
                "blue",
                "purple",
                "green",
                "pink",
                "dark"
            );

            document.body.classList.add(theme);

            localStorage.setItem(
                "theme",
                theme
            );
        }
    );

});

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme) {

    document.body.classList.remove(
        "blue",
        "purple",
        "green",
        "pink",
        "dark"
    );

    document.body.classList.add(
        savedTheme
    );

}
