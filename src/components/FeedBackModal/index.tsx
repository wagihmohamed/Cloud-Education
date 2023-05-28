import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CustomTextField } from 'components';
import { theme } from 'theme';
interface ModalInterface {
	opneModal: boolean;
	feedback?: string;
	setFeedBack: React.Dispatch<React.SetStateAction<string>>;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	feedbackSubmitHandler: () => void;
}
export const FeedbackModal = ({
	opneModal,
	setOpenModal,
	feedback,
	setFeedBack,
	feedbackSubmitHandler,
}: ModalInterface) => {
	const handleModalState = () => {
		setOpenModal((prev) => !prev);
	};
	return (
		<Modal
			open={opneModal}
			onClose={handleModalState}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
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
						setFeedBack(e.target.value);
					}}
					value={feedback}
				></CustomTextField>
				<Stack
					direction={'row'}
					margin={'1rem auto'}
					justifyContent={'center'}
					spacing={4}
				>
					<Button
						variant="contained"
						color="error"
						sx={{ width: '100px' }}
						onClick={handleModalState}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						endIcon={<SendIcon />}
						onClick={feedbackSubmitHandler}
					>
						Submit
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};
