import React from 'react';
import ReactDOM from 'react-dom';
import AddAction from './AddAction';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddAction /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

