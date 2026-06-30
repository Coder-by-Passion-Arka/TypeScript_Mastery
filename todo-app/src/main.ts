// console.log("Hello")

import {v4 as uuidV4} from "uuid";

type Task = {
  id: string,
  title: string | undefined,
  completed: boolean,
  createdAt: Date
}

const formInput = document.querySelector<HTMLInputElement>("#new-task-title") ;

const todoForm = document.querySelector("#new-task-form") as HTMLFormElement;

const todoList = document.querySelector<HTMLUListElement>("#list");

// For storing the todolist in local storage
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

todoForm?.addEventListener("submit", (event) => {
  event.preventDefault(); // Stops the website from refreshing once the submit button is clicked
  if (formInput?.value === "" || formInput?.value === null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: formInput?.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addListItem(newTask);
  formInput.value = ""; // For some reason, when I put formInput?.value, it breaks the application. Investigate why
});

function addListItem(task: Task){

  // We create HTML elements using JavaScript to make the Todolist
  const todoItem = document.createElement("li");
  const todoLabel = document.createElement("label");
  const checkBox = document.createElement("input");

  checkBox.type = "checkbox";
  checkBox.addEventListener("change", (event)=> {
    task.completed = checkBox.checked // this directly connects the check-box of each todo-item to the completion status of the specific task 
    
    saveTasks();
    // alert(event);
    // console.log(tasks)
  });

  // 1. Make a Todo element with a Lable and Checkbox
  todoLabel.append(checkBox, task.title);
  // 2. Add the the Todo Item to the list of Items declared previously
  todoItem.append(todoLabel);
  // 3. Add the list of Todos created to the final Todo-List
  todoList?.append(todoItem);
}

function saveTasks(){
  localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function loadTasks(): Task[]{
  const savedTodo = localStorage.getItem("Tasks");
  if(savedTodo == null)
    return [];
  else
    return JSON.parse(savedTodo);
}