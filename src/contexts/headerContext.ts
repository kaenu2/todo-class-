import { createContext } from 'react';

export interface IHeaderContext {
  onCreateNewTask: (value: string, min: number, sec: number) => void;
}

export const HeaderContext = createContext<IHeaderContext>({
  onCreateNewTask: () => {},
});
