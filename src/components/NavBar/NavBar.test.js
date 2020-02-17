import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';



it('renders without crashing', () => {
    const ul = document.createElement('ul');
    ReactDOM.render(<BrowserRouter><NavBar /></BrowserRouter>, ul);
    ReactDOM.unmountComponentAtNode(ul);
});

