/*eslint-disable */
import { OutputData } from '@editorjs/editorjs';
import { CustomButton } from 'components/CustomButton';
import { useCallback, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './constants';
import Image from '@editorjs/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { saveCourse } from 'redux/Slices/courseSlice';
import './styles.css';

interface EditorCore {
	destroy(): Promise<void>;

	clear(): Promise<void>;

	save(): Promise<OutputData>;

	render(data: OutputData): Promise<void>;
}

interface CustomEditorProps {
	id?: string;
}

const ReactEditorJS = createReactEditorJS();

export const CustomEditor = ({ id }: CustomEditorProps) => {
	const editorCore = useRef<EditorCore | null>(null);
	const { courses } = useSelector((state: RootState) => state.courseReducer);

	const dispatch = useDispatch();
	const isExam = true;

	const handleInitialize = useCallback((instance: any) => {
		editorCore.current = instance;
	}, []);

	const handleSave = useCallback(async () => {
		const savedData = await editorCore?.current?.save();
		dispatch(
			saveCourse({
				id,
				course: savedData?.blocks as any,
			})
		);
	}, [id]);

	const habdleToggleExam = useCallback(() => {
		if (isExam) {
			const editableElements = document.querySelectorAll('h1');
			editableElements.forEach((el) => {
				el.removeAttribute('contenteditable');
				document.createElement('input');
			});
			const iconSettings = document.querySelectorAll(
				'.ce-toolbar__settings-btn'
			);
			iconSettings.forEach((el) => el.remove());
		}
		return;
	}, [isExam]);

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
		<>
			<CustomButton ml={8} mb={3} px={7} onClick={handleSave}>
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
					blocks: courses.find((course) => course.id === id)?.course || [],
				}}
				defaultValue={{
					time: 1635603431943,
					blocks: courses.find((course) => course.id === id)?.course || [],
				}}
				onReady={habdleToggleExam}
			/>
			<div id="editorjs" />
		</>
	);
};
