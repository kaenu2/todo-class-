import React, { useContext, useState } from 'react';

import { FooterContext } from '../../contexts';

export const TasksFilter = () => {
  const [buttons] = useState([
    { id: 1, label: 'All', value: 'All' },
    { id: 2, label: 'Active', value: 'Active' },
    { id: 3, label: 'Completed', value: 'Completed' },
  ]);
  const [buttonValue, setButtonValue] = useState('All');
  const { onChangeSortValue } = useContext(FooterContext);

  const onChangeBtnValue = (value: string): void => {
    setButtonValue(value);
    onChangeSortValue(value);
  };

  return (
    <ul className="filters">
      {buttons.map((btn) => {
        const { label, id, value } = btn;
        return (
          <li key={id}>
            <button className={buttonValue === value ? 'selected' : ''} onClick={(): void => onChangeBtnValue(value)}>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
