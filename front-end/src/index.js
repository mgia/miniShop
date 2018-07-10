import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

import './index.css';
// import registerServiceWorker from './registerServiceWorker';

render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root'));
