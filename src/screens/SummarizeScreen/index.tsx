import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CustomButton, CustomLayout, CustomTextField } from 'components';
import { useSummarizeText } from 'hooks';
import { useAuth } from 'zustandStore';

export const SummarizeScreen = () => {
	const { subDomain } = useAuth();
	const { mutate: summarize, isLoading } = useSummarizeText({
		onSuccess: (data) => {
			setSummarizedText(data);
		},
	});
	const [originalText, setOriginalText] = useState('');
	const [summarizedText, setSummarizedText] = useState('');

	const handleSubmitSummarize = () => {
		if (originalText) {
			setSummarizedText('');
			summarize({
				text: originalText,
				orgnizationId: subDomain,
			});
		}
	};

	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: '1.5rem',
					bgcolor: 'background.default',
				}}
			>
				<Box>
					<Typography fontWeight="bold" variant="h4">
						Summarize Text
					</Typography>
				</Box>
			</Box>
			<Grid
				sx={{
					mt: 4,
					mx: '1.5rem',
					width: 'calc(100% - 3rem)',
					height: '100%',
					display: 'flex',
				}}
				container
				spacing={2}
			>
				<Grid
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
					}}
					item
					xs={12}
				>
					<Typography variant="h5" color="#25a244" textAlign="center" mb={3}>
						{isLoading &&
							'Please hang on while we summarize your text, this may take a few seconds'}
					</Typography>
					<CustomButton
						onClick={handleSubmitSummarize}
						loadingButton
						loading={isLoading}
						px={16}
					>
						Start
					</CustomButton>
				</Grid>
				<Grid item xs={12} md={6}>
					<CustomTextField
						multiline
						rows={30}
						label="Original Text"
						placeholder="Enter your text here..."
						withLabel
						value={originalText}
						onChange={(e) => setOriginalText(e.target.value)}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<CustomTextField
						multiline
						rows={30}
						label="Summarized Text"
						placeholder="Summarized text will appear here..."
						withLabel
						value={summarizedText}
						variant="outlined"
						disabled={!summarizedText}
						fullWidth
					/>
				</Grid>
			</Grid>
		</CustomLayout>
	);
};
