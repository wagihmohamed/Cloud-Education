import { useState } from 'react';
import styled from '@emotion/styled';
import { coursesTableColumns } from 'mockup';
import { Stack } from '@mui/system';
import {
  DoDisturbOnOutlined,
  HighlightOffOutlined,
  SettingsOutlined,
  PeopleAltOutlined,
} from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from '@mui/material';
import { EditCourseModal } from '../EditCourseModal';
import { CoursesBody } from 'models';

interface CoursesTableProps {
  coursesData: CoursesBody[];
  setCoursesData: React.Dispatch<React.SetStateAction<CoursesBody[]>>;
  setSelectedCourse: React.Dispatch<React.SetStateAction<CoursesBody>>;
  selectedCourse: CoursesBody;
}

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  ...theme,
  color: '#000',
  textAlign: 'center',
  border: '4px solid #000000',
  backgroundColor: '#fff',
  fontSize: '20px',
  height: '10px !important',
}));

export const CoursesTable = ({
  coursesData,
  selectedCourse,
  setSelectedCourse,
  setCoursesData,
}: CoursesTableProps) => {
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);

  const handleDeleteCourse = (id: string) => {
    setCoursesData((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <>
      <Table
        sx={{
          mt: 4,
          width: '100%',
          overflowY: 'auto',
          borderSpacing: '0 15px !important',
          borderCollapse: 'separate',
        }}
      >
        <TableHead
          sx={{
            backgroundColor: 'primary.main',
          }}
        >
          <TableRow>
            {coursesTableColumns.map((column) => (
              <TableCell
                sx={{
                  color: 'white',
                  textAlign: 'center',
                  border: '4px solid white',
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
          {coursesData.length === 0 ? (
            <TableRow>
              <CustomTableCell colSpan={12}>
                <Typography variant="h4" fontWeight="bold">
                  No courses found
                </Typography>
              </CustomTableCell>
            </TableRow>
          ) : (
            coursesData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                }}
              >
                <CustomTableCell>{row.courseName}</CustomTableCell>
                <CustomTableCell>{row.category}</CustomTableCell>
                <CustomTableCell>{row.lastUpdated}</CustomTableCell>
                <CustomTableCell width="200px">
                  <Stack direction="row" justifyContent="space-around">
                    <SettingsOutlined
                      sx={{
                        height: '30px',
                        width: '30px',
                      }}
                      onClick={() => {
                        setIsEditCourseOpen(true);
                        setSelectedCourse(row);
                      }}
                      cursor="pointer"
                      color="primary"
                    />
                    <HighlightOffOutlined
                      sx={{
                        height: '30px',
                        width: '30px',
                      }}
                      cursor="pointer"
                      color="primary"
                    />
                    <DoDisturbOnOutlined
                      sx={{
                        height: '30px',
                        width: '30px',
                      }}
                      cursor="pointer"
                      color="primary"
                      onClick={() => handleDeleteCourse(row.id)}
                    />
                    <PeopleAltOutlined
                      sx={{
                        height: '30px',
                        width: '30px',
                      }}
                      cursor="pointer"
                      color="primary"
                    />
                  </Stack>
                </CustomTableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {coursesData.length > 0 && (
        <Pagination
          page={1}
          count={10}
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      )}
      <EditCourseModal
        handleSave={setCoursesData}
        editedCourse={selectedCourse}
        handleClose={() => {
          setIsEditCourseOpen(false);
        }}
        open={isEditCourseOpen}
      />
    </>
  );
};
