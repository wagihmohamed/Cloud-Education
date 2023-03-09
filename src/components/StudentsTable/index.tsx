import { useCallback, useState } from 'react';
import { CustomButton, CustomTableCell, CustomTableRow } from 'components';
import {
	Box,
	FormControlLabel,
	FormGroup,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { studentsTableBodyData, studentsTableHead } from 'mockup';
import { StudnetsAttendanceTableBodyData } from 'models';
import { downloadPdf } from 'utlis';
import { closeImg, tickImg } from 'utlis/base64imgs';
export const StudentsTable = () => {
	const [showDummyData, setShowDummyData] = useState(true);
	const [attendanceData, setAttendanceData] = useState<
		StudnetsAttendanceTableBodyData[]
	>(studentsTableBodyData);

	const checkIfStudentAttended = useCallback(
		(attended: string) => {
			const attendInt = parseInt(attended);
			if (attendInt === 1) {
				return (
					<img
						src={tickImg}
						style={{
							width: '25px',
							height: '25px',
						}}
					/>
				);
			} else if (attendInt === 0) {
				return (
					<img
						src={closeImg}
						style={{
							width: '20px',
							height: '20px',
						}}
					/>
				);
			} else {
				return '';
			}
		},
		[attendanceData, setAttendanceData, studentsTableBodyData, showDummyData]
	);

	const resetAttendance = useCallback(() => {
		setAttendanceData((prev) =>
			prev.map((student) => {
				return {
					...student,
					week1: '',
					week2: '',
					week3: '',
					week4: '',
					bounses: '',
				};
			})
		);
	}, [setAttendanceData, studentsTableBodyData, attendanceData]);

	const handleToggleDummyData = () => {
		if (showDummyData) {
			resetAttendance();
		} else {
			setAttendanceData(studentsTableBodyData);
		}
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<FormGroup>
					<FormControlLabel
						sx={{
							width: 'max-content',
						}}
						control={
							<Switch
								checked={showDummyData}
								onChange={(e) => {
									setShowDummyData(e.target.checked);
									handleToggleDummyData();
								}}
							/>
						}
						label="Show with dummy data"
					/>
				</FormGroup>
				<CustomButton
					px={4}
					onClick={() => {
						downloadPdf(
							'#students-table',
							'Students Attendance',
							'Ahmed Shalaby',
							'Internet of Things',
							showDummyData === true ? true : false
						);
					}}
				>
					Download as PDF
				</CustomButton>
			</Box>
			<Table
				id="students-table"
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
						{studentsTableHead.map((column) => (
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
					{attendanceData.length === 0 ? (
						<TableRow>
							<CustomTableCell colSpan={12}>
								<Typography variant="h4" fontWeight="bold">
									No Assigned Students found, Contact The Technical Team.
								</Typography>
							</CustomTableCell>
						</TableRow>
					) : (
						attendanceData.map((row) => (
							<CustomTableRow hover={false} key={row.number}>
								<CustomTableCell>{row.number}</CustomTableCell>
								<CustomTableCell>{row.name}</CustomTableCell>
								<CustomTableCell>
									{checkIfStudentAttended(row.week1)}
								</CustomTableCell>
								<CustomTableCell>
									{checkIfStudentAttended(row.week2)}
								</CustomTableCell>
								<CustomTableCell>
									{checkIfStudentAttended(row.week3)}
								</CustomTableCell>
								<CustomTableCell>
									{checkIfStudentAttended(row.week4)}
								</CustomTableCell>
								<CustomTableCell>{row.bounses}</CustomTableCell>
							</CustomTableRow>
						))
					)}
				</TableBody>
			</Table>
		</>
	);
};
