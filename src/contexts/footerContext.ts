import { createContext } from 'react';

export interface IFooterContext {
  tasksCount: number;
  onClearCompletedTasks: () => void;
  onChangeSortValue: (value: string) => void;
}
export const FooterContext = createContext<IFooterContext>({
  tasksCount: 0,
  onClearCompletedTasks: () => {},
  onChangeSortValue: () => {},
});
