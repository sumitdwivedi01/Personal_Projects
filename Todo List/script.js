// document.addEventListener("DOMContentLoaded", (listner=>{
//   const storedTasks=JSON.parse(localStorage.getItem(`tasks`))
//   if(storedTasks){
//    storedTasks.forEach((task)=>tasks.push((task)))
//    updateTaskList();
//    updateStats();
//   }
// }))
// let tasks=[];
// const saveTasks=()=>{
//   localStorage.setItem(`tasks`, JSON.stringify(tasks))
// }

// const addTask=()=>{
//     let taskInput=document.getElementById("taskinput");
//     let text=taskInput.value.trim();
//     if(text){
//         tasks.push({text:text , completed:false ,pinned:false});//passing an object to tasks
//         taskInput.value=``;
//         updateTaskList();
//         updateStats();
//         saveTasks();
//         console.log(tasks);
//     }
// }
// const reorderTasks =(tasks)=>{
//   let incompleted = tasks.filter(task => !task.completed);
//   let completed = tasks.filter(task => task.completed);
//   let pinned = tasks.filter(task=>task.pinned);
//   return [...pinned,...incompleted , ...completed];
// }
// const toggleTaskComplete = (index)=>{
//     tasks[index].completed=!tasks[index].completed;//if checkbox got toggeled it will convert the object completed to true from false and false from true
//     //true<->false
//     updateTaskList();
//     saveTasks();
//     updateStats();
// }
// const editList=(index)=>{
//     const taskInput = document.getElementById("taskinput")
//     taskInput.value=tasks[index].text;
//     tasks.splice(index ,1);
//     updateTaskList();
//     updateStats();
//     saveTasks();
// }
// const deleteTask=(index)=>{
//     tasks.splice(index,1);
//     updateTaskList();
//     updateStats();
//     saveTasks();
// }
// const pinTask=(index)=>{
  
// }
// const updateStats=()=>{
//     const completedTasks= tasks.filter(task=>task.completed).length
//     const totalTasks=tasks.length;
//     const progress =(completedTasks/totalTasks)*100;
//     const progressBar=document.getElementById(("progress"));
//     if(totalTasks!=0){
//         progressBar.style.width=`${progress}%`;
//     }
//     document.getElementById("numbers").innerText =`${completedTasks} / ${totalTasks}`;
//     if(completedTasks==totalTasks && completedTasks!=0 && totalTasks!=0){
//         blastConfetti();
//     }
// }
// const updateTaskList=(index)=>{
//     const taskList = document.getElementById("task-list");
//     taskList.innerHTML="";
//     tasks=reorderTasks(tasks);
//     tasks.forEach((task,index) => {
//         const listItem=document.createElement("li");
//         listItem.innerHTML=`
//         <input type="checkbox" class="checkbox ${task.completed ? "completed":""}" ${task.completed ? "checked" : ""}>
//                 <p class="taskname ${task.completed ? "completed" : ""}">${task.text}</p>
//                 <img src="./updatelogo.svg" alt="" class="update" onclick="editList(${index})">
//                 <img src="./deletelogo.svg" alt="" class="delete" onclick="deleteTask(${index})">
//                 <img src="./pinbefore.svg" alt="" class="pin" onclick="pinTask(${index})">`;
                
//                 listItem.addEventListener("change", ()=>toggleTaskComplete(index));
//                 taskList.append((listItem));
//             });
// }//when input<type="checkbox" class="checked"> tb jake vo tick hota h 
// document.getElementById("newTask").addEventListener("click", function(e){
//     e.preventDefault();
//     addTask();
// });
// const blastConfetti=()=>{
//     const count = 200,
//     defaults = {
//       origin: { y: 0.7 },
//     };
  
//   function fire(particleRatio, opts) {
//     confetti(
//       Object.assign({}, defaults, opts, {
//         particleCount: Math.floor(count * particleRatio),
//       })
//     );
//   }
  
//   fire(0.25, {
//     spread: 26,
//     startVelocity: 55,
//   });
  
//   fire(0.2, {
//     spread: 60,
//   });
  
//   fire(0.35, {
//     spread: 100,
//     decay: 0.91,
//     scalar: 0.8,
//   });
  
