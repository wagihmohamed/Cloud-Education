import { Typography, Box } from "@mui/material";
import { CustomLayout, NotificationList } from "components";
import { messagesList } from "mockup";

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
        <NotificationList title="Messages" messagesList={messagesList} />
      </Box>
    </CustomLayout>
  );
};
