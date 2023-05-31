/*eslint-disable */
import { OutputData } from '@editorjs/editorjs';
import { CustomButton } from 'components/CustomButton';
import { useCallback, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './constants';
import Image from '@editorjs/image';
import './styles.css';
import { useAuth, useCourses } from 'zustandStore';
import { Stack } from '@mui/material';

interface EditorCore {
	destroy(): Promise<void>;

	clear(): Promise<void>;

	save(): Promise<OutputData>;

	render(data: OutputData): Promise<void>;
}

interface CustomEditorProps {
	id?: number;
}

const ReactEditorJS = createReactEditorJS();

export const CustomEditor = ({ id = 0 }: CustomEditorProps) => {
	const { isTeacher } = useAuth();
	const editorCore = useRef<EditorCore | null>(null);
	const { courses, saveCourse } = useCourses();

	const handleInitialize = useCallback((instance: any) => {
		editorCore.current = instance;
	}, []);

	const handleSave = useCallback(async () => {
		const savedData = await editorCore?.current?.save();
		saveCourse({
			id,
			course: savedData?.blocks || [],
		});
	}, [id]);

	const handleImageUpload = async (file: any) => {
		const formData = new FormData();
		formData.append('file', file);
		const response = await fetch(' https://api.bayfiles.com/upload', {
			method: 'POST',
			body: formData,
		});
		const data = await response.json();
		return {
			success: 1,
			file: {
				url: data.url,
			},
		};
	};

	return (
		<Stack direction={'column'}>
			{isTeacher && (
				<CustomButton
					ml={8}
					mb={3}
					px={7}
					width={'200px'}
					onClick={handleSave}
					sx={{ alignSelf: 'center' }}
				>
					Save Edit
				</CustomButton>
			)}
			<CustomButton ml={8} mb={3} px={7} width={'200px'} onClick={handleSave} sx={{alignSelf:'center'}} >
				Save Edit
			</CustomButton>
			<ReactEditorJS
				autofocus={true}
				onInitialize={handleInitialize}
				placeholder="Show us your creativity..."
				holder="editorjs"
				tools={{
					...EDITOR_JS_TOOLS,
					image: {
						class: Image,
						config: {
							uploader: {
								uploadByFile: handleImageUpload,
							},
						},
					},
				}}
				value={{
					time: 1635603431943,
					blocks: courses[0].course || [],
				}}
				defaultValue={{
					time: 1635603431943,
					blocks: courses[0].course || [],
				}}
				readOnly={!isTeacher}
			/>
			<div id="editorjs" />
		</Stack>
	);
};
