export interface IProps {
	onChangeSortValue: (value: string) => void;
}
export interface IState {
	buttons: IButtonFilter[];
	buttonValue: string;
}

export interface IButtonFilter {
	id: number;
	value: string;
	label: string;
}
