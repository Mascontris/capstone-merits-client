import React from 'react';
import ReactDOM from 'react-dom';
import ActionList from './ActionList';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ActionList /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

