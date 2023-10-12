import React, {Component, JSX} from 'react';

export default class TasksFilter extends Component{
    render(): JSX.Element {
        return (
            <ul className="filters">
                <li>
                    <button className="selected">All</button>
                </li>
                <li>
                    <button>Active</button>
                </li>
                <li>
                    <button>Completed</button>
                </li>
            </ul>
        );
    }
};
