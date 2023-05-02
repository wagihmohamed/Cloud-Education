import { ExamListItem } from 'models';

export const mockExams: ExamListItem[] = [
	{
		id: '1',
		title: 'Mathematics',
		class: 'CS 1',
		startDate: new Date(),
		endDate: new Date('2023-05-31'),
		imageUrl: 'https://source.unsplash.com/random/400x300',
	},
	{
		id: '2',
		title: 'Computer Architecture',
		class: 'CS 2',
		grade: 'B+',
		startDate: new Date('2023-06-01'),
		endDate: new Date('2023-06-30'),
		imageUrl: 'https://source.unsplash.com/random/400x300',
	},
	{
		id: '3',
		title: 'Computer Graphics',
		class: 'CS 3',
		grade: 'A-',
		startDate: new Date('2023-07-01'),
		endDate: new Date('2023-07-31'),
		imageUrl: 'https://source.unsplash.com/random/400x300',
	},
	{
		id: '4',
		title: 'IOT',
		class: 'CS 4',
		grade: 'A-',
		startDate: new Date(),
		endDate: new Date('2023-07-31'),
		imageUrl: 'https://source.unsplash.com/random/400x300',
	},
];
