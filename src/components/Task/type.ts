import { ITask } from '../../types/tasks';

export interface IProps {
  task: ITask;
  onCompletedTasks: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditLabelTask: (id: string, value: string) => void;
  onUpdateTimeValue: (id: string) => void;
  onPlayTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
}

export interface IState {
  edit: boolean;
  value: string;
  created: string;
}
