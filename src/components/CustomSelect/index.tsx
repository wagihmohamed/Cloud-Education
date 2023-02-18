import { Typography } from "@mui/material";
import Select from "react-select";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  onChange: any;
  withLabel?: boolean;
  label?: string;
  error?: boolean;
  helperText?: string;
  value?: { label: string; value: string };
  disabled?: boolean;
}

export const CustomSelect = ({
  onChange,
  options,
  withLabel,
  label,
  error,
  helperText,
  disabled,
  value,
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
        value={value}
        isDisabled={disabled}
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "45px",
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
          valueContainer: (provided) => ({
            ...provided,
            padding: "0 10px",
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: "200px",
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
