import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const queryClient = new QueryClient();
export const router = createBrowserRouter([{ path: '*', element: <App /> }]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<CssBaseline />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</ThemeProvider>
);
