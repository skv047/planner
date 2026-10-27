const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progressPercent = document.getElementById("progressPercent");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

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

    const percent =
    tasks.length === 0
    ? 0
    : Math.round(
        completed /
        tasks.length *
        100
    );

    progressPercent.textContent =
    percent + "%";
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const div =
        document.createElement("div");

        div.className =
        `task ${task.priority.toLowerCase()}`;

        if(task.completed){
            div.classList.add("completed");
        }

        div.innerHTML = `
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

        taskList.appendChild(div);
    });

    updateStats();
}

function addTask() {

    const title =
    taskInput.value.trim();

    if(!title){
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

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){

            return {
                ...task,
                completed:
                !task.completed
            };
        }

        return task;

    });

    saveTasks();
    renderTasks();
}

function deleteTask(id){

    tasks =
    tasks.filter(
        task => task.id !== id
    );

    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener(
    "click",
    addTask
);

renderTasks();

const settingsBtn =
document.getElementById(
    "settingsBtn"
);

const settingsModal =
document.getElementById(
    "settingsModal"
);

const closeSettings =
document.getElementById(
    "closeSettings"
);

settingsBtn.addEventListener(
    "click",
    () => {
        settingsModal.classList.remove(
            "hidden"
        );
    }
);

closeSettings.addEventListener(
    "click",
    () => {
        settingsModal.classList.add(
            "hidden"
        );
    }
);

const themeButtons =
document.querySelectorAll(
    ".theme-btn"
);

themeButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            const theme =
            btn.dataset.theme;

            document.body.className =
            theme;

            localStorage.setItem(
                "theme",
                theme
            );

        }
    );

});

const savedTheme =
localStorage.getItem("theme");

if(savedTheme){
    document.body.className =
    savedTheme;
}
