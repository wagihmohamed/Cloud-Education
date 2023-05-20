/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
	landingpageimage1,
	landingpageimage2,
	landingpageimage3,
} from 'assets';
export const landingPageMainSections = [
	{
		heading: "it's better than sliced bread!",
		txt: 'Tell the world how awesome your app is and why they should use it!',
		btn: {
			text: 'Get Started',
			path: '',
		},
		image: landingpageimage1,
		direction: 'row',
	},
	{
		heading: 'Feature 1',
		txt: 'Explanation of why you are going to love it and the benefit!',
		btn: {
			text: 'Learn More',
			path: '',
		},
		image: landingpageimage2,
		direction: 'row-reverse',
	},
	{
		heading: 'Feature 2',
		txt: 'Explanation of why you are going to love it and the benefit!',
		btn: {
			text: 'Learn More',
			path: '',
		},
		image: landingpageimage3,
		direction: 'row',
	},
];
