// adding event listeners to detect click and enter keypress
document.addEventListener("click",handleDocumentClick);
document.addEventListener("keypress",handleDocumentClick);
const ul = document.querySelector(".list");
// retriving data from local Storage and converting JSON data to array of object
var tasksJSON = localStorage.getItem("tasks")
var tasks = []
if(tasksJSON!=null){
    tasks = JSON.parse(tasksJSON);
    renderList()
}

// function to handle click and call appropriate functions
function handleDocumentClick(e){
    let elemId = e.target.id;
    if(elemId == "submit" || e.key === "Enter"){
        addTask();
    }else if(elemId == "check"){
        let id = e.target.dataset.id;
        toggleCheck(id)
    }else if(elemId == "delete"){
        let id = e.target.dataset.id;
        deleteTask(id);
    }else if(elemId == "all"){
        toggleFilter(e.target);
        displayAll();
    }else if(elemId == "done"){
        toggleFilter(e.target);
        displayDone();
    }else if(elemId == "undone"){
        toggleFilter(e.target);
        displayUndone();
    }
}

// functiona add a new task
function addTask(){
    let text = document.getElementById("input").value;
        var task = {
            done:false,
            text:text,
            id: Date.now().toString()
        }
        tasks.push(task);
        document.getElementById("input").value = "";
    renderList();
}

// function toggle check mark on completed tasks
function toggleCheck(id){
        tasks.forEach((task)=>{
            if(task.id == id){
                task.done = !task.done;
                renderList();
                return;
            }
        })
}

// function to delted task
function deleteTask(id){
    let newTasks = tasks.filter((task)=>{
        return task.id != id;
    })
    tasks = newTasks;
    renderList();
}

// function to render list on screen and each time data is altered list is rendered and local storage also get updated
function renderList(){
    updateStorage();
    toggleFilter(document.getElementById("all"));
    document.getElementById("totalTasks").innerHTML = tasks.length || 0
    ul.innerHTML = "";
    tasks.forEach((task)=>{
        let li = document.createElement("li");
        if(task.done){
            li.classList.add("done");
        }
        li.innerHTML = `
        <div class="left">
            <h4 class="title" id="title">${task.text}</h4>
        </div>
        <div class="right">
            <div class="check-box undone ${task.done ? "done" : ""}">
                <img src="./assest/check_bold.svg" id="check" data-id="${task.id}">
            </div>
            <div class="check-box delete">
            <img src="./assest/trash_full.svg" id="delete" data-id="${task.id}">
            </div>
        </div>
        `
        ul.appendChild(li);
    })
}

// function to display all task in filter
function displayAll(){
    ul.childNodes.forEach((li)=>{
        li.classList.remove("hide");
    })
}

// function to display completed task in filter
function displayDone(){
    displayAll();
    ul.childNodes.forEach((li)=>{
        if(!li.classList.contains("done")){
            li.classList.add("hide");
        }
    })
}


// function to display incomplete task in filter
function displayUndone(){
    displayAll();
    ul.childNodes.forEach((li)=>{
        if(li.classList.contains("done")){
            li.classList.add("hide");
        }
    })
}

// function to toggle active class on filter option click
function toggleFilter(elem){
    document.querySelectorAll("span").forEach((span)=>{
        span.classList.remove("active");
    })
    elem.classList.add("active");
}


// function to update local storage
function updateStorage(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}
