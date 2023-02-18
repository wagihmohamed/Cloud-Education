import { Modal, Typography, Box, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CustomTextField } from "../CustomTextField";
import { CustomSelect } from "../CustomSelect";
import { CustomButton } from "../CustomButton";

interface EditCourseModalProps {
  open: boolean;
  handleClose: () => void;
}

export const EditCourseModal = ({
  handleClose,
  open,
}: EditCourseModalProps) => {
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
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">
            Edit Course
          </Typography>
          <CloseOutlinedIcon
            onClick={handleClose}
            sx={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              mt: 1,
            }}
          />
        </Stack>
        <Grid
          container
          mt={4}
          alignItems="center"
          columnSpacing="90px"
          rowSpacing="20px"
        >
          <Grid item xs={6}>
            <CustomTextField withLabel label="Course Name" />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              onChange={() => {}}
              options={[{ label: "Category", value: "Category" }]}
              withLabel
              label="Category"
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField multiline rows={5} withLabel label="Description" />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              onChange={() => {}}
              options={[{ label: "Category", value: "Category" }]}
              withLabel
              label="Status"
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField withLabel label="Course Code" />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              onChange={() => {}}
              options={[{ label: "Category", value: "Category" }]}
              withLabel
              label="Prerequisites"
            />
          </Grid>
        </Grid>
        <Stack direction="row" gap={10} justifyContent="space-between" mt={4}>
          <CustomButton fullWidth color="error">
            Submit
          </CustomButton>
          <CustomButton color="warning" fullWidth warning>
            Cancel
          </CustomButton>
        </Stack>
      </Box>
    </Modal>
  );
};
