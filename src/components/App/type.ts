import { ITask } from '../../types/tasks';

export interface IState {
  tasks: ITask[];
  sortValue: string;
}
