/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Typography } from '@mui/material';
import Select from 'react-select';

interface CustomSelectProps {
	options: { label: string; value: string }[];
	onChange: any;
	withLabel?: boolean;
	label?: string;
	error?: boolean;
	helperText?: string;
	value?: { label: string; value: string } | { label: string; value: string }[];
	placeholder?: string;
	disabled?: boolean;
	isMulti?: boolean;
	width?: string;
}

export const CustomSelect = ({
	onChange,
	options,
	withLabel,
	label,
	error,
	helperText,
	disabled,
	placeholder,
	value,
	isMulti,
	width,
}: CustomSelectProps) => {
	return (
		<>
			{withLabel && (
				<Typography
					variant="subtitle1"
					mt={1}
					sx={{
						color: '#000',
						alignSelf: 'flex-start',
						fontWeight: 'bold',
						fontSize: '15px',
						mb: '6px',
					}}
				>
					{label}
				</Typography>
			)}
			<Select
				value={value}
				isMulti={isMulti}
				isDisabled={disabled}
				placeholder={placeholder ?? `Select ${label ?? ''}`}
				styles={{
					control: (provided) => ({
						...provided,
						minHeight: '45px',
						width,
						border: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
						'&:hover': {
							border: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
						},
						outline: '1px solid #c4c4c4',
						'&:focus': {
							border: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
						},
						'&:active': {
							border: error ? '1px solid #d32f2f' : '1px solid #c4c4c4',
						},
					}),
					valueContainer: (provided) => ({
						...provided,
						padding: '0 10px',
					}),
					menuList: (provided) => ({
						...provided,
						maxHeight: '200px',
					}),
				}}
				options={options}
				onChange={(e) => {
					onChange(e);
				}}
			/>
			{error && <p className="select-error">{helperText}</p>}
		</>
	);
};
