//UI variables
let display = document.querySelector(".display");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let miliseconds = document.getElementById("miliseconds");
let startBtn = document.querySelector(".btn-start");
let stopBtn = document.querySelector(".btn-stop");
let lapBtn = document.querySelector(".btn-lap");
let resetBtn = document.querySelector('.btn-reset');
let lapMins = document.querySelector(".lap-minutes");
let lapSecs = document.querySelector(".lap-seconds");
let lapMil = document.querySelector(".lap-miliseconds");
let lapContainer = document.querySelector(".previous-laps");
//Clock variables
let time = 0;
let lapTime = 0;
let running = 0;

//Function to start clock
function startStop() {
    //Check clock is running
    if(running === 0) {
        //If not, set runnong to 1 and execute timer functions
        running = 1;
        startBtn.innerHTML = "Stop";
        startBtn.style.backgroundColor = "red";
        resetBtn.style.display = "none";
        lapBtn.style.display = "inline";
        incrementTime();
        incrementLapTime();
    } else {
        //If yes set back to 0 to pause all timers
        running = 0;
        startBtn.innerHTML = "Start";
        resetBtn.style.display = "inline";
        startBtn.style.backgroundColor = "green";
    }
}

//Fucntion for reset
function reset() {
    //Restore all default settings
    running = 0;
    time = 0;
    lapTime = 0;
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    miliseconds.innerHTML = "00";
    lapMins.innerHTML = "00";
    lapSecs.innerHTML = "00";
    lapMil.innerHTML = "00";
    lapContainer.innerHTML = "";
    resetBtn.style.display = "none";
    lapBtn.style.display = "none";
    
}

//Function to increment time
function incrementTime() {
    //Check clock is running
    if(running === 1) {
        setTimeout(function() {
            time++;
            let mins = Math.floor(time / 10 / 60);
            if(mins <= 9) {
                mins = "0" + mins;
                minutes.innerHTML = mins;
            }
            let secs = Math.floor(time / 10);
            if(secs <= 9) {
                secs = "0" + secs;
                seconds.innerHTML = secs;
            }
            let tenths = Math.floor(time % 10);
            if(tenths <= 9) {
                tenths = "0" + tenths;
                miliseconds.innerHTML = tenths;
            }
            incrementTime();
        }, 100);
    }
};

//Function to increment lap time
function incrementLapTime() {
    //Check clock is running
    if(running === 1) {
        setTimeout(function() {
            lapTime++;
            let mins = Math.floor(lapTime / 10 / 60);
            if(mins <= 9) {
                mins = "0" + mins;
                lapMins.innerHTML = mins;
            }
            let secs = Math.floor(lapTime / 10);
            if(secs <= 9) {
                secs = "0" + secs;
                lapSecs.innerHTML = secs;
            }
            let tenths = Math.floor(lapTime % 10);
            if(tenths <= 9) {
                tenths = "0" + tenths;
                lapMil.innerHTML = tenths;
            }
            incrementLapTime();
        }, 100);
    }
};

//Function to display lap times
function displayLapTimes(mins, secs, mils) {
    let html = `
    <div class="lap">
        <span class="lap-minutes">${mins}</span>:<span class="lap-seconds">${secs}</span>:<span class="lap-miliseconds">${mils}</span>
    </div>
    `;

    lapContainer.insertAdjacentHTML("beforeend", html);
};


//Event listener for start button
startBtn.addEventListener("click", () => {
    startStop();
});

//Event listener for reset button
resetBtn.addEventListener("click", () => {
    reset();
});

//Event listener for lap button
lapBtn.addEventListener("click", () => {

    lapTime = 0;
    displayLapTimes(lapMins.textContent, lapSecs.textContent, lapMil.textContent);
});