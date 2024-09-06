const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Function to add to do
const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    } 

    

    if(addBtn.value === "Edit"){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value ="";
    } else {

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn");
    editBtn.innerHTML = "Edit";
    li.appendChild(editBtn);
    
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.innerHTML = "Remove";
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
}
};


// Function to update : (Edit/Delete) to do
const updateTodo = (e)=>{
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
    }
    if(e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}


const saveLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))

}
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);