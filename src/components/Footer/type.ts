export interface IProps {
  tasksCount: number;
  onClearCompletedTasks: () => void;
  onChangeSortValue: (value: string) => void;
}
