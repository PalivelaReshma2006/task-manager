// ================================
// TaskFlow - Smart Task Manager
// ================================

const taskInput = document.querySelector('input[type="text"]');
const taskDescription = document.querySelector("textarea");
const dateInput = document.querySelector('input[type="date"]');
const prioritySelect = document.querySelector("select");
const addBtn = document.querySelector(".add-task button");

const todoColumn = document.querySelectorAll(".column")[0];
const progressColumn = document.querySelectorAll(".column")[1];
const completedColumn = document.querySelectorAll(".column")[2];

const cards = document.querySelectorAll(".card h1");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ================================
// Save Tasks
// ================================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// ================================
// Render Tasks
// ================================

function renderTasks() {

    todoColumn.innerHTML = `
    <h3>📝 To Do
        <span>0</span>
    </h3>`;

    progressColumn.innerHTML = `
    <h3>🚀 In Progress
        <span>0</span>
    </h3>`;

    completedColumn.innerHTML = `
    <h3>✅ Completed
        <span>0</span>
    </h3>`;

    let todo = 0;
    let progress = 0;
    let completed = 0;

    tasks.forEach((task, index) => {

        const card = document.createElement("div");

        card.className = `task-card ${task.priority}`;

        card.innerHTML = `

        <h4>${task.title}</h4>

        <p>${task.description}</p>

        <small>

        📅 ${task.date}

        </small>

        <br><br>

        <button onclick="completeTask(${index})">

        ✔

        </button>

        <button onclick="deleteTask(${index})">

        🗑

        </button>

        `;

        if (task.status === "todo") {

            todoColumn.appendChild(card);

            todo++;

        }

        else if (task.status === "progress") {

            progressColumn.appendChild(card);

            progress++;

        }

        else {

            completedColumn.appendChild(card);

            completed++;

        }

    });

    todoColumn.querySelector("span").textContent = todo;

    progressColumn.querySelector("span").textContent = progress;

    completedColumn.querySelector("span").textContent = completed;

    updateDashboard();

}

// ================================
// Add Task
// ================================

addBtn.addEventListener("click", function (e) {

    e.preventDefault();

    if (taskInput.value.trim() === "") {

        alert("Enter Task Name");

        return;

    }

    tasks.push({

        title: taskInput.value,

        description: taskDescription.value,

        date: dateInput.value,

        priority: prioritySelect.value.toLowerCase(),

        status: "todo"

    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskDescription.value = "";

    dateInput.value = "";

});

// ================================
// Delete Task
// ================================

function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();

        renderTasks();

    }

}

// ================================
// Complete Task
// ================================

function completeTask(index) {

    tasks[index].status = "completed";

    saveTasks();

    renderTasks();

}

// ================================
// Dashboard
// ================================

function updateDashboard() {

    const total = tasks.length;

    const pending = tasks.filter(t => t.status === "todo").length;

    const completed = tasks.filter(t => t.status === "completed").length;

    const progress = total === 0 ? 0 :

        Math.round((completed / total) * 100);

    cards[0].textContent = total;

    cards[1].textContent = pending;

    cards[2].textContent = completed;

    cards[3].textContent = progress + "%";

}

// ================================
// Search
// ================================

const search = document.querySelector(".search input");

search.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    document.querySelectorAll(".task-card").forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

});

// ================================
// Dark Mode
// ================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "theme",

        document.body.classList.contains("dark")

    );

});

if (localStorage.getItem("theme") === "true") {

    document.body.classList.add("dark");

}

// ================================
// Initial Load
// ================================

renderTasks();
// ================================
// Edit Task
// ================================

function editTask(index) {

    const newTitle = prompt(
        "Edit Task Title",
        tasks[index].title
    );

    if (newTitle === null) return;

    const newDesc = prompt(
        "Edit Description",
        tasks[index].description
    );

    tasks[index].title = newTitle;

    tasks[index].description = newDesc;

    saveTasks();

    renderTasks();

    showToast("Task Updated Successfully");

}

// ================================
// Move Task to Progress
// ================================

function moveProgress(index){

    tasks[index].status = "progress";

    saveTasks();

    renderTasks();

    showToast("Task moved to Progress");

}

// ================================
// Update render buttons
// Replace card.innerHTML buttons
// ================================

/*

<button onclick="moveProgress(${index})">

🚀

</button>

<button onclick="completeTask(${index})">

✔

</button>

<button onclick="editTask(${index})">

✏

</button>

<button onclick="deleteTask(${index})">

🗑

</button>

*/


// ================================
// Toast Notification
// ================================

const toast=document.createElement("div");

toast.className="toast";

document.body.appendChild(toast);

function showToast(message){

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


// ================================
// Toast CSS (Auto Inject)
// ================================

const style=document.createElement("style");

style.innerHTML=`

.toast{

position:fixed;

top:30px;

right:30px;

background:#2563eb;

color:white;

padding:15px 30px;

border-radius:12px;

font-size:16px;

opacity:0;

transform:translateY(-40px);

transition:.4s;

z-index:999;

box-shadow:0 15px 30px rgba(0,0,0,.3);

}

.toast.show{

opacity:1;

transform:translateY(0);

}

`;

document.head.appendChild(style);


// ================================
// Keyboard Shortcut
// ================================

taskInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        addBtn.click();

    }

});


