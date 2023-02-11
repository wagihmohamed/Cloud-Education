import { Typography } from "@mui/material";
import Select from "react-select";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  onChange: any;
  withLabel?: boolean;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const CustomSelect = ({
  onChange,
  options,
  withLabel,
  label,
  error,
  helperText,
}: CustomSelectProps) => {
  return (
    <>
      {withLabel && (
        <Typography
          variant="subtitle1"
          mt={1}
          sx={{
            color: "#000",
            alignSelf: "flex-start",
            fontWeight: "bold",
            fontSize: "15px",
            mb: "6px",
          }}
        >
          {label}
        </Typography>
      )}
      <Select
        styles={{
          control: (provided) => ({
            ...provided,
            height: "45px",
            border: "1px solid #c4c4c4",
            "&:hover": {
              border: "1px solid #000000",
            },
            outline: "1px solid #c4c4c4",
            "&:focus": {
              border: "1px solid #000000",
            },
            "&:active": {
              border: "1px solid #000000",
            },
          }),
        }}
        options={options}
        onChange={(e) => {
          onChange(e);
        }}
      />
      {error && <p className="select-error">{helperText}</p>}
    </>
  );
};
