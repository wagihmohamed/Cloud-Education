import { Typography } from '@mui/material';

export const CustomDate = () => {
	const now: Date = new Date();
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const day = days[now.getDay()];
	const month = months[now.getMonth()];

	return (
		<div id="header-date">
			<Typography
				sx={{
					fontSize: '1.4rem',
				}}
			>
				{day}
			</Typography>
			<Typography
				sx={{
					fontSize: '1.4rem',
				}}
			>
				{`${now.getDate()} ${month}`}, {now.getFullYear()}
			</Typography>
		</div>
	);
};
