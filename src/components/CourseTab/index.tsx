import { Box, Button, Skeleton, Stack, TextField } from '@mui/material';
import { CustomButton } from 'components/CustomButton';
import { Add, Check, Delete } from '@mui/icons-material';
import {
	useAddCourseSection,
	useGetCourseSections,
	useDeleteCourseSection,
} from 'hooks';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface CourseTabInterface {
	selectedCourseId?: string;
	setSelectedCourseId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CourseTab = ({
	selectedCourseId = '',
	setSelectedCourseId,
}: CourseTabInterface) => {
	const { courseId } = useParams();
	const {
		isLoading,
		data: sections = {
			status: '',
			data: [],
		},
	} = useGetCourseSections({
		courseCode: courseId || '',
	});

	const { mutate: addSection, isLoading: isAddCourseLoading } =
		useAddCourseSection({
			onSuccess: () => {
				toast.success('Section Added Successfully');
				setCourseTitle('');
				setTriggerButton(false);
			},
			onError: (err) => {
				toast.error(err.response?.data.message || 'Error Adding Section');
				setTriggerButton(false);
			},
		});

	const { mutate: deleteSection, isLoading: isDeleteLoading } =
		useDeleteCourseSection({
			onSuccess: () => {
				setSelectedCourseId((prev) => (parseInt(prev || '0') - 1).toString());
			},
		});

	const [courseTitle, setCourseTitle] = useState('');
	const [triggerAddButton, setTriggerButton] = useState(false);
	const isActionsLoading = isAddCourseLoading || isDeleteLoading;

	if (isLoading) {
		return <Skeleton animation="wave" width="100%" height="30px" />;
	}

	const handleAddSection = () => {
		if (courseTitle === '') {
			toast.error('Section Title is required');
			return;
		}
		addSection({
			courseCode: courseId || '',
			title: courseTitle,
		});
	};

	return (
		<Box
			sx={{
				opacity: isActionsLoading ? '0.5' : '1',
				display: 'flex',
				width: '100%',
			}}
		>
			{sections.data.map((section) => (
				<Fragment key={Math.random()}>
					<Button
						disabled={isActionsLoading}
						onClick={() => {
							setSelectedCourseId(section.order.toString());
						}}
						sx={{
							overflow: 'hidden',
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
							bgcolor: '#dee2e6',
							color: '#696969',
							borderRadius: '0',
							borderRight: 'none !important',
							textTransform: 'none',
							fontSize: '1rem',
							minWidth: '200px',
							borderInline: '#696969 solid 1px',
							fontWeight:
								section.order === parseInt(selectedCourseId)
									? 'bold'
									: 'normal',
						}}
					>
						{section.title}
					</Button>
					<Delete
						sx={{
							width: '1.5rem',
							height: '100%',
							cursor: 'pointer',
							alignSelf: 'center',
							bgcolor: '#dee2e6',
							color: '#d32f2f',
							':hover': {
								color: 'red',
							},
						}}
						onClick={() => {
							deleteSection({
								courseCode: courseId || '',
								sectionOrder: section.order,
							});
						}}
					/>
				</Fragment>
			))}
			<Stack direction="row">
				{triggerAddButton && (
					<TextField
						inputProps={{
							style: {
								padding: '9px',
								fontSize: '1rem',
							},
						}}
						variant="filled"
						size="medium"
						placeholder="Add Section"
						sx={{ padding: '0px', fontSize: '2rem', minWidth: '200px' }}
						value={courseTitle}
						onChange={(e) => setCourseTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && triggerAddButton) {
								handleAddSection();
							}
						}}
					/>
				)}
				<CustomButton
					loadingButton
					loading={isAddCourseLoading}
					textcolor="black"
					bgColor="#dee2e6"
					borderRadius={'0'}
					ml={2}
					onClick={() => {
						if (triggerAddButton && courseTitle) {
							handleAddSection();
						}
						setTriggerButton((prev) => !prev);
					}}
				>
					{
						<>
							{triggerAddButton ? (
								<Check sx={{ fontSize: '1.5rem', bgcolor: 'transparent' }} />
							) : (
								<Add sx={{ fontSize: '1.5rem', bgcolor: 'transparent' }} />
							)}
						</>
					}
				</CustomButton>
			</Stack>
		</Box>
	);
};
