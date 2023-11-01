import { createContext } from 'react';

import { ITask } from '../types/tasks';

export interface ITasksContext {
  tasks: ITask[];
  onCompletedTasks: (id: string) => void;
  onRemoveTask: (id: string) => void;
  onEditLabelTask: (id: string, value: string) => void;
  onUpdateTimeValue: (id: string) => void;
  onPlayTimer: (id: string) => void;
  onStopTimer: (id: string) => void;
}

export const TaskContext = createContext<ITasksContext>({
  tasks: [
    {
      id: new Date().toString() + Math.random() * 100,
      label: 'Default task',
      created: new Date(),
      completed: false,
      min: 0,
      sec: 0,
      timerId: 0,
    },
  ],
  onCompletedTasks: () => {},
  onRemoveTask: () => {},
  onEditLabelTask: () => {},
  onUpdateTimeValue: () => {},
  onPlayTimer: () => {},
  onStopTimer: () => {},
});
