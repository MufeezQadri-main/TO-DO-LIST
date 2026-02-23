const todoInput = document.getElementById('todoInput')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todoList')
const taskCount = document.getElementById('taskCount')
const filterButton = document.querySelectorAll('.filterBtn')

let tasks = JSON.parse(localStorage.getItem('Todo')) || []

let allTasks = 'all'

refreshTasks()

addBtn.addEventListener('click', function(){
    const text = todoInput.value.trim()

    if (text === ""){
        alert('Add a task bro')
        return;
    }
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    }
    tasks.push(newTask)
    todoInput.value = ''
    saveAndRefresh()
})

function refreshTasks(){

    todoList.innerHTML = ''
    
    for (let i = 0 ; i < tasks.length ; i++){
        let task = tasks[i]

        if (allTasks === 'pending' && task.completed === true)
            continue
        if (allTasks === 'completed' && task.completed === false)
            continue

        const li = document.createElement('li')
        li.className = 'todoItem'

        if (task.completed === true){
            li.classList.add('completed')
        }
        
        const span = document.createElement('span')
        span.className = "taskText"
        span.textContent = task.text

        span.addEventListener('click',  function (){
            task.completed = !task.completed
            saveAndRefresh()
        })
        //li ke ander element to alag alag rakhne ke liye div element
        const div = document.createElement("div")
        div.className = 'actions'

        const editBtn = document.createElement('button')
        editBtn.className = 'editBtn'
        editBtn.textContent = 'Edit'
        editBtn.addEventListener('click', function (){
            const newText = prompt (' update your task:', task.text)

            if (newText && newText.trim()) {
                task.text = newText.trim();
                saveAndRefresh();
            }
        })

        const deleteBtn = document.createElement('button')
        deleteBtn.className = 'deleteBtn'
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', function(){
            tasks.splice(i, 1)
            saveAndRefresh()
        })

        div.appendChild(editBtn)
        div.appendChild(deleteBtn)
        li.appendChild(span)
        li.appendChild(div)

        todoList.appendChild(li)
        
    }

    let pendingTask = 0
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].completed === false){
            pendingTask++
        }
    }
    taskCount.textContent = pendingTask + 'tasks remains'
}

filterButton.forEach (function(button){
    button.addEventListener('click', function(){
        filterButton.forEach (btn => btn.classList.remove('active'))
        btn.classList.add('active')
        allTasks = btn.getAttribute('data-filter')
        refreshTasks()
    })
})

function saveAndRefresh (){
    localStorage.setItem('Todo', JSON.stringify(tasks))
    refreshTasks()
}