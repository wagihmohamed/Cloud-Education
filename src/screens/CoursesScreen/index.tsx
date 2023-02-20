import { Box, Typography } from '@mui/material';
import { CoursesTable, CustomLayout } from 'components';

export const CoursesScreen = () => {
  return (
    <CustomLayout>
      <Box
        sx={{
          mt: 4,
          mx: 5,
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          All Courses
        </Typography>
        <CoursesTable />
      </Box>
    </CustomLayout>
  );
};
