const SECOND = 1000;
export let secondsCounter: number;
export let interval: ReturnType<typeof setInterval>;
export default class Timer {
  private seconds: number;
  private minutes: number;
  private displaySeconds: string;
  private displayMinutes: string;
  private isRun: boolean;

  constructor() {
    secondsCounter = 0;
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
    if (this.seconds / 60 === 1) {
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
    this.stopTimer();

    secondsCounter = 0;
    interval = setInterval(() => {
    this.showTimer(container)
    }, SECOND)
    
    this.isRun = true;
  }

  stopTimer() {
    if(!interval) return;
    clearInterval(interval);
    this.isRun = false;
  }
}