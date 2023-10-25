export interface IProps {
  onCreateNewTask: (value: string, min: number, sec: number) => void;
}
export interface IState {
  valueTask: string;
  valueMin: string;
  valueSec: string;
}
