import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Analytics />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
