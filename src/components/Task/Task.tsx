import React, { useContext, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { TaskContext } from '../../contexts';

import { IProps } from './type';

export const Task = ({ task }: IProps) => {
  const { id, label, completed, min, sec } = task;

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(label);
  const [created, setCreated] = useState('just');
  const { onEditLabelTask, onCompletedTasks, onRemoveTask, onPlayTimer, onStopTimer } = useContext(TaskContext);

  const createCreatedRender = (): string => {
    return formatDistanceToNow(task.created, { includeSeconds: true });
  };
  const onUpdateCreated = () => {
    setCreated(createCreatedRender());
  };

  useEffect(() => {
    onUpdateCreated();
  }, []);

  useEffect(() => {
    if (completed) {
      onStopTimer(id);
    }
  }, [completed]);

  useEffect(() => {
    onUpdateCreated();
  });

  const onEditTask = (): void => {
    setEdit((prevState) => !prevState);
  };

  const onChangeNewValue = (newValue: string): void => {
    setValue(newValue);
  };

  const onCheckKeyUp = (key: string, uid: string, chars: string): boolean => {
    if (key === 'Enter') {
      onEditLabelTask(uid, chars);
      onEditTask();
      return true;
    }
    if (key === 'Escape') {
      onEditTask();
      setValue(label);
      return false;
    }
    return false;
  };

  const onChangeClassName = (completedValue: boolean, editValue: boolean): string => {
    let className = '';
    if (completedValue) {
      className += ' completed';
    }
    if (editValue) {
      className += ' editing';
    }
    return className;
  };

  const onCheckNumber = (numbers: number): string => {
    return numbers < 10 ? `0${numbers}` : String(numbers);
  };

  return (
    <li className={onChangeClassName(completed, edit)}>
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
            {onCheckNumber(min)}:{onCheckNumber(sec)}
          </span>
          <span className="description">created {created}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditTask} aria-label={'Editing task' + label}></button>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeNewValue(e.target.value)}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => onCheckKeyUp(e.key, id, value)}
          type="text"
          autoFocus
        />
      )}
    </li>
  );
};
