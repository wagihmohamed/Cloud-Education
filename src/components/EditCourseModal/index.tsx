import { Modal, Typography, Box, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CustomTextField } from "../CustomTextField";
import { CustomSelect } from "../CustomSelect";
import { CustomButton } from "../CustomButton";
import {
  allCourses,
  coursesBodyData,
  coursesCategoryOptions,
  courseStatus,
} from "../../mockup";
import { useFormik } from "formik";
import * as yup from "yup";

interface EditCourseModalProps {
  open: boolean;
  handleClose: () => void;
  editedCourse: typeof coursesBodyData[0];
  handleSave: React.Dispatch<React.SetStateAction<typeof coursesBodyData>>;
}

export const EditCourseModal = ({
  handleClose,
  open,
  editedCourse,
  handleSave,
}: EditCourseModalProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      courseName: editedCourse?.courseName || "",
      category: {
        value: editedCourse?.category || "",
        label: editedCourse?.category || "",
      },
      description: editedCourse?.description || "",
      courseStatus: {
        value: editedCourse?.status || "",
        label: editedCourse?.status || "",
      },
      courseCode: editedCourse?.courseCode || "",
      prerequisites: {
        value:
          allCourses.find(
            (course) => course.value === editedCourse?.prerequisites
          )?.value || "",
        label:
          allCourses.find(
            (course) => course.value === editedCourse?.prerequisites
          )?.label || "",
      },
    },
    validationSchema: yup.object({}),
    onSubmit: (values) => {
      handleSave((prev) => {
        const newCourses = prev.map((course) => {
          if (course.courseCode === editedCourse.courseCode) {
            return {
              ...course,
              courseName: values.courseName,
              category: values.category.label,
              description: values.description,
              status: values.courseStatus.label,
              courseCode: values.courseCode,
              prerequisites: values.prerequisites.value || "",
            };
          }
          return course;
        });
        return newCourses;
      });
      handleClose();
    },
  });

  const handleCloseModal = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          border: "3px solid #000",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">
            Edit Course
          </Typography>
          <CloseOutlinedIcon
            onClick={handleCloseModal}
            sx={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              mt: 1,
            }}
          />
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            mt={4}
            alignItems="center"
            columnSpacing="60px"
            rowSpacing="20px"
          >
            <Grid item xs={6}>
              <CustomTextField
                value={formik.values.courseName}
                id="courseName"
                name="courseName"
                onChange={formik.handleChange}
                withLabel
                label="Course Name"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                onChange={(e: { label: string; value: string }) => {
                  formik.setFieldValue("category", e);
                }}
                value={formik.values.category}
                options={coursesCategoryOptions}
                withLabel
                label="Category"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                value={formik.values.description}
                id="description"
                name="description"
                onChange={formik.handleChange}
                multiline
                rows={5}
                withLabel
                label="Description"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                onChange={(e: { label: string; value: string }) => {
                  formik.setFieldValue("courseStatus", e);
                }}
                value={formik.values.courseStatus}
                options={courseStatus}
                withLabel
                label="Status"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                value={formik.values.courseCode}
                id="courseCode"
                name="courseCode"
                onChange={formik.handleChange}
                withLabel
                label="Course Code"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSelect
                onChange={(e: { label: string; value: string }) => {
                  formik.setFieldValue("prerequisites", e);
                }}
                value={formik.values.prerequisites}
                disabled={formik.values.prerequisites.value === ""}
                options={allCourses}
                withLabel
                label="Prerequisites"
              />
            </Grid>
          </Grid>
          <Stack direction="row" gap={10} justifyContent="space-between" mt={4}>
            <CustomButton type="submit" fullWidth color="error">
              Submit
            </CustomButton>
            <CustomButton
              onClick={handleCloseModal}
              type="button"
              color="warning"
              fullWidth
              warning
            >
              Cancel
            </CustomButton>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
