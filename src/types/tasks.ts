export interface ITask {
  id: string;
  label: string;
  created: Date;
  completed: boolean;
  min: number;
  sec: number;
  timerId: number | NodeJS.Timer;
}
