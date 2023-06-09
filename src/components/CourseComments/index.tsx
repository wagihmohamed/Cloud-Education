import { Drawer, Stack, Typography, Box, Avatar } from '@mui/material';
import { useState, useRef } from 'react';
import { Delete } from '@mui/icons-material';
import { theme } from 'theme';
import {
	CustomTextField,
	LoadingErrorPlaceholder,
	CustomButton,
} from 'components';
import {
	useAddComment,
	useDeleteComment,
	useGetCommentsBySectionId,
} from 'hooks';
import { useParams } from 'react-router-dom';
import { EmptyComments } from 'assets';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

interface CourseCommentsInterface {
	sectionId: number;
	openComments: boolean;
	setOpenComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CourseComments = ({
	openComments,
	setOpenComments,
	sectionId,
}: CourseCommentsInterface) => {
	const { courseId } = useParams();
	const { email } = useAuth();
	const { mutate: deleteComment } = useDeleteComment({});
	const { isLoading: isAddCommentLoading, mutate: addComment } = useAddComment({
		onSuccess: () => {
			setComment('');
			setTimeout(() => {
				if (containerRef.current) {
					containerRef.current.scrollTop = containerRef.current.scrollHeight;
				}
			}, 100);
		},
		onError: (err) => {
			toast.error(err.response?.data.message || 'Something went wrong');
		},
	});
	const {
		data: comments = {
			status: '',
			data: [],
		},
		isLoading,
		isError,
	} = useGetCommentsBySectionId(courseId || '', sectionId);
	const [comment, setComment] = useState<string>('');
	const containerRef = useRef<HTMLDivElement>(null);

	const handleAddComment = () => {
		addComment({
			content: comment || '',
			courseCode: courseId || '',
			sectionOrder: sectionId,
		});
	};

	return (
		<Drawer
			anchor="right"
			open={openComments}
			onClose={() => setOpenComments(false)}
		>
			<LoadingErrorPlaceholder
				width="600px"
				isLoading={isLoading}
				isError={isError}
				isEmpty={comments.data.length === 0}
				emptyImg={EmptyComments as string}
				imgWidth="300px"
				imgHeight="300px"
				emptyText={
					<>
						<Typography variant="h4" fontWeight="bold">
							No comments yet
						</Typography>
						<Typography variant="h4" fontWeight="bold">
							Be the first to comment
						</Typography>
					</>
				}
			>
				<Box
					sx={{
						width: '100%',
						bgcolor: '#f2f2f2',
					}}
				>
					<CustomButton
						width="100px"
						m="1rem"
						warning={true}
						onClick={() => setOpenComments(false)}
					>
						Close
					</CustomButton>
				</Box>
				<Stack
					ref={containerRef}
					sx={{
						padding: '.8rem',
						alignItems: 'center',
						height: '90%',
						overflowY: 'scroll',
						bgcolor: '#f2f2f2',
						width: '600px',
						[theme.breakpoints.down('md')]: {
							width: '100%',
						},
					}}
				>
					<Typography variant="h3" sx={{ margin: '1rem auto' }}>
						Comments :-
					</Typography>
					{comments.data.map(({ id, content, user }) => {
						return (
							<Stack
								key={id}
								display="flex"
								flexDirection="row"
								justifyContent="space-between"
								alignItems="center"
								sx={{
									width: '95%',
									margin: '1rem auto',
									padding: '10px',
									borderRadius: '5px',
									border: 'solid black 2px',
									bgcolor: '#fff',
									boxShadow:
										'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-start',
									}}
								>
									<Avatar>
										{user.firstName[0]}
										{user.lastName[0]}
									</Avatar>
									<Typography ml={2} textAlign="center">
										{content}
									</Typography>
								</Box>
								{email === user.email && (
									<Delete
										onClick={() =>
											deleteComment({
												courseCode: courseId || '',
												sectionOrder: sectionId,
												commentId: id,
											})
										}
										sx={{
											cursor: 'pointer',
											color: '#d32f2f',
											':hover': {
												color: 'red',
											},
											ml: 'auto',
										}}
									/>
								)}
							</Stack>
						);
					})}
				</Stack>
			</LoadingErrorPlaceholder>
			<Stack
				direction="row"
				sx={{ p: '1rem', bgcolor: '#f2f2f2' }}
				justifyContent="space-between"
				alignItems="center"
				spacing={1}
			>
				<CustomTextField
					placeholder="add your comment and hit Enter &#10149;"
					sx={{ margin: '1rem auto', width: '90%' }}
					value={comment}
					autoComplete="off"
					onChange={(e) => {
						setComment(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key == 'Enter' && comment) {
							handleAddComment();
						}
					}}
				/>
				<CustomButton
					py="6px"
					bgColor="#388e3c"
					loading={isAddCommentLoading}
					loadingButton
					disabled={isAddCommentLoading}
					onClick={handleAddComment}
				>
					Send
				</CustomButton>
			</Stack>
		</Drawer>
	);
};
