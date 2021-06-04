const SECOND = 1000;

export default class Timer {
  private seconds: number;

  private minutes: number;

  private displaySeconds: string;

  private displayMinutes: string;

  private isRun: boolean;

  private secondsCounter: number;

  private interval: ReturnType<typeof setInterval>;

  constructor() {
    this.secondsCounter = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.displaySeconds = '0';
    this.displayMinutes = '0';
    this.isRun = false;
    this.interval = null;
  }

  showTimer(container: HTMLElement): void {
    const contain = container;
    this.secondsCounter += 1;
    console.log(this.secondsCounter);
    contain.innerHTML = this.stopwatch();
  }

  stopwatch(): string {
    this.seconds += 1;
    if (this.seconds / 60 === 1) {
      this.seconds = 0;
      this.minutes += 1;
    }
    if (this.seconds < 10) {
      this.displaySeconds = `0${this.seconds.toString()}`;
    } else {
      this.displaySeconds = this.seconds.toString();
    }

    if (this.minutes < 10) {
      this.displayMinutes = `0${this.minutes.toString()}`;
    } else {
      this.displayMinutes = this.minutes.toString();
    }
    return `${this.displayMinutes} : ${this.displaySeconds}`;
  }

  startTimer(container: HTMLElement): void {
    if (this.isRun) return;
    this.stopTimer();

    this.secondsCounter = 0;
    this.interval = setInterval(() => {
      this.showTimer(container);
    }, SECOND);
    console.log('startTime Intervar: ', this.interval);

    this.isRun = true;
  }

  stopTimer(): void {
    console.log(this.interval);
    if (!this.interval) return;
    console.log(this.interval);
    clearInterval(this.interval);
    this.seconds = 0;
    this.minutes = 0;
    this.isRun = false;
  }

  getSeconds(): number {
    return this.secondsCounter;
  }
}
