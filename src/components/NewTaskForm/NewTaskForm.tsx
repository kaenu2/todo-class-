import React, { Component, JSX } from 'react';

import { IProps, IState } from './type';

export default class NewTaskForm extends Component<IProps, IState> {
  static defaultProps: IProps = {
    onCreateNewTask: (): void => {},
  };

  state: IState = {
    value: '',
  };

  onChangeValue = (newValue: string): void => {
    if (newValue) {
      this.setState((): { value: string } => {
        return {
          value: newValue,
        };
      });
    }
  };

  onSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { value } = this.state;
    if (value) {
      this.props.onCreateNewTask(value);
      this.setState((): { value: string } => {
        return {
          value: '',
        };
      });
    }
  };

  render(): JSX.Element {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.onChangeValue(e.target.value)}
          value={value}
          autoFocus
        />
      </form>
    );
  }
}
