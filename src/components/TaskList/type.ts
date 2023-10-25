import { ITask } from '../../types/tasks';

export interface IProps {
  tasks: ITask[];
  onCompletedTasks: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditLabelTask: (id: string, value: string) => void;
  onUpdateTimeValue: (id: string) => void;
  onPlayTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
}
