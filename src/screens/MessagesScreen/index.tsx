import { Typography, Box } from "@mui/material";
import { CustomLayout } from "../../components";

export const MessagesScreen = () => {
  return (
    <CustomLayout>
      <Box
        sx={{
          mt: 4,
          mx: 5,
        }}
      >
        <Typography fontWeight="bold" variant="h4">
          MessagesScreen
        </Typography>
      </Box>
    </CustomLayout>
  );
};
