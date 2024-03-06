import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreateBookForm } from './pages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error('Something went wrong');
		},
	}),
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<CreateBookForm />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</QueryClientProvider>
	);
}

export default App;
