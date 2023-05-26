import { Button } from '@mui/material';
interface CourseTabInterface {
	id?: string;
	selectedCourseId?: string;
	title?: string;
	setSelectedCourseId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CourseTab = ({
	id,
	selectedCourseId,
	title,
	setSelectedCourseId,
}: CourseTabInterface) => {
	return (
		<Button
			onClick={() => setSelectedCourseId(id)}
			sx={{
				bgcolor: '#dee2e6',
				color: '#696969',
				borderRadius: '0',
				fontSize: '1rem',
				minWidth: '200px',
				borderInline: '#696969 solid 1px',
				fontWeight: id === selectedCourseId ? 'bold' : 'normal',
			}}
		>
			{title}
		</Button>
	);
};
