import { Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export const CourseContentItem = ({ txt }: { txt?: string }) => {
	return (
		<Stack my={2} direction={'row'} spacing={1} alignItems={'center'} pl={1}>
			<CheckCircleOutlineIcon sx={{ marginRight: '5px' }} />
			<Typography fontWeight="bold" fontSize={20}>
				{txt}
			</Typography>
		</Stack>
	);
};
