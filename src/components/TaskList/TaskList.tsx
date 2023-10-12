import React, {Component, JSX} from 'react';

import {ITask} from "../../types/tasks";

import Task from "../Task";

interface IProps {
    tasks: ITask[]
}

export default class TaskList extends Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }
    render(): JSX.Element {
        const {tasks} = this.props;
        return (
            <ul className="todo-list">
                {
                    tasks.map(task => {
                        const {id, ...other} = task;
                        return (
                            <Task
                                key={id}
                                {...other} />
                        )
                    })
                }
            </ul>
        );
    }
};
