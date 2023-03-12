import { Exam } from 'models';

export const examDummyData: Exam = {
	examId: '1',
	examName: 'Internet of Things (IoT) Exam',
	examDescription:
		'This is an exam for Internet of Things (IoT) for what we have learned in the course during the semester. The exam will be 60 minutes long.',
	examDuration: 60,
	examQuestions: [
		{
			questionId: '1',
			questionText: 'What is the Internet of Things (IoT)?',
			questionType: 'essay',
		},
		{
			questionId: '2',
			questionText: 'What is the difference between IoT and M2M?',
			questionType: 'essay',
		},
		{
			questionId: '3',
			questionText: 'What is context switching?',
			questionType: 'choice',
			questionChoices: [
				{
					choiceId: '1',
					choiceText: 'The process of switching between different tasks.',
				},
				{
					choiceId: '2',
					choiceText: 'The process of switching between different threads.',
				},
				{
					choiceId: '3',
					choiceText: 'The process of switching between different processes.',
				},
			],
		},
	],
};
