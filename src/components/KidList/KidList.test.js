import React from 'react';
import ReactDOM from 'react-dom';
import KidList from './KidList';
import { BrowserRouter } from 'react-router-dom';

//props.match.params.id

describe(`KidList component`, () => {
    const props = {
        match: { params: [{"id": "1"}] }
    }

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><KidList {...props}/></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
});
