import * as React from 'react';
import { compose, lifecycle, withProps, withStateHandlers } from 'recompose';

interface IStateWithRecompose {
	hobby: string;
	name: string;
}

const Enhancer = compose(
	withStateHandlers(
		({ name = 'unknown', hobby = '' }: IStateWithRecompose) => ({
			hobby,
			name
		}),
		{
			updateState: (state: IStateWithRecompose) => (value: any) => {
				return { ...state, ...value };
			}
		}
	),
	withProps({
		tellAboutMe: (props: IBaseComponentProps) => {
			alert(`Your name is ${props.name} and Your hobby is  ${props.hobby}`);
		}
	}),
	lifecycle({
		componentWillUnmount() {
			const props = this.props as IStateWithRecompose;
			console.log(`Your Name is ${props.name} now`);
		},
		componentDidMount() {
			const props = this.props as IStateWithRecompose;
			console.log(`Your Name is ${props.name} now`);
		}
	})
);

interface IStateUpdatePayload {
	name?: string;
	hobby?: string;
}

interface IBaseComponentProps extends IStateWithRecompose {
	tellAboutMe: (props: IBaseComponentProps) => void;
	updateState: (state: IStateUpdatePayload) => void;
}

/* tslint:disable jsx-no-lambda */
const BaseComponent = (props: IBaseComponentProps) => (
	<div>
		<h1>Tell Me About You With Recompose 😋</h1>
		<div>{props.name}</div>
		<input
			type="text"
			value={props.name}
			onChange={(e) => {
				props.updateState({ name: e.currentTarget.value });
			}}
		/>
		<input
			type="text"
			value={props.hobby}
			onChange={(e) => {
				props.updateState({ hobby: e.currentTarget.value });
			}}
		/>

		<button
			onClick={() => {
				props.tellAboutMe(props);
			}}
		>
			Tell
		</button>
	</div>
);

export const LifeCycle = Enhancer(BaseComponent as React.StatelessComponent);
