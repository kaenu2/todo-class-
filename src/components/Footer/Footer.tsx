import React, { useContext } from 'react';

import { TasksFilter } from '../index';
import { FooterContext } from '../../contexts';

export const Footer = () => {
  const { tasksCount, onClearCompletedTasks } = useContext(FooterContext);
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCount} items left</span>
      <TasksFilter />
      <button className="clear-completed" onClick={() => onClearCompletedTasks()}>
        Clear completed
      </button>
    </footer>
  );
};
