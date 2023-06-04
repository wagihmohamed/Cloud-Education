import { Box, Modal, Stack, Typography, Rating } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CustomButton, CustomTextField } from 'components';
import { theme } from 'theme';
import { useState } from 'react';
import { useAddReview } from 'hooks';
import { useParams } from 'react-router-dom';

interface ModalInterface {
	opneModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FeedbackModal = ({ opneModal, setOpenModal }: ModalInterface) => {
	const { courseId } = useParams();
	const { mutate: addReview, isLoading } = useAddReview({
		onSuccess: () => {
			setOpenModal(false);
			setReview('');
		},
	});
	const [review, setReview] = useState('');
	const [rating, setRating] = useState<number | null>(1);

	const handleAddReview = () => {
		if (rating && review) {
			addReview({
				review,
				courseCode: courseId || '',
				rating: rating === null ? 1 : rating * 2,
			});
		}
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
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						my: '2rem',
					}}
				>
					<Rating
						name="simple-controlled"
						value={rating}
						onChange={(_, newValue) => {
							setRating(newValue);
						}}
						precision={0.5}
						sx={{
							'& .MuiRating-iconEmpty': {
								fontSize: '3rem',
							},
							'& .MuiRating-iconFilled': {
								fontSize: '3rem',
							},
							'& .MuiRating-iconHover': {
								fontSize: '3rem',
							},
						}}
					/>
				</Box>
				<CustomTextField
					placeholder="add feedback to course"
					multiline
					rows={4}
					size="medium"
					value={review}
					onChange={(e) => {
						setReview(e.target.value);
					}}
				/>
				<Stack
					direction="row"
					margin="1rem auto"
					justifyContent="space-between"
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
						onClick={handleAddReview}
						loading={isLoading}
						loadingButton
					>
						Submit
					</CustomButton>
				</Stack>
			</Box>
		</Modal>
	);
};
