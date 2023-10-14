import React, {Component, JSX} from 'react';

import {TasksFilter} from "../index";

import {IProps, IState} from "./type";



export default class Footer extends Component<IProps, IState> {
    static defaultProps: IProps = {
        onChangeSortValue: (): void => {},
        onClearCompletedTasks: (): void => {},
        tasksCount: 0,
    }
    render(): JSX.Element {
        const {tasksCount, onClearCompletedTasks, onChangeSortValue} = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{tasksCount} items left</span>
                <TasksFilter
                    onChangeSortValue={onChangeSortValue}
                />
                <button
                    className="clear-completed"
                    onClick={() => onClearCompletedTasks()}>
                    Clear completed
                </button>
            </footer>
        );
    }

};

