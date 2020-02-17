import React from 'react';
import ReactDOM from 'react-dom';
import AddHousehold from './AddHousehold';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddHousehold /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

