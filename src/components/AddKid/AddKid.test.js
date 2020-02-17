import React from 'react';
import ReactDOM from 'react-dom';
import AddKid from './AddKid';
import { BrowserRouter } from 'react-router-dom';

describe(`AddKid component`, () => {
    const props = {
        location: [{ "originHousehold": "1" }]
    }

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddKid {...props}/></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
})
