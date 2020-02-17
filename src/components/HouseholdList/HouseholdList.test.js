import React from 'react';
import ReactDOM from 'react-dom';
import HouseholdList from './HouseholdList';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><HouseholdList /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

