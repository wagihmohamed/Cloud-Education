import { Box, Modal, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CustomButton, CustomTextField } from 'components';
import { theme } from 'theme';
import { useState } from 'react';
interface ModalInterface {
	opneModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FeedbackModal = ({ opneModal, setOpenModal }: ModalInterface) => {
	const [feedback, setFeedback] = useState('');
	const feedbackSubmitHandler = () => {
		//send feedback

		setFeedback('');
	};
	return (
		<Modal open={opneModal} onClose={() => setOpenModal(false)}>
			<Box
				sx={{
					position: 'absolute',
					padding: '3rem',
					outline: '0',
					borderRadius: '15px',
					top: '40%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '50%',
					[theme.breakpoints.down('md')]: {
						width: '80%',
					},
					bgcolor: 'background.paper',
					border: '2px solid #000',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography
					id="modal-modal-title"
					variant="h4"
					component="h2"
					sx={{ margin: '1rem' }}
				>
					Rating Course and Submit Feedback
				</Typography>
				<CustomTextField
					placeholder="add feedback to course"
					multiline
					rows={4}
					onChange={(e) => {
						setFeedback(e.target.value);
					}}
					value={feedback}
				/>
				<Stack
					direction={'row'}
					margin={'1rem auto'}
					justifyContent={'space-between'}
					spacing={4}
				>
					<CustomButton
						fullWidth
						warning={true}
						sx={{ width: '100px' }}
						onClick={() => setOpenModal(false)}
					>
						Cancel
					</CustomButton>
					<CustomButton
						fullWidth
						endIcon={<SendIcon />}
						onClick={feedbackSubmitHandler}
					>
						Submit
					</CustomButton>
				</Stack>
			</Box>
		</Modal>
	);
};
