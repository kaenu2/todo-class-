import React, { Component, JSX } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { IProps, IState } from './type'

export default class Task extends Component<IProps, IState> {
  static defaultProps: IProps = {
		task: { id: '1', label: 'Tasks not defined', created: new Date(), completed: false },
		onCompletedTasks: (): void => {},
		onRemoveTask: (): void => {},
		onEditLabelTask: (): void => {},
	};

	timerId: any;

	state: IState = {
		edit: false,
		value: this.props.task.label,
		created: 'just',
	};

	componentDidMount(): void {
		this.timerId = setInterval(() => {
			this.setState({
				created: this.createCreatedRender(),
			});
		}, 2500);
  }

	componentWillUnmount(): void {
		clearInterval(this.timerId);
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

	render(): JSX.Element {
		const { task, onCompletedTasks, onRemoveTask } = this.props;
		const { id, label, created, completed } = task;
    const { edit, value } = this.state;
    function onChangeClassName(completed: boolean, edit: boolean): string {
			let className: string = '';
			if (completed) {
				className += ' completed';
      }
			if (edit) {
				className += ' editing';
      }
			return className;
		}

    return (
			<li className={onChangeClassName(completed, edit)}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={completed} onChange={() => onCompletedTasks(id)} />
					<label>
						<span className="description">{label}</span>
						<span className="created">created {this.state.created}</span>
					</label>
					<button className="icon icon-edit" onClick={this.onEditTask} aria-label={'Editing task' + label}></button>
					<button
						className="icon icon-destroy"
						onClick={(): void => onRemoveTask(id)}
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
