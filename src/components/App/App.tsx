import React, {Component, JSX} from 'react';

import {Footer, NewTaskForm, TaskList} from "../index";

import {IProps, IState} from "./type";
import {ITask} from "../../types/tasks";


export default class App extends Component<IProps, IState> {

    state: IState = {
        tasks: [],
        sortValue: 'all'
    }

    createTaskItem = (label: string): ITask => {
        return {
            id: new Date().toString() + Math.random() * 100,
            created: new Date(),
            completed: false,
            label: label,
        }
    }

    onCreateNewTask = (value: string): void => {
        this.setState(({ tasks }: IState): {tasks: ITask[]} => {
            return {
                tasks: [...tasks, this.createTaskItem(value)]
            }
        })
    }

    onCompletedTasks = (id: string): void => {
        this.setState(({tasks}: IState): {tasks: ITask[]} => {
            return {
                tasks: tasks.map(task => {
                    if (task.id === id) {
                        return {...task, completed: !task.completed};
                    }
                    return task;
                })
            }
        });
    }
    onRemoveTask = (id: string): void => {
        this.setState(({tasks}: IState): {tasks: ITask[]} => {
            return {
                tasks: tasks.filter(task => task.id !== id)
            }
        })
    }
    onEditLabelTask = (id: string, value: string): void => {
        this.setState(({ tasks }: IState) : {tasks: ITask[]} => {
            return {
                tasks: tasks.map(task => {
                    if (task.id === id) {
                        return {...task, label: value};
                    }
                    return task;
                })
            }
        })
    }
    onClearCompletedTasks = (): void => {
        this.setState(({ tasks }: IState) : {tasks: ITask[]} => {
            return {
                tasks: tasks.filter(task => !task.completed)
            }
        });
    }

    onSortTasks = (value: string): ITask[] => {
        const {tasks} = this.state;
        switch (value) {
            case 'Active':
                return tasks.filter(task => !task.completed);
            case 'Completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    }
    onChangeSortValue = (value: string): void => {
        this.setState({
            sortValue: value
        });
    }


    render () : JSX.Element {
      const { tasks, sortValue } = this.state;
      const tasksCount = this.onSortTasks('Active').length;
      const visibleTasks = this.onSortTasks(sortValue);
      return (
          <section className="todoapp">
              <header className="header">
                  <h1>todos</h1>
                  <NewTaskForm
                    onCreateNewTask={this.onCreateNewTask}
                  />
              </header>
              <section className="main">
                  <TaskList
                    tasks={visibleTasks}
                    onCompletedTasks={this.onCompletedTasks}
                    onRemoveTask={this.onRemoveTask}
                    onEditLabelTask={this.onEditLabelTask}
                  />
                  <Footer
                      tasksCount={tasksCount}
                      onClearCompletedTasks={this.onClearCompletedTasks}
                      onChangeSortValue={this.onChangeSortValue}
                  />
              </section>
          </section>
      )
    }
}