//   fire(0.1, {
//     spread: 120,
//     startVelocity: 25,
//     decay: 0.92,
//     scalar: 1.2,
//   });
  
//   fire(0.1, {
//     spread: 120,
//     startVelocity: 45,
//   });
//   }


// document.addEventListener("DOMContentLoaded", (listener => {
//   const storedTasks = JSON.parse(localStorage.getItem("tasks"));
//   if (storedTasks) {
//       storedTasks.forEach((task) => tasks.push(task));
//       pinCnt = tasks.filter(task => task.pinned).length; // Initialize pinCnt
//       updateTaskList();
//       updateStats();
//   }
// }));

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    tasks = storedTasks;
    // Count how many tasks are pinned
    pinCnt = tasks.filter(task => task.pinned).length;
    updateTaskList();
    updateStats();
  }
});

let tasks = [];
let pinCnt = 0; // Global counter for pinned tasks

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  let taskInput = document.getElementById("taskinput");
  let text = taskInput.value.trim();
  if (text) {
    // New tasks are unpinned by default
    tasks.push({ text: text, completed: false, pinned: false });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  saveTasks();
  updateStats();
};

const editList = (index) => {
  const taskInput = document.getElementById("taskinput");
  taskInput.value = tasks[index].text;
  // If editing a pinned task, reduce the pinned count
  if (tasks[index].pinned) {
    pinCnt--;
  }
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  if (tasks[index].pinned) {
    pinCnt--;
  }
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const pinTask = (index) => {
  // Remove the task from its current position
  let temp = tasks[index];
  tasks.splice(index, 1);

  if (!temp.pinned) {
    // If the task is not pinned, pin it and insert at index pinCnt
    temp.pinned = true;
    tasks.splice(pinCnt, 0, temp);
    pinCnt++;
  } else {
    // If the task is already pinned, unpin it and insert it after the pinned block
    temp.pinned = false;
    tasks.splice(pinCnt, 0, temp);
    pinCnt--;
  }
  
  updateTaskList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");
  if (totalTasks !== 0) {
    progressBar.style.width = `${progress}%`;
  }
  document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;
  if (completedTasks === totalTasks && totalTasks !== 0) {
    blastConfetti();
  }
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  const CompletedList = document.getElementById("completed-lsit");
  taskList.innerHTML = "";
  // Use the tasks array as maintained (with pinned tasks at the top)
  tasks.forEach((task, index) => {
    // if(!task.completed){
      const listItem = document.createElement("li");
      listItem.innerHTML = `
      <input type="checkbox" class="checkbox ${task.completed ? "completed" : ""}" ${task.completed ? "checked" : ""}>
      <p class="taskname ${task.completed ? "completed" : ""}">${task.text}</p>
      <img src="./updatelogo.svg" alt="Edit" class="update" onclick="editList(${index})">
      <img src="./deletelogo.svg" alt="Delete" class="delete" onclick="deleteTask(${index})">
      <img src="./pinbefore.svg" alt="Pin" class="pin" onclick="pinTask(${index})">
      `;
      // Attach the change listener to the checkbox (not the list item)
      const checkbox = listItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => toggleTaskComplete(index));
      taskList.append(listItem);
    // }
    // else{
    //   const completedItem= document.createElement("li");
    //   completedItem.innerHTML=` <input type="checkbox" class="checkbox ${task.completed ? "completed" : ""}" ${task.completed ? "checked" : ""}>
    //   <p class="taskname ${task.completed ? "completed" : ""}">${task.text}</p>
    //   <img src="./updatelogo.svg" alt="Edit" class="update" onclick="editList(${index})">
    //   <img src="./deletelogo.svg" alt="Delete" class="delete" onclick="deleteTask(${index})">
    //   <img src="./pinbefore.svg" alt="Pin" class="pin" onclick="pinTask(${index})">`
    //   const checkbox = completedItem.querySelector("input[type='checkbox']");
    //   checkbox.addEventListener("change", () => toggleTaskComplete(index));
    //   CompletedList.append(completedItem);
    // }
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

// Confetti celebration function for when all tasks are complete
const blastConfetti = () => {
  const count = 200,
    defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};
