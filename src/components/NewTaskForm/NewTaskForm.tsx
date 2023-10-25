import React, { Component, JSX } from 'react';

import { IProps, IState } from './type';

export default class NewTaskForm extends Component<IProps, IState> {
  static defaultProps: IProps = {
    onCreateNewTask: (): void => {},
  };

  state: IState = {
    valueTask: '',
    valueMin: '',
    valueSec: '',
  };

  onSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { valueTask, valueSec, valueMin } = this.state;
    if (valueTask.trim()) {
      this.props.onCreateNewTask(valueTask.trim(), Number(valueMin), Number(valueSec));
    }
    this.setState({ valueTask: '', valueMin: '', valueSec: '' });
  };

  render(): JSX.Element {
    const { valueTask, valueSec, valueMin } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmitForm}>
        <input
          className="new-todo"
          value={valueTask}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ valueTask: e.target.value })}
          placeholder="Task"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ valueMin: e.target.value })}
          value={valueMin}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ valueSec: e.target.value })}
          value={valueSec}
          autoFocus
        />
        <button style={{ display: 'none' }}></button>
      </form>
    );
  }
}
