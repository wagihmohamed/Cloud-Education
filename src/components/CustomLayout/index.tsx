import React from "react";
import { Box, BoxProps } from "@mui/material";
import { CustomNavBar } from "../CustomNavBar";

interface MainViewContainerProps extends BoxProps {
  children: React.ReactNode;
}
export const CustomLayout = ({ children, ...prop }: MainViewContainerProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
      {...prop}
    >
      <CustomNavBar />
      {children}
    </Box>
  );
};
