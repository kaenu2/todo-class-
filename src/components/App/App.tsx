import React, { useState } from 'react';

import { Footer, NewTaskForm, TaskList } from '../index';
import { ITask } from '../../types/tasks';
import { FooterContext, HeaderContext, TaskContext } from '../../contexts';

export const App = () => {
  const [tasks, setTasks] = useState<[] | ITask[]>([]);
  const [sortValue, setSortValue] = useState('all');

  const createTaskItem = (label: string, min: number, sec: number): ITask => {
    return {
      id: new Date().toString() + Math.random() * 100,
      created: new Date(),
      completed: false,
      label: label,
      min: min > 59 ? 0 : min,
      sec: sec > 59 ? 0 : sec,
      timerId: 0,
    };
  };

  const onCreateNewTask = (value: string, min: number, sec: number): void => {
    const newMin: number = isNaN(min) ? 0 : min;
    const newSec: number = isNaN(sec) ? 0 : sec;
    setTasks((prevState) => {
      return [...prevState, createTaskItem(value, newMin, newSec)];
    });
  };

  const onCompletedTasks = (id: string): void => {
    setTasks((prevState) =>
      prevState.map((task): ITask => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  };

  const onRemoveTask = (id: string): void => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const onEditLabelTask = (id: string, value: string): void => {
    setTasks((prevState) =>
      prevState.map((task): ITask => {
        return task.id === id ? { ...task, label: value } : task;
      })
    );
  };

  const onClearCompletedTasks = (): void => {
    setTasks((prevState) => prevState.filter((task) => !task.completed));
  };

  const onSortTasks = (value: string): ITask[] => {
    switch (value) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const onChangeSortValue = (value: string): void => {
    setSortValue(value);
  };

  const onUpdateTimeValue = (id: string): void => {
    setTasks((prevState) => {
      return prevState.map((task): ITask => {
        if (task.id === id) {
          if (task.sec < 59) {
            return { ...task, sec: task.sec + 1 };
          }
          return { ...task, sec: 0, min: task.min + 1 };
        }
        return task;
      });
    });
  };

  const onPlayTimer = (id: string): void => {
    setTasks((prevState) => {
      return prevState.map((task): ITask => {
        if (task.id === id) {
          return {
            ...task,
            timerId: task.timerId ? task.timerId : setInterval(() => onUpdateTimeValue(id), 1000),
          };
        }
        return task;
      });
    });
  };

  const onStopTimer = (id: string): void => {
    const taskId = tasks.filter((task) => task.id === id)[0];
    clearInterval(taskId.timerId);
    setTasks((prevState) =>
      prevState.map((elem): ITask => {
        return elem.id === id ? { ...elem, timerId: 0 } : elem;
      })
    );
  };

  const tasksCount = onSortTasks('Active').length;
  const visibleTasks = onSortTasks(sortValue);

  const tasksContextValue = {
    tasks: visibleTasks,
    onCompletedTasks,
    onRemoveTask,
    onEditLabelTask,
    onUpdateTimeValue,
    onPlayTimer,
    onStopTimer,
  };
  const footerContextValue = {
    tasksCount,
    onClearCompletedTasks,
    onChangeSortValue,
  };
  const headerContextValue = {
    onCreateNewTask,
  };

  return (
    <section className="todoapp">
      <HeaderContext.Provider value={headerContextValue}>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
      </HeaderContext.Provider>
      <section className="main">
        <TaskContext.Provider value={tasksContextValue}>
          <TaskList />
        </TaskContext.Provider>
        <FooterContext.Provider value={footerContextValue}>
          <Footer />
        </FooterContext.Provider>
      </section>
    </section>
  );
};
