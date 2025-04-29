console.log("let's Start JavaScript");
let currentSong = new Audio();
let songs = [];
let currfolder;

async function getSongs(folder) {
  currfolder = folder;
  songs = [];
  let a = await fetch(`http://127.0.0.1:3000/songs/${folder}`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }
  // show all the songs in the playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = ``;
  for (const song of songs) {
    songUL.innerHTML += `<li> 
                            <div class="info">
                                <div class="musicbtn"><img src="./images/music.svg" alt="music"> </div>
                                <div hidden class="songSrc" >${song}</div>
                                <div class="card_sng_name">${
                                  song.replaceAll("%20", ` `).split("-")[0]
                                }
                                 <div class="singr"> ${
                                   song
                                     .replaceAll("%20", ` `)
                                     .split("-")[1]
                                     .split(".")[0]
                                 }</div></div>
                               
                            </div>
                            <div class="plybtn">
                                <img class="invert" src="./images/smlplybtn.svg" alt="">
                            </div> </li>`;
  }

  //playing songs from the library

  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".songSrc").innerHTML.trim());
      play.src = "./images/pause.svg";
      console.log(
        decodeURIComponent(e.querySelector(".songSrc").innerHTML.split(".")[0])
      );
    });
  });
}

const changeSecstoMins = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const formatedMins = mins.toString().padStart(2, "0");
  const formatedSecs = secs.toString().padStart(2, "0");

  return `${formatedMins}:${formatedSecs}`;
};
//play the current song
const playMusic = (track) => {
  currentSong.src = (
    `http://127.0.0.1:3000/songs/${currfolder}/` + track
  ).trim();
  currentSong.play();
  document.querySelector(".songname").innerHTML = `${
    track.replaceAll("%20", ` `).split("-")[0]
  }`;
  document.querySelector(".songinfo").innerHTML = `00:00 / 00:00`;
};
/* JS to update it dynamically: */
const updateRangeFill = () => {
  const range = document.getElementById("music-range");
  const percent = (range.value / range.max) * 100;
  range.style.background = `linear-gradient(to right, #1db954 ${percent}%, #ddd ${percent}%)`;
};

