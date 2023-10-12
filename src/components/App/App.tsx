import React, {Component, JSX} from 'react';
import {Footer, NewTaskForm, TaskList} from "../index";
import {ITask} from "../../types/tasks";

interface IState {
    tasks: ITask[]
}
export default class App extends Component {
        state : IState = {
            tasks: [
                {id: 1, label: 'Completed task', created: 'created 17 seconds ago', edit: false, completed: true},
                {id: 2, label: 'Editing task', created: 'created 5 minutes ago', edit: true, completed: false},
                {id: 3, label: 'Active task', created: 'created 5 minutes ago', edit: false, completed: false}
            ]
        }
  render () : JSX.Element {
      const { tasks } = this.state;
      return (
          <section className="todoapp">
              <header className="header">
                  <h1>todos</h1>
                  <NewTaskForm />
              </header>
              <section className="main">
                  <TaskList tasks={tasks}/>
                  <Footer />
              </section>
          </section>
      )
  }
}
