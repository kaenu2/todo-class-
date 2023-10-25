import { ITask } from '../../types/tasks';

export interface IProps {
  tasks: ITask[];
  onCompletedTasks: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditLabelTask: (id: string, value: string) => void;
  onUpdateSec: (id: string) => void;
}
