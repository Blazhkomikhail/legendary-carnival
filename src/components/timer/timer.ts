const SECOND = 1000;
const START_SECOND = 0;
let interval: ReturnType<typeof setInterval>;


export default class Timer {
  private seconds: number;

  private minutes: number;

  private displaySeconds: string;

  private displayMinutes: string;

  private isRun: boolean;

  private secondsCounter: number;

  constructor() {
    this.secondsCounter = START_SECOND;
    this.seconds = START_SECOND;
    this.minutes = START_SECOND;
    this.displaySeconds = START_SECOND.toString();
    this.displayMinutes = START_SECOND.toString();
    this.isRun = false;
  }

  showTimer(container: HTMLElement): void {
    const contain = container;
    this.secondsCounter += 1;
    contain.innerHTML = this.stopwatch();
  }

  stopwatch(): string {
    const maxSeconds = 60;
    const step = 1;
    const maxAdditionalZero = 10;

    this.seconds += step;
    
    if (this.seconds / maxSeconds === step) {
      this.seconds = START_SECOND;
      this.minutes += step;
    }
    if (this.seconds < maxAdditionalZero) {
      this.displaySeconds = `0${this.seconds.toString()}`;
    } else {
      this.displaySeconds = this.seconds.toString();
    }

    if (this.minutes < maxAdditionalZero) {
      this.displayMinutes = `0${this.minutes.toString()}`;
    } else {
      this.displayMinutes = this.minutes.toString();
    }
    return `${this.displayMinutes} : ${this.displaySeconds}`;
  }

  startTimer(container: HTMLElement): void {
    if (this.isRun) return;
    this.stopTimer();

    this.secondsCounter = START_SECOND;
    interval = setInterval(() => {
      this.showTimer(container);
    }, SECOND);

    this.isRun = true;
  }

  stopTimer(): void {
    if (!interval) return;
    clearInterval(interval);
    this.seconds = START_SECOND;
    this.minutes = START_SECOND;
    this.isRun = false;
  }

  getSeconds(): number {
    return this.secondsCounter;
  }
}
