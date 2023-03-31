export const setAppColor = (
	withPrimaryColor: string | null,
	withTextColor: string | null
) => {
	if (withPrimaryColor) {
		localStorage.setItem('primaryColor', withPrimaryColor);
	} else if (withTextColor) {
		localStorage.setItem('textColor', withTextColor);
	} else {
		localStorage.setItem('textColor', '#000000');
		localStorage.setItem('primaryColor', '#000000');
	}
};
