import styled from '@emotion/styled';
import { TableCell, TableRow } from '@mui/material';

interface CustomTableCellProps {
  color?: string;
  textAlign?: string;
  border?: string;
  backgroundColor?: string;
  fontSize?: string;
  height?: string;
  colSpan?: number;
  hover?: boolean;
}

interface CustomTableRowProps {
  hover?: boolean;
  cursor?: string;
}

export const CustomTableCell = styled(TableCell)<CustomTableCellProps>(
  ({ backgroundColor, theme, color, hover }) => ({
    backgroundColor: backgroundColor || '#fff',
    color: color || '#000',
    textAlign: 'center',
    border: '4px solid #000000',
    fontSize: '20px',
    height: '10px !important',
    ...theme,
  })
);

export const CustomTableRow = styled(TableRow)<CustomTableRowProps>(
  ({ hover, theme, cursor }) => ({
    backgroundColor: 'red',
    '&:hover': {
      boxShadow:
        'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
    },
    cursor: cursor || 'pointer',
    '.MuiTableRow-hover': {
      backgroundColor: 'red !important',
    },
  })
);
