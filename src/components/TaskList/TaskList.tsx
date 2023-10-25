import React, { Component, JSX } from 'react';

import Task from '../Task';

import { IProps } from './type';

export default class TaskList extends Component<IProps> {
  static defaultProps: IProps = {
    tasks: [{ id: '1', label: 'Tasks not defined', created: new Date(), completed: false, sec: 0, min: 0 }],
    onCompletedTasks: (): void => {},
    onEditLabelTask: (): void => {},
    onRemoveTask: (): void => {},
    onUpdateSec: (): void => {},
  };

  render(): JSX.Element {
    const { tasks, onCompletedTasks, onRemoveTask, onEditLabelTask, onUpdateSec } = this.props;
    return (
      <ul className="todo-list">
        {tasks.map((task) => {
          const { id } = task;
          return (
            <Task
              key={id}
              task={task}
              onCompletedTasks={onCompletedTasks}
              onRemoveTask={onRemoveTask}
              onEditLabelTask={onEditLabelTask}
              onUpdateSec={onUpdateSec}
            />
          );
        })}
      </ul>
    );
  }
}
