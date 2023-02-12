import { Box } from "@mui/material";
import { CustomNavLink } from "../CustomNavLink";

export const CustomNavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100px",
        height: "100%",
        borderRight: "2px solid #000",
        bgcolor: "white",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <CustomNavLink to="/home">Home</CustomNavLink>
      <CustomNavLink to="/courses">Courses</CustomNavLink>
      <CustomNavLink to="/leaderboard">Leaderboard</CustomNavLink>
      <CustomNavLink isLast to="/messages">
        Messages
      </CustomNavLink>
      <Box mt="auto">
        <CustomNavLink isLast to="/profile">
          Profile
        </CustomNavLink>
      </Box>
    </Box>
  );
};
