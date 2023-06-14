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
import { uploadImage, uploadVideo } from 'services';
import VideoTool from '@weekwood/editorjs-video';

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
	const { subDomain } = useAuth();
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
	const { email, isAdmin, isStudent, isTeacher } = useAuth();
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
		const response = await uploadImage({
			image: file,
			orgnizationId: subDomain,
			courseCode: courseId || '',
		});
		return {
			success: 1,
			file: {
				url: response.file.url,
			},
		};
	};

	const handleVideoUpload = async (file: any) => {
		const response = await uploadVideo({
			video: file,
			orgnizationId: subDomain,
			courseCode: courseId || '',
		});
		return {
			success: 1,
			file: {
				url: response.file.url,
			},
		};
	};

	const disableEditor =
		!isAdmin && !(isTeacher && email === courseContent.data.ownerEmail);

	const showSaveButton =
		!isAdmin && isTeacher && email === courseContent.data.ownerEmail;

	return (
		<Stack direction={'column'}>
			{showSaveButton && (
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
					video: {
						class: VideoTool,
						config: {
							uploader: {
								uploadByFile: handleVideoUpload,
							},
							player: {
								controls: true,
								autoplay: false,
							},
						},
					},
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
				readOnly={disableEditor}
			/>
			<div id="editorjs" />
		</Stack>
	);
};
