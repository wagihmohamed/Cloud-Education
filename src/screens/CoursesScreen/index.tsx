import { Box, Typography } from "@mui/material";
import { CustomLayout } from "../../components";

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
          CoursesScreen
        </Typography>
      </Box>
    </CustomLayout>
  );
};