const currentIndex = (src) => {
  let index = 0;
  for (const song of songs) {
    if (song == src) {
      return index;
    } else {
      index++;
    }
  }
};
//function for display album
async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:3000/songs`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  // console.log(anchors);
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs")) {
      // console.log(e.href.split("/").slice(-2)[0]);
      let folder = e.href.split("/").slice(-2)[0];
      let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
      let response = await a.json();
      // console.log(response);
      let cardContainer = document.querySelector(".cardContainer");
      cardContainer.innerHTML += `<div data-folder="${folder}" class="card flex">
                            <div class="cover">
                                <img src="http://127.0.0.1:3000/songs/${folder}/cover.jpg" alt="">
                                <div class="greenbutton">
                                    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="32" r="32" fill="#1FDF64" />
                                        <polygon points="26,20 26,44 46,32" fill="black" />
                                    </svg>
                                </div>
    
                            </div>
                            <div class="song_name">
                                <h3>${response.title}</h3>
                            </div>
                            <div class="singer_name">
                                <p>${response.discription}</p>
                            </div>
                        </div>`;
    }
    //Adding an event listener to play different music from different playlist
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
      e.addEventListener("click", async (item) => {
        console.log(`fetching songs`);
        console.log(item.currentTarget.dataset.folder);
        await getSongs(`${item.currentTarget.dataset.folder}`);
      });
    });
  }
}

async function main() {
  //get the list of all the songs
  await getSongs("Favourite%20Songs");

  // Attaching event listeners to play , next and previous ; browser generally automatically declare global variable of all the id's we made on HTML so you not need to generally define play as it was automatically declared but it's a good practice to define manually

  let play = document.getElementById("play");
  play.addEventListener("click", (element) => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "./images/pause.svg";
    } else {
      currentSong.pause();
      play.src = "./images/play.svg";
    }
  });

  //Displaying all the albums on the page

  //Attaching event listener to previous button
  let previous = document.getElementById("previous");
  previous.addEventListener("click", (element) => {
    console.log(play.svg);
    let crntindex = currentIndex(currentSong.src.split(`/${currfolder}/`)[1]);
    if (!currentSong.src) {
      play.src = "./images/pause.svg";
      let index = songs.length - 1;
      playMusic(songs[index]);
      // play.src="./images/pause.svg"
      console.log(
        decodeURIComponent(
          currentSong.src.split(`/${currfolder}/`)[1].split(".")[0]
        )
      );
    } else if (crntindex == 0) {
      if (currentSong.paused) {
        play.src = "./images/pause.svg";
        console.log("paused");
      }
      let index = songs.length - 1;
      playMusic(songs[index]);
      console.log(
        decodeURIComponent(
          currentSong.src.split(`/${currfolder}/`)[1].split(".")[0]
        )
      );
    } else {
      if (currentSong.paused) {
        play.src = "./images/pause.svg";
        console.log("paused");
      }
      playMusic(songs[crntindex - 1]);
      console.log(
        decodeURIComponent(
          currentSong.src.split(`/${currfolder}/`)[1].split(".")[0]
        )
      );
    }
  });

  //Attaching even listener to next button
  let next = document.getElementById("next");
  next.addEventListener("click", () => {
    let crntindex = currentIndex(currentSong.src.split(`/${currfolder}/`)[1]);
    if (!currentSong.src) {
      playMusic(songs[0]);
      play.src = "./images/pause.svg";
      console.log(
        decodeURIComponent(
          currentSong.src.split(`/${currfolder}/`)[1].split(".")[0]
        )
      );
    } else if (crntindex == songs.length - 1) {
      if (currentSong.paused) {
        play.src = "./images/pause.svg";
        console.log("paused");
      }

      playMusic(songs[0]);
      console.log(
        decodeURIComponent(
          currentSong.src.split(`/${currfolder}/`)[1].split(".")[0]
        )
      );
    } else {
      if (currentSong.paused) {
        play.src = "./images/pause.svg";
        console.log("paused");
      }

      playMusic(songs[crntindex + 1]);
      console.log(
        decodeURIComponent(
          currentSong.src.split(`/${currfolder}/`)[1].split(".")[0]
        )
      );
    }
  });

  //listen for timeupdate event this even listener updates time of any video or audio in each 250ms approx
  currentSong.addEventListener("timeupdate", () => {
    const current = changeSecstoMins(currentSong.currentTime);
    const duration = isNaN(currentSong.duration)
      ? "--:--"
      : changeSecstoMins(currentSong.duration);
    let range = document.getElementById("music-range");
    range.max = currentSong.duration;
    range.value = currentSong.currentTime;
    updateRangeFill();

    if (currentSong.currentTime == currentSong.duration) {
      play.src = "./images/play.svg";
    }

    document.querySelector(".songinfo").innerHTML = `${current} / ${duration}`;
  });
  // this is solving the bug of showing the NaN in place of song duration
  currentSong.addEventListener("loadedmetadata", () => {
    // Set initial duration display after metadata is loaded
    document.querySelector(".songinfo").innerHTML = `${changeSecstoMins(
      0
    )} / ${changeSecstoMins(currentSong.duration)}`;
  });

  //shows --:-- untill the song duration is not set from selecting any song
  if (isNaN(currentSong.duration)) {
    document.querySelector(".songinfo").innerHTML = `${changeSecstoMins(
      currentSong.currentTime
    )} / --:--`;
  }
  document.addEventListener("input", function (e) {
    if (e.target.id === "music-range") {
      currentSong.currentTime = e.target.value;
      console.log(e.target.value);
    }
  });

  //Adding an even listener for hamburger
  document.getElementById("hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  //Adding an event listener to closemenu cross
  document.getElementById("closemenu").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });

  let volumeicon = document.getElementById("volumeimg");
  //Add an event listener to volume
  document.getElementById("volumebar").addEventListener("change", (e) => {
    console.log("Setting value to ", e.target.value, "/100");
    currentSong.volume = parseInt(e.target.value) / 100;
    let range = document.getElementById("volumebar");
    let percent = (e.target.value / 100) * 100;
    range.style.background = `linear-gradient(to right, #1db954 ${percent}%, #fdfdfd ${percent}%)`;
    if (e.target.value == 0) {
      volumeicon.src = "./images/mute.svg";
    } else {
      volumeicon.src = "./images/volume.svg";
    }
  });

  volumeicon.addEventListener("click", ()=>{
    let range = document.getElementById("volumebar");

    if(currentSong.volume==0){
        currentSong.volume=0.1;
        range.value=10;
        volumeicon.src = "./images/volume.svg";
        range.style.background = `linear-gradient(to right, #1db954 ${10}%, #fdfdfd ${10}%)`;
    }
    else{
        currentSong.volume=0;
        range.value=0;
        volumeicon.src = "./images/mute.svg";
        range.style.background = `linear-gradient(to right, #1db954 ${0}%, #fdfdfd ${0}%)`;
    }
  })

  displayAlbums();
}

main();
