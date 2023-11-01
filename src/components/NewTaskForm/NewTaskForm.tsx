import React, { useContext, useState } from 'react';

import { HeaderContext } from '../../contexts';

export const NewTaskForm = () => {
  const { onCreateNewTask } = useContext(HeaderContext);
  const [valueTask, setValueTask] = useState('');
  const [valueMin, setValueMin] = useState('');
  const [valueSec, setValueSec] = useState('');

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (valueTask.trim()) {
      onCreateNewTask(valueTask.trim(), Number(valueMin), Number(valueSec));
    }
    setValueMin('');
    setValueTask('');
    setValueSec('');
  };

  const onChangeLabelValue = (value: string) => {
    setValueTask(value);
  };
  const onChangeMinValue = (value: string) => {
    setValueMin(value);
  };
  const onChangeSecValue = (value: string) => {
    setValueSec(value);
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmitForm}>
      <input
        className="new-todo"
        value={valueTask}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChangeLabelValue(e.target.value)}
        placeholder="Task"
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeMinValue(e.target.value)}
        value={valueMin}
        type="number"
        min={0}
        max={59}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeSecValue(e.target.value)}
        value={valueSec}
        min={0}
        max={59}
        type="number"
        autoFocus
      />
      <button style={{ display: 'none' }}></button>
    </form>
  );
};
