import { useState } from 'react';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { CloseOutlined, SaveAsOutlined } from '@mui/icons-material';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { CustomButton } from 'components/CustomButton';
import { useSettings } from 'zustandStore';

interface SettingsModalProps {
	open: boolean;
	handleClose: () => void;
}

export const SettingsModal = ({ handleClose, open }: SettingsModalProps) => {
	const {
		setPrimaryColor,
		textColor: storageTextColor,
		primaryColor,
	} = useSettings();
	const [color, setColor] = useState(primaryColor);
	const [textColor, setTextColor] = useState(storageTextColor);

	const handleSaveSettings = () => {
		setPrimaryColor(color, textColor);
		handleClose();
		window.location.reload();
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
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '800px',
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: '10px',
					border: '3px solid #000',
					overflow: 'hidden',
				}}
			>
				<Stack
					sx={{
						borderBottom: '1px solid #000',
					}}
					direction="row"
					justifyContent="space-between"
				>
					<Typography variant="h4" fontWeight="bold">
						Settings
					</Typography>
					<CloseOutlined
						sx={{
							width: '30px',
							height: '30px',
							cursor: 'pointer',
							mt: 1,
						}}
						onClick={handleClose}
					/>
				</Stack>
				<Box
					sx={{
						mt: 2,
						mb: 2,
						display: 'flex',
						justifyContent: 'space-between',
						pb: 2,
						borderBottom: '1px solid #000',
					}}
				>
					<Box>
						<Typography
							sx={{
								mb: 1,
								fontSize: '22px',
							}}
						>
							Your primary color
						</Typography>
						<HexColorInput
							style={{
								width: '100px',
								height: '30px',
								border: '1px solid #000',
								borderRadius: '5px',
								padding: '5px',
								fontSize: '16px',
							}}
							color={color}
							onChange={setColor}
						/>
					</Box>
					<HexColorPicker color={color} onChange={setColor} />
				</Box>
				<Box
					sx={{
						mt: 2,
						mb: 2,
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Box>
						<Typography
							sx={{
								mb: 1,
								fontSize: '22px',
							}}
						>
							Your Text color
						</Typography>
						<HexColorInput
							style={{
								width: '100px',
								height: '30px',
								border: '1px solid #000',
								borderRadius: '5px',
								padding: '5px',
								fontSize: '16px',
							}}
							color={textColor}
							onChange={setTextColor}
						/>
					</Box>
					<HexColorPicker color={textColor} onChange={setTextColor} />
				</Box>
				<CustomButton
					onClick={handleSaveSettings}
					mt={4}
					fullWidth
					startIcon={<SaveAsOutlined />}
				>
					Save
				</CustomButton>
			</Box>
		</Modal>
	);
};
