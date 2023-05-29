/*eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Drawer, Stack, TextField, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Comment } from 'models';
import { courseComments } from 'mockup';
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

	const addingCommentHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && comment) {
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
			<Typography variant="h3" sx={{ margin: '1rem auto' }}>
				Comments :-
			</Typography>
			<Stack
				ref={containerRef}
				width={'400px'}
				sx={{
					padding: '.8rem',
					alignItems: 'center',
					height: '90%',
					overflowY: 'scroll',
				}}
			>
				{commentsList.map(({ id, content }) => {
					return (
						<Stack
							key={id}
							direction={'row'}
							alignItems={'flex-start'}
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
			<TextField
				placeholder="add your comment and hit Enter &#10149;"
				sx={{ margin: '1rem auto', width: '90%' }}
				value={comment}
				onChange={(e) => {
					setComment(e.target.value);
				}}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
					addingCommentHandler(e)
				}
			></TextField>
		</Drawer>
	);
};
