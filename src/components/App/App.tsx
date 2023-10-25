import React, { Component, JSX } from 'react';

import { Footer, NewTaskForm, TaskList } from '../index';
import { ITask } from '../../types/tasks';

import { IState } from './type';

export default class App extends Component<unknown, IState> {
  state: IState = {
    tasks: [],
    sortValue: 'all',
  };

  createTaskItem = (label: string, min: number, sec: number): ITask => {
    return {
      id: new Date().toString() + Math.random() * 100,
      created: new Date(),
      completed: false,
      label: label,
      min,
      sec,
    };
  };

  onCreateNewTask = (value: string, min: number, sec: number): void => {
    const newMin: number = isNaN(min) ? 0 : min;
    const newSec: number = isNaN(sec) ? 0 : sec;
    this.setState(({ tasks }: IState): { tasks: ITask[] } => {
      return {
        tasks: [...tasks, this.createTaskItem(value, newMin, newSec)],
      };
    });
  };

  onCompletedTasks = (id: string): void => {
    this.setState(({ tasks }: IState): { tasks: ITask[] } => {
      return {
        tasks: tasks.map((task): ITask => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };
    });
  };

  onRemoveTask = (id: string): void => {
    this.setState(({ tasks }: IState): { tasks: ITask[] } => {
      return {
        tasks: tasks.filter((task): boolean => task.id !== id),
      };
    });
  };

  onEditLabelTask = (id: string, value: string): void => {
    this.setState(({ tasks }: IState): { tasks: ITask[] } => {
      return {
        tasks: tasks.map((task): ITask => {
          if (task.id === id) {
            return { ...task, label: value };
          }
          return task;
        }),
      };
    });
  };

  onClearCompletedTasks = (): void => {
    this.setState(({ tasks }: IState): { tasks: ITask[] } => {
      return {
        tasks: tasks.filter((task) => !task.completed),
      };
    });
  };

  onSortTasks = (value: string): ITask[] => {
    const { tasks } = this.state;
    switch (value) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  onChangeSortValue = (value: string): void => {
    this.setState({
      sortValue: value,
    });
  };

  onUpdateSec = (id: string): void => {
    this.setState(({ tasks }): { tasks: ITask[] } => {
      return {
        tasks: tasks.map((task): ITask => {
          if (task.id === id) {
            if (task.sec < 59) {
              return { ...task, sec: task.sec + 1 };
            }
            return { ...task, sec: 0, min: task.min + 1 };
          }
          return task;
        }),
      };
    });
  };

  render(): JSX.Element {
    const { sortValue } = this.state;
    const tasksCount = this.onSortTasks('Active').length;
    const visibleTasks = this.onSortTasks(sortValue);
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onCreateNewTask={this.onCreateNewTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onCompletedTasks={this.onCompletedTasks}
            onRemoveTask={this.onRemoveTask}
            onEditLabelTask={this.onEditLabelTask}
            onUpdateSec={this.onUpdateSec}
          />
          <Footer
            tasksCount={tasksCount}
            onClearCompletedTasks={this.onClearCompletedTasks}
            onChangeSortValue={this.onChangeSortValue}
          />
        </section>
      </section>
    );
  }
}
