import { Box, Typography } from "@mui/material";
import { CustomLayout } from "../../components";

export const HomeScreen = () => {
  return (
    <CustomLayout>
      <Box
        sx={{
          mt: 4,
          mx: 5,
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          Welcome, Wagih.
        </Typography>
      </Box>
    </CustomLayout>
  );
};
