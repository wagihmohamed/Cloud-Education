/* eslint-disable */
import { OutputData } from '@editorjs/editorjs';
import { CustomButton } from 'components/CustomButton';
import { useCallback, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './constants';
import Image from '@editorjs/image';
import './styles.css';
import { useAuth } from 'zustandStore';
import { Stack } from '@mui/material';
import { useEditCourseSection, useGetCourseContent } from 'hooks';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uploadImage } from 'services';

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
	const { courseId } = useParams();
	const [iseEditorReady, setIsEditorReady] = useState(false);

	const { mutate: saveConent } = useEditCourseSection({
		onSuccess: () => {
			toast.success('Content Saved Successfully');
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || 'Something went wrong');
		},
		courseCodeDep: courseId || '',
		sectionOrderDep: id || 1,
	});

	const {
		isLoading,
		data: courseContent = {
			status: '',
			data: {
				content: [],
				order: 0,
				title: '',
				ownerEmail: '',
			},
		},
	} = useGetCourseContent({
		courseCode: courseId || '',
		sectionOrder: id || 1,
		isReady: iseEditorReady,
	});
	const { email, isAdmin } = useAuth();
	const editorCore = useRef<EditorCore | null>(null);

	const handleInitialize = useCallback((instance: any) => {
		editorCore.current = instance;
	}, []);

	const handleSave = useCallback(async () => {
		const savedData = await editorCore?.current?.save();
		saveConent({
			content: savedData?.blocks || [],
			courseCode: courseId || '',
			sectionOrder: id || 1,
		});
	}, [id]);

	const handleImageUpload = async (file: any) => {
		const response1 = await uploadImage({
			image: file,
			orgnizationId: localStorage.getItem('organizationId') || '',
			courseCode: courseId || '',
		});
		return {
			success: 1,
			file: {
				url: response1.file.url,
			},
		};
	};

	return (
		<Stack direction={'column'}>
			{(courseContent.data.ownerEmail === email || isAdmin) && (
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
					blocks: courseContent.data.content || [
						{
							type: 'paragraph',
							data: {
								text: 'Show us your creativity...',
								level: 1,
							},
						},
					],
				}}
				onReady={() => setIsEditorReady(true)}
				readOnly={
					email !== courseContent.data.ownerEmail && !isAdmin && !isLoading
				}
			/>
			<div id="editorjs" />
		</Stack>
	);
};