// ================================
// Greeting
// ================================

const hour=new Date().getHours();

const welcome=document.querySelector(".welcome h1");

if(hour<12){

welcome.innerHTML="☀ Good Morning";

}

else if(hour<18){

welcome.innerHTML="🌤 Good Afternoon";

}

else{

welcome.innerHTML="🌙 Good Evening";

}


// ================================
// Animated Progress Circle
// ================================

function updateProgressCircle(){

const total=tasks.length;

const completed=tasks.filter(

t=>t.status==="completed"

).length;

const percent=

total===0

?0

:Math.round(

(completed/total)*100

);

const circle=document.querySelector(".circle");

const text=document.querySelector(".circle h1");

if(circle){

circle.style.background=

`conic-gradient(

#3b82f6 0deg,

#8b5cf6 ${percent*3.6}deg,

rgba(255,255,255,.1) ${percent*3.6}deg

)`;

}

if(text){

text.innerHTML=percent+"%";

}

}

updateProgressCircle();


// ================================
// Update Dashboard Function
// ================================

const oldUpdate=updateDashboard;

updateDashboard=function(){

oldUpdate();

updateProgressCircle();

}


// ================================
// Auto Save Reminder
// ================================

setInterval(()=>{

if(tasks.length>0){

console.log("Tasks Auto Saved");

saveTasks();

}

},30000);
// ==========================================
// FILTER TASKS
// ==========================================

function filterTasks(status){

    document.querySelectorAll(".task-card").forEach(card=>{

        if(status==="all"){

            card.style.display="block";

            return;

        }

        if(card.parentElement.parentElement.querySelector("h3")
            .innerText.toLowerCase().includes(status)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}


// ==========================================
// DUE DATE REMINDER
// ==========================================

function checkDueDates(){

    const today=new Date();

    const todayStr=today.toISOString().split("T")[0];

    tasks.forEach(task=>{

        if(task.date===todayStr && task.status!=="completed"){

            showToast("📅 Reminder: "+task.title);

        }

    });

}

checkDueDates();


// ==========================================
// EXPORT TASKS
// ==========================================

function exportTasks(){

    const data=JSON.stringify(tasks,null,2);

    const blob=new Blob([data],{

        type:"application/json"

    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="tasks.json";

    a.click();

    URL.revokeObjectURL(url);

}


// ==========================================
// IMPORT TASKS
// ==========================================

function importTasks(file){

    const reader=new FileReader();

    reader.onload=function(e){

        tasks=JSON.parse(e.target.result);

        saveTasks();

        renderTasks();

        showToast("Tasks Imported");

    }

    reader.readAsText(file);

}


// ==========================================
// CREATE IMPORT BUTTON
// ==========================================

const importInput=document.createElement("input");

importInput.type="file";

importInput.accept=".json";

importInput.style.display="none";

document.body.appendChild(importInput);

importInput.onchange=function(){

    importTasks(this.files[0]);

};


// ==========================================
// EXPORT BUTTON
// ==========================================

const exportBtn=document.createElement("button");

exportBtn.innerHTML="📤 Export";

exportBtn.style.position="fixed";

exportBtn.style.bottom="30px";

exportBtn.style.right="30px";

exportBtn.style.padding="12px 22px";

exportBtn.style.borderRadius="10px";

exportBtn.style.border="none";

exportBtn.style.cursor="pointer";

exportBtn.style.background="#2563eb";

exportBtn.style.color="#fff";

exportBtn.onclick=exportTasks;

document.body.appendChild(exportBtn);


// ==========================================
// IMPORT BUTTON
// ==========================================

const importBtn=document.createElement("button");

importBtn.innerHTML="📥 Import";

importBtn.style.position="fixed";

importBtn.style.bottom="30px";

importBtn.style.right="150px";

importBtn.style.padding="12px 22px";

importBtn.style.borderRadius="10px";

importBtn.style.border="none";

importBtn.style.cursor="pointer";

importBtn.style.background="#7c3aed";

importBtn.style.color="#fff";

importBtn.onclick=()=>{

    importInput.click();

};

document.body.appendChild(importBtn);


// ==========================================
// CELEBRATION
// ==========================================

function celebrate(){

    if(tasks.length===0) return;

    const completed=tasks.filter(

        t=>t.status==="completed"

    ).length;

    if(completed===tasks.length){

        showToast("🎉 Congratulations! All Tasks Completed!");

    }

}

const oldRender=renderTasks;

renderTasks=function(){

    oldRender();

    celebrate();

};


// ==========================================
// LIVE CLOCK
// ==========================================

const clock=document.createElement("div");

clock.style.position="fixed";

clock.style.top="25px";

clock.style.right="220px";

clock.style.color="white";

clock.style.fontWeight="600";

clock.style.fontSize="16px";

document.body.appendChild(clock);

setInterval(()=>{

    const now=new Date();

    clock.innerHTML=now.toLocaleTimeString();

},1000);


// ==========================================
// RANDOM MOTIVATION
// ==========================================

const quotes=[

"🚀 Stay focused and never give up!",

"💻 Code. Learn. Repeat.",

"🌟 Small progress is still progress.",

"📈 Success comes from consistency.",

"🔥 Dream Big. Work Hard."

];

const quote=document.querySelector(".quote-card p");

if(quote){

quote.innerHTML=

quotes[Math.floor(Math.random()*quotes.length)];

}


// ==========================================
// PAGE LOADER
// ==========================================

window.onload=function(){

renderTasks();

showToast("Welcome to TaskFlow!");

}
// ==========================================
// PART 4 - FINAL FEATURES
// ==========================================


// ================================
// Browser Notification
// ================================

function notify(title, body){

    if(!("Notification" in window)) return;

    if(Notification.permission==="granted"){

        new Notification(title,{
            body:body,
            icon:"profile.jpg"
        });

    }

    else if(Notification.permission!=="denied"){

        Notification.requestPermission().then(permission=>{

            if(permission==="granted"){

                new Notification(title,{
                    body:body,
                    icon:"profile.jpg"
                });

            }

        });

    }

}


// ================================
// Notify After Adding Task
// ================================

const originalAdd = addBtn.onclick;

addBtn.addEventListener("click",()=>{

    if(taskInput.value.trim()!==""){

        notify(
            "Task Added",
            taskInput.value
        );

    }

});


// ================================
// Digital Clock
// ================================

function updateClock(){

    const now=new Date();

    const clock=document.getElementById("clock");

    if(clock){

        clock.innerHTML=now.toLocaleTimeString();

    }

}

setInterval(updateClock,1000);


// ================================
// Progress Percentage
// ================================

function updatePercentage(){

    const total=tasks.length;

    const completed=tasks.filter(

        task=>task.status==="completed"

    ).length;

    const percent=

    total===0

    ?0

    :Math.round((completed/total)*100);

    const progress=document.querySelector(".progress-fill");

    if(progress){

        progress.style.width=percent+"%";

    }

    const progressText=document.querySelector(".circle h1");

    if(progressText){

        progressText.innerHTML=percent+"%";

    }

}

const dashboard=updateDashboard;

updateDashboard=function(){

    dashboard();

    updatePercentage();

}


// ================================
// Keyboard Shortcuts
// ================================

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="n"){

        e.preventDefault();

        taskInput.focus();

    }

    if(e.ctrlKey && e.key==="f"){

        e.preventDefault();

        search.focus();

    }

});


// ================================
// Floating Button Animation
// ================================

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="translateY(-4px) scale(1.03)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="translateY(0)";

    });

});


