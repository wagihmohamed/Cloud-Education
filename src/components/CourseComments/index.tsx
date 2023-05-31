import { Drawer, Stack, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Comment } from 'models';
import { courseComments } from 'mockup';
import { CustomButton } from 'components/CustomButton';
import { theme } from 'theme';
import { CustomTextField } from 'components/CustomTextField';
interface CourseCommentsInterface {
	openComments: boolean;
	setOpenComments: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CourseComments = ({
	openComments,
	setOpenComments,
}: CourseCommentsInterface) => {
	const [commentsList, setCommentsList] = useState<Comment[]>(courseComments);
	const [comment, setComment] = useState<string>();
	const containerRef = useRef<HTMLDivElement>(null);
	const addingNewComment = () => {
		if (comment) {
			const newComment: Comment = {
				id: new Date().getTime().toString(),
				content: comment,
			};
			const newComments: Comment[] = [...commentsList, newComment];
			setCommentsList(newComments);
			setComment('');
			setTimeout(() => {
				if (containerRef.current) {
					containerRef.current.scrollTop = containerRef.current.scrollHeight;
				}
			}, 100);
		}
	};
	return (
		<Drawer
			anchor="right"
			open={openComments}
			onClose={() => setOpenComments(false)}
		>
			<CustomButton
				width="100px"
				m="1rem"
				warning={true}
				onClick={() => setOpenComments(false)}
			>
				Close
			</CustomButton>
			<Stack
				ref={containerRef}
				sx={{
					padding: '.8rem',
					alignItems: 'center',
					height: '90%',
					overflowY: 'scroll',
					width: '600px',
					[theme.breakpoints.down('md')]: {
						width: '100%',
					},
				}}
			>
				<Typography variant="h3" sx={{ margin: '1rem auto' }}>
					Comments :-
				</Typography>
				{commentsList.map(({ id, content }) => {
					return (
						<Stack
							key={id}
							direction="row"
							alignItems="flex-start"
							sx={{
								width: '95%',
								margin: '1rem auto',
								padding: '10px',
								borderRadius: '5px',
								border: 'solid black 2px',
							}}
						>
							<PersonIcon sx={{ marginRight: '5px' }} />
							{content}
						</Stack>
					);
				})}
			</Stack>
			<Stack
				direction="row"
				sx={{ p: '1rem' }}
				justifyContent="space-between"
				alignItems="center"
				spacing={1}
			>
				<CustomTextField
					placeholder="add your comment and hit Enter &#10149;"
					sx={{ margin: '1rem auto', width: '90%' }}
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key == 'Enter') addingNewComment();
					}}
				/>
				<CustomButton
					py="6px"
					bgColor="#388e3c"
					onClick={() => addingNewComment()}
				>
					Send
				</CustomButton>
			</Stack>
		</Drawer>
	);
};
