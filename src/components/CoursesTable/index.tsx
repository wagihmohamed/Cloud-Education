import { useState } from "react";
import styled from "@emotion/styled";
import { coursesBodyData } from "../../mockup/coursesBodyData";
import { coursesTableColumns } from "../../mockup/coursesColumnData";
import { Stack } from "@mui/system";
import {
  DoDisturbOnOutlined,
  HighlightOffOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EditCourseModal } from "../EditCourseModal";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  ...theme,
  color: "#000",
  textAlign: "center",
  border: "4px solid #000000",
  backgroundColor: "#fff",
  fontSize: "20px",
}));

export const CoursesTable = () => {
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  return (
    <>
      <Table
        sx={{
          mt: 4,
          height: "100%",
          width: "100%",
          overflowY: "auto",
          borderSpacing: "0 15px !important",
          borderCollapse: "separate",
        }}
      >
        <TableHead
          sx={{
            backgroundColor: "primary.main",
          }}
        >
          <TableRow>
            {coursesTableColumns.map((column) => (
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  border: "4px solid white",
                }}
                key={column.id}
              >
                <Typography fontSize="20px" fontWeight="bold" variant="h4">
                  {column.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {coursesBodyData.map((row) => (
            <TableRow
              sx={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <CustomTableCell>{row.courseName}</CustomTableCell>
              <CustomTableCell>{row.category}</CustomTableCell>
              <CustomTableCell>{row.lastUpdated}</CustomTableCell>
              <CustomTableCell width="200px">
                <Stack direction="row" justifyContent="space-around">
                  <SettingsOutlined
                    sx={{
                      height: "30px",
                      width: "30px",
                    }}
                    onClick={() => {
                      setIsEditCourseOpen(true);
                    }}
                    cursor="pointer"
                    color="primary"
                  />
                  <HighlightOffOutlined
                    sx={{
                      height: "30px",
                      width: "30px",
                    }}
                    cursor="pointer"
                    color="primary"
                  />
                  <DoDisturbOnOutlined
                    sx={{
                      height: "30px",
                      width: "30px",
                    }}
                    cursor="pointer"
                    color="primary"
                  />
                </Stack>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditCourseModal
        handleClose={() => {
          setIsEditCourseOpen(false);
        }}
        open={isEditCourseOpen}
      />
    </>
  );
};