// ================================
// Random Background
// ================================

const gradients=[

"linear-gradient(135deg,#0f172a,#312e81)",

"linear-gradient(135deg,#0f766e,#2563eb)",

"linear-gradient(135deg,#7c3aed,#2563eb)",

"linear-gradient(135deg,#1e293b,#4338ca)",

"linear-gradient(135deg,#111827,#4f46e5)"

];

function randomBackground(){

    document.body.style.background=

    gradients[Math.floor(

        Math.random()*gradients.length

    )];

}

setInterval(randomBackground,60000);


// ================================
// Welcome User
// ================================

setTimeout(()=>{

    showToast("👋 Welcome to TaskFlow Dashboard");

},1000);


// ================================
// Daily Goal
// ================================

function dailyGoal(){

    const completed=tasks.filter(

        task=>task.status==="completed"

    ).length;

    if(completed>=5){

        showToast(

            "🏆 Daily Goal Achieved!"

        );

    }

}

setInterval(dailyGoal,10000);


// ================================
// Task Counter
// ================================

function taskCounter(){

    const counter=document.getElementById("taskCounter");

    if(counter){

        counter.innerHTML=tasks.length;

    }

}

const oldRenderTasks=renderTasks;

renderTasks=function(){

    oldRenderTasks();

    taskCounter();

    updatePercentage();

}


// ================================
// Smooth Fade Animation
// ================================

document.querySelectorAll(

".card,.task-card,.analytics-card,.member"

).forEach(item=>{

    item.style.opacity="0";

    item.style.transform="translateY(40px)";

});

window.addEventListener("load",()=>{

    document.querySelectorAll(

    ".card,.task-card,.analytics-card,.member"

    ).forEach((item,index)=>{

        setTimeout(()=>{

            item.style.transition=".6s";

            item.style.opacity="1";

            item.style.transform="translateY(0)";

        },index*120);

    });

});


// ================================
// Footer Year
// ================================

const year=document.getElementById("year");

if(year){

    year.innerHTML=new Date().getFullYear();

}


// ================================
// Final Initializer
// ================================

window.addEventListener("load",()=>{

    renderTasks();

    updateDashboard();

    updateClock();

    updatePercentage();

    showToast("✅ TaskFlow Loaded Successfully");

});