import React, {Component, JSX} from 'react';

interface IProps {
    label: string;
    created:string;
    edit: boolean;
    completed: boolean;
}

export default class Task extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }
    render(): JSX.Element {
        const {label, created, edit, completed} = this.props;
        function onChengeClassname(completed: boolean, edit: boolean): string {
            return completed ? 'completed' : edit ? 'editing' : '';
        }

        return (
            <li className={onChengeClassname(completed, edit)}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed} onChange={() => {}} />
                    <label>
                        <span className="description">{label}</span>
                        <span className="created">{created}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                {
                    edit && (
                        <input
                            className='edit'
                            value={label}
                            onChange={() => {}}
                            type="text" />
                    )
                }
            </li>
        );
    }
};
