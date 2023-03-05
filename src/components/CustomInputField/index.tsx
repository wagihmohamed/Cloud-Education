/**
 * eslint-disable
 *
 * @format
 */

import { useState } from 'react';
import { Box, TextField } from '@mui/material';
export const CustomInputField = ({
	messageHandler,
}: {
	messageHandler: (message: string) => void;
}) => {
	const [input, setInput] = useState<string>();
	const sendMessageHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && input?.trim()) {
			messageHandler(input);
			e.preventDefault();
			setInput('');
		}
	};
	const textFieldOnChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setInput(e.target.value);
	};
	return (
		<Box>
			<TextField
				value={input}
				multiline
				id="outlined-basic"
				label="Messages"
				inputProps={{ style: { fontSize: 26, lineHeight: 1.25 } }}
				fullWidth
				type={'text'}
				variant="outlined"
				onKeyDown={(e) => sendMessageHandler(e)}
				placeholder="Type Messages ......✉ and Press Enter"
				onChange={(e) => textFieldOnChangeHandler(e)}
			/>
		</Box>
	);
};
