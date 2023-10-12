import React, {Component, JSX} from 'react';

import {TasksFilter} from "../index";

export default class Footer extends Component{
    render(): JSX.Element {
        return (
            <footer className="footer">
                <span className="todo-count">1 items left</span>
                <TasksFilter />
                <button className="clear-completed">Clear completed</button>
            </footer>
        );
    }

};

