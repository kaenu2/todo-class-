import React, { Component, JSX } from 'react';

import { IProps, IState } from './type'

export default class TasksFilter extends Component<IProps, IState> {
	static defaultProps: IProps = {
		onChangeSortValue: (): void => {},
	};

	state: IState = {
		buttons: [
			{ id: 1, label: 'All', value: 'All' },
			{ id: 2, label: 'Active', value: 'Active' },
			{ id: 3, label: 'Completed', value: 'Completed' },
		],
		buttonValue: 'All',
	};

	onChangeBtnValue = (value: string): void => {
		const { onChangeSortValue } = this.props;
		this.setState({ buttonValue: value });
    onChangeSortValue(value);
  };

	render(): JSX.Element {
		const { buttons, buttonValue } = this.state;
		return (
			<ul className="filters">
				{buttons.map(btn => {
					const { label, id, value } = btn;
          return (
						<li key={id}>
							<button
								className={buttonValue === value ? 'selected' : ''}
								onClick={(): void => this.onChangeBtnValue(value)}>
								{label}
							</button>
						</li>
					);
				})}
			</ul>
		);
	}
}
