import ReactDOM from 'react-dom';
import React from 'react';

import json from './data/info.json';
import './styles/main.css';
import './styles/blocks.scss';
import Post from './models/Post';
import './babel-test';

const Logo = require('./assets/logo.png');
const xml = require('./data/file.xml');
const csv = require('./data/airtravel.csv');

console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);

const App: React.FC = () => {
  const firstPost = new Post('First one', Logo);

  return (
    <div className="container">
      <h2 className="title">Webpack 5!</h2>
      <hr/>
      <div className="logo"></div>
      {firstPost && <pre className="code">{firstPost!.toString()}</pre>}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root'),
);

