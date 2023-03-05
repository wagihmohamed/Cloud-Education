/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import { OutputData } from '@editorjs/editorjs';
import { CustomButton } from 'components/CustomButton';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './constants';
import { editorDummyData, editorDummyExamData } from './editorDummyData';
import Image from '@editorjs/image';

interface EditorCore {
	destroy(): Promise<void>;

	clear(): Promise<void>;

	save(): Promise<OutputData>;

	render(data: OutputData): Promise<void>;
}

const ReactEditorJS = createReactEditorJS();

export const CustomEditor = () => {
	const editorCore = useRef<EditorCore | null>(null);
	const isExam = true;

	const handleInitialize = useCallback((instance: any) => {
		editorCore.current = instance;
	}, []);

	const handleSave = useCallback(async () => {
		const savedData = await editorCore?.current?.save();
		console.log(savedData);
	}, []);

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
			<CustomButton onClick={handleSave}>Save</CustomButton>
			<ReactEditorJS
				onInitialize={handleInitialize}
				// readOnly={true}
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
				defaultValue={{
					time: 1635603431943,
					blocks: editorDummyData,
				}}
				onReady={habdleToggleExam}
			/>
		</>
	);
};
