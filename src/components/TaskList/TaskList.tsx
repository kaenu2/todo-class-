import React, { useContext } from 'react';

import Task from '../Task';
import { TaskContext } from '../../contexts';

export const TaskList = () => {
  const { tasks } = useContext(TaskContext);
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        const { id } = task;
        return <Task key={id} task={task} />;
      })}
    </ul>
  );
};
