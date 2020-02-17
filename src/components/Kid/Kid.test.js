import React from 'react';
import ReactDOM from 'react-dom';
import Kid from './Kid';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Kid /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

