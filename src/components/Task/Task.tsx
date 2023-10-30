import React, { Component, JSX } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { IProps, IState } from './type';

export default class Task extends Component<IProps, IState> {
  static defaultProps: IProps = {
    task: { id: '1', label: 'Tasks not defined', created: new Date(), completed: false, sec: 0, min: 0, timerId: 0 },
    onCompletedTasks: (): void => {},
    onRemoveTask: (): void => {},
    onEditLabelTask: (): void => {},
    onUpdateTimeValue: (): void => {},
    onPlayTimer: (): void => {},
    onStopTimer: (): void => {},
  };

  state: IState = {
    edit: false,
    value: this.props.task.label,
    created: 'just',
  };

  componentDidMount() {
    this.onUpdateCreated();
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { task, onStopTimer } = this.props;
    const { id, completed } = task;
    if (prevProps.task.completed !== completed) {
      onStopTimer(id);
    }
    if (prevProps !== this.props) {
      this.onUpdateCreated();
    }
  }

  onUpdateCreated() {
    this.setState({
      created: this.createCreatedRender(),
    });
  }

  createCreatedRender(): string {
    return formatDistanceToNow(this.props.task.created, { includeSeconds: true });
  }

  onEditTask = (): void => {
    this.setState(({ edit }: IState): { edit: boolean } => {
      return {
        edit: !edit,
      };
    });
  };

  onChangeNewValue = (newValue: string): void => {
    this.setState({
      value: newValue,
    });
  };

  onCheckKeyUp = (key: string, id: string, value: string): boolean => {
    const { task, onEditLabelTask } = this.props;
    if (key === 'Enter') {
      onEditLabelTask(id, value);
      this.onEditTask();
      return true;
    }
    if (key === 'Escape') {
      this.onEditTask();
      this.setState({
        value: task.label,
      });
      return false;
    }
    return false;
  };

  onChangeClassName(completedValue: boolean, editValue: boolean): string {
    let className = '';
    if (completedValue) {
      className += ' completed';
    }
    if (editValue) {
      className += ' editing';
    }
    return className;
  }

  onCheckNumber(value: number): string {
    return value < 10 ? `0${value}` : String(value);
  }

  render(): JSX.Element {
    const { task, onCompletedTasks, onRemoveTask, onPlayTimer, onStopTimer } = this.props;
    const { id, label, completed, min, sec } = task;
    const { edit, value } = this.state;

    return (
      <li className={this.onChangeClassName(completed, edit)}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={() => onCompletedTasks(id)} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button
                className="icon icon-play"
                disabled={completed}
                aria-label="Start timer"
                onClick={(): void => {
                  onPlayTimer(id);
                }}></button>
              <button
                className="icon icon-pause"
                aria-label="Pause timer"
                disabled={completed}
                onClick={(): void => onStopTimer(id)}></button>
              {this.onCheckNumber(min)}:{this.onCheckNumber(sec)}
            </span>
            <span className="description">created {this.state.created}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEditTask} aria-label={'Editing task' + label}></button>
          <button
            className="icon icon-destroy"
            onClick={(): void => {
              onStopTimer(id);
              onRemoveTask(id);
            }}
            aria-label={'Remove task' + label}></button>
        </div>
        {edit && (
          <input
            className="edit"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.onChangeNewValue(e.target.value)}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => this.onCheckKeyUp(e.key, id, value)}
            type="text"
            autoFocus
          />
        )}
      </li>
    );
  }
}
