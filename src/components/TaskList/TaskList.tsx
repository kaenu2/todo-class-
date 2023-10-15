import React, { Component, JSX } from 'react'

import Task from '../Task'

import { IProps, IState } from './type'

export default class TaskList extends Component<IProps, IState> {
  static defaultProps: IProps = {
		tasks: [{ id: '1', label: 'Tasks not defined', created: new Date(), completed: false }],
		onCompletedTasks: (): void => {},
		onEditLabelTask: (): void => {},
		onRemoveTask: (): void => {},
	};

	render(): JSX.Element {
		const { tasks, onCompletedTasks, onRemoveTask, onEditLabelTask } = this.props;
    return (
			<ul className="todo-list">
				{tasks.map(task => {
					const { id } = task;
					return (
						<Task
							key={id}
							task={task}
							onCompletedTasks={onCompletedTasks}
							onRemoveTask={onRemoveTask}
							onEditLabelTask={onEditLabelTask}
						/>
					);
				})}
			</ul>
		);
	}
}
