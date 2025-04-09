let tasks=[];

const addTask=()=>{
    let taskInput=document.getElementById("taskinput");
    let text=taskInput.value.trim();
    if(text){
        tasks.push({text:text , completed:false});//passing an object to tasks
        taskInput.value=``;
        updateTaskList();
        updateStats();
        console.log(tasks);
    }
}
const toggleTaskComplete = (index)=>{
    tasks[index].completed=!tasks[index].completed;//if checkbox got toggeled it will convert the object completed to true from false and false from true
    //true<->false
    updateTaskList();
    updateStats();
}
const editList=(index)=>{
    const taskInput = document.getElementById("taskinput")
    taskInput.value=tasks[index].text;
    tasks.splice(index ,1);
    updateTaskList();
    updateStats();
}
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
}
const updateStats=()=>{
    const completedTasks= tasks.filter(task=>task.completed).length
    const totalTasks=tasks.length;
    const progress =(completedTasks/totalTasks)*100;
    const progressBar=document.getElementById(("progress"));
    if(totalTasks!=0){
        progressBar.style.width=`${progress}%`;
    }
    document.getElementById("numbers").innerText =`${completedTasks} / ${totalTasks}`;
    if(completedTasks==totalTasks && completedTasks!=0 && totalTasks!=0){
        blastConfetti();
    }
}
const updateTaskList=(index)=>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML="";
    tasks.forEach((task,index) => {
        const listItem=document.createElement("li");
        listItem.innerHTML=`
        <input type="checkbox" class="checkbox ${task.completed ? "completed":""}" ${task.completed ? "checked" : ""}>
                <p class="taskname ${task.completed ? "completed" : ""}">${task.text}</p>
                <img src="./updatelogo.svg" alt="" class="update" onclick="editList(${index})">
                <img src="./deletelogo.svg" alt="" class="delete" onclick="deleteTask(${index})">`;
                listItem.addEventListener("change", ()=>toggleTaskComplete(index));
                taskList.append((listItem));
            });
}//when input<type="checkbox" class="checked"> tb jake vo tick hota h 
document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();
    addTask();
});
const blastConfetti=()=>{
    const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };
  
  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }
  
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  
  fire(0.2, {
    spread: 60,
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
  }