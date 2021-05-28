const SECOND = 1000;
export let secondsCounter = 0;
export class Timer {
  private seconds: number;
  private minutes: number;
  private displaySeconds: string;
  private displayMinutes: string;
  private isRun: boolean;
  private interval: ReturnType<typeof setInterval>;

  constructor() {
    this.seconds = 0;
    this.minutes = 0;
    this.displaySeconds = '0';
    this.displayMinutes = '0';
    this.isRun = false;
  }

  showTimer(container: HTMLElement) {
    secondsCounter++;
    container.innerHTML = this.stopwatch();
  } 

  stopwatch() {
    this.seconds++;
    if (this.seconds / 60 === 1){
      this.seconds = 0;
      this.minutes++;
    }
    this.seconds < 10 ? 
    this.displaySeconds = `0${this.seconds}` :  
    this.displaySeconds = this.seconds.toString();

    this.minutes < 10 ? 
    this.displayMinutes = `0${this.minutes}` :  
    this.displayMinutes = this.minutes.toString();

    return `${this.displayMinutes} : ${this.displaySeconds}`;
  }

  startTimer(container:HTMLElement) {
    if(this.isRun) return;
    this.interval = setInterval(() => {
      this.showTimer(container)
    }, SECOND)
    this.isRun = true;
  }

  stopTimer() {
    if(!this.isRun) return;
    clearInterval(this.interval);
    this.isRun = false;
  }
}






// //Define vars to hold time values
// let seconds = 0;
// let minutes = 0;
// let hours = 0;

// //Define vars to hold "display" value
// let displaySeconds = 0;
// let displayMinutes = 0;
// let displayHours = 0;

// //Define var to hold setInterval() function
// let interval = null;

// //Define var to hold stopwatch status
// let status = "stopped";

// //Stopwatch function (logic to determine when to increment next value, etc.)
// function stopWatch(){

//     seconds++;

//     //Logic to determine when to increment next value
//     if(seconds / 60 === 1){
//         seconds = 0;
//         minutes++;

//         if(minutes / 60 === 1){
//             minutes = 0;
//             hours++;
//         }

//     }

//     //If seconds/minutes/hours are only one digit, add a leading 0 to the value
//     if(seconds < 10){
//         displaySeconds = "0" + seconds.toString();
//     }
//     else{
//         displaySeconds = seconds;
//     }

//     if(minutes < 10){
//         displayMinutes = "0" + minutes.toString();
//     }
//     else{
//         displayMinutes = minutes;
//     }

//     if(hours < 10){
//         displayHours = "0" + hours.toString();
//     }
//     else{
//         displayHours = hours;
//     }

//     //Display updated time values to user
//     document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

// }



// function startStop(){

//     if(status === "stopped"){

//         //Start the stopwatch (by calling the setInterval() function)
//         interval = window.setInterval(stopWatch, 1000);
//         document.getElementById("startStop").innerHTML = "Stop";
//         status = "started";

//     }
//     else{

//         window.clearInterval(interval);
//         document.getElementById("startStop").innerHTML = "Start";
//         status = "stopped";

//     }

// }

// //Function to reset the stopwatch
// function reset(){

//     window.clearInterval(interval);
//     seconds = 0;
//     minutes = 0;
//     hours = 0;
//     document.getElementById("display").innerHTML = "00:00:00";
//     document.getElementById("startStop").innerHTML = "Start";

// }