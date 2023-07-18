/*
  Students Tasks:
  [1] Use Sweet Alert If Input Is Empty
  [2] Check If Task Is Exist
  [3] Create Delete All Tasks Button
  [4] Create Finish All Tasks Button
  [5] Add To Tasks To The Local Storage
*/

// Setting Up Variables
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
var t = []
var i = 1
// Focus On Input Field
window.onload = function () {
  theInput.focus();
};

// Adding The Task
theAddButton.onclick = function () {
var regrex = /^\s*$/ig
  // If Input is Empty
  if ( regrex.test(theInput.value)) {

    alert("No Value");

  } else {

    let noTasksMsg = document.querySelector(".no-tasks-message");

    // Check If Span With No Tasks Message Is Exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {

      // Remove No Tasks Message
      noTasksMsg.remove();

    }
    
    if(t.includes(theInput.value) !== true){

    t.push(theInput.value)
    // Create Main Span Element
    let mainSpan = document.createElement("span");

    // Create Delete Button
    let deleteElement = document.createElement("span");

    // Create The Main Span Text
    let text = document.createTextNode(theInput.value);
    
    console.log(t);

    // Create The Delete Button Text
    let deleteText = document.createTextNode("Delete");

    // Add Text To Main Span
    mainSpan.appendChild(text);

    // Add Class To Main Span
    mainSpan.className = 'task-box';
    deleteElement.setAttribute('onclick',`deleteItem('${theInput.value}')`)

    // Add Text To Delete Button
    deleteElement.appendChild(deleteText);

    // Add Class To Delete Button
    deleteElement.className = `${theInput.value} delete`;

    // Add Delete Button To Main Span
    mainSpan.appendChild(deleteElement);

    // Add The Task To The Container
    tasksContainer.appendChild(mainSpan);
    
    //add to localstoreg
    
    localStorage.setItem(`${theInput.value}`,`${i++}`)

    // Empty The Input
    theInput.value = '';

    // Focus On Field
    theInput.focus();

    // Calculate Tasks
    calculateTasks();

  }else{
    alert("Task Is Exist")
  }
}

};

document.addEventListener('click', function (e) {

  // Delete Task
  if (e.target.classList.contains('delete')) {

    // Remove Current Task
    e.target.parentNode.remove()

    // Check Number Of Tasks Inside The Container
    if (tasksContainer.childElementCount == 0) {

      createNoTasks();

    }

  }

  // Finish Task
  if (e.target.classList.contains('task-box')) {

    // Toggle Class 'finished'
    e.target.classList.toggle("finished");

  }

  // Calculate Tasks
  calculateTasks();

});

// Function To Create No Tasks Message
function createNoTasks() {

  // Create Message Span Element
  let msgSpan = document.createElement("span");

  // Create The Text Message
  let msgText = document.createTextNode("No Tasks To Show");

  // Add Text To Message Span Element
  msgSpan.appendChild(msgText);

  // Add Class To Message Span
  msgSpan.className = 'no-tasks-message';

  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);

}

// Function To Calculate Tasks
function calculateTasks() {

  // Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;

  // Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;

}

document.querySelector(".remove").addEventListener("click", function(){
  let nbTask = document.querySelectorAll(".tasks-content .task-box")
  for(let i = 0 ; i < nbTask.length ; i++){
    nbTask[i].remove()
  }
  
  localStorage.clear()
  t =[]
  createNoTasks()
})

document.querySelector(".finish").addEventListener("click", function(){
  let nbTask = document.querySelectorAll(".tasks-content .task-box")
  for(let i = 0 ; i < nbTask.length ; i++){
    nbTask[i].classList.add("finished")
  }
})

function deleteItem(val){
  localStorage.removeItem(`${val}`)
  for(let i = 0 ; i < t.length ; i++){
    if(t[i] === val){
      t.splice(i,1)
    }
  }
}


if(window.onload){

// iterate localStorage
for (var i = 0; i < localStorage.length; i++) {

  let noTasksMsg = document.querySelector(".no-tasks-message");
  if (document.body.contains(document.querySelector(".no-tasks-message"))) {

    // Remove No Tasks Message
    noTasksMsg.remove();

  }
  // set iteration key name
  var key = localStorage.key(i);

  // use key name to retrieve the corresponding value
  var value = localStorage.getItem(key);

  t.push(key)
    // Create Main Span Element
    let mainSpan = document.createElement("span");

    // Create Delete Button
    let deleteElement = document.createElement("span");

    // Create The Main Span Text
    let text = document.createTextNode(key);
    
    console.log(t);

    // Create The Delete Button Text
    let deleteText = document.createTextNode("Delete");

    // Add Text To Main Span
    mainSpan.appendChild(text);

    // Add Class To Main Span
    mainSpan.className = 'task-box';
    deleteElement.setAttribute('onclick',`deleteItem('${key}')`)

    // Add Text To Delete Button
    deleteElement.appendChild(deleteText);

    // Add Class To Delete Button
    deleteElement.className = `${key} delete`;

    // Add Delete Button To Main Span
    mainSpan.appendChild(deleteElement);

    // Add The Task To The Container
    tasksContainer.appendChild(mainSpan);
    
  

}

}



// for (var key in localStorage) {
//   if (localStorage.hasOwnProperty(key)) {
//       console.log(key, ' = ', localStorage[key]);
//   }
// }