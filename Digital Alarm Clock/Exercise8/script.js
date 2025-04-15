let alarmTime = null;
const Gettime =()=>{
    const currenttime = new Date;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = currenttime.getDay();
    const date = currenttime.getDate().toString().padStart(2,`0`);
    const month = currenttime.getMonth().toString().padStart(2,`0`);
    const year = currenttime.getFullYear().toString().padStart(4,`0`);
    const hours = currenttime.getHours().toString().padStart(2,`0`);
    const minutes = currenttime.getMinutes().toString().padStart(2,`0`);
    const seconds = currenttime.getSeconds().toString().padStart(2,`0`);

    document.getElementById("date").innerHTML=` ${date} / `;
    document.getElementById("month").innerHTML = `${(parseInt(month)+1).toString().padStart(2 , `0`)} / `;
    document.getElementById("year").innerHTML =` ${year} `;
    document.getElementById("day").innerHTML =`${days[day]}`;
    document.getElementById("time").innerHTML=`${hours}:${minutes}:${seconds}`;

    return  `${hours}:${minutes}:${seconds}`;

};
const upcomingAlarm = document.createElement("div");
const set_Alarm=()=>{
    const gethour = document.getElementById("hours").value.toString().padStart(2,`0`);
    const getminutes = document.getElementById("minutes").value.toString().padStart(2,`0`);
    const getseconds = document.getElementById("seconds").value.toString().padStart(2,`0`);
    console.log(`${gethour}:${getminutes}:${getseconds}`); 
    console.log(document.getElementById("time").innerHTML);

    alarmTime =`${gethour}:${getminutes}:${getseconds}`;
    console.log("Alarm set for :", alarmTime);
    upcomingAlarm.className=`upcomingAlarm`;
    upcomingAlarm.innerHTML=`<span>Upcoming Alarm: </span> <span>${gethour}:${getminutes}:${getseconds}</span> <button id="deleteAlarm" onclick="stop_Alarm()">Delete Alarm</button> `
    document.getElementById("container").append(upcomingAlarm);
    requestAnimationFrame(() => {
        upcomingAlarm.classList.add("show");
    });
};

const stopButton = document.createElement("div");
const check_Alarm=(currentTime)=>{
    if(currentTime == alarmTime && alarmTime){
        document.getElementById("audio").play();
        console.log("⏰ Alarms is ringing at : " , currentTime);
        upcomingAlarm.innerHTML=`⏰ Jago Grahak Jago`;
        alarmTime =null;
        stopButton.className ="stop_btn";
        stopButton.innerHTML =  `<button id="stop_Alarm" onclick="stop_Alarm()">Stop Alarm</button>`
        document.getElementById("buttons").append(stopButton);
    }
    
};

const stop_Alarm = () => {
        document.getElementById("audio").pause();

        upcomingAlarm.classList.remove("show");
        upcomingAlarm.classList.add("hide");
    
        setTimeout(() => {
            upcomingAlarm.innerHTML = ``;
            upcomingAlarm.className = ``;
        }, 500);
        document.getElementById("hours").value = `00`;
        document.getElementById("minutes").value = `00`;
        document.getElementById("seconds").value = `00`;

        stopButton.innerHTML = ``;
    };

Gettime()
document.getElementById("setAlarm").addEventListener("click", set_Alarm);

setInterval(() => {
    const now = Gettime();
    check_Alarm(now);
}, 1000);