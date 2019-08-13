import React from 'react';
import logo from './logo.svg';
import './ChartBuilder.css';

function ChartBuilder() {
  return (
    <div className="ChartBuilder">
      <header className="ChartBuilder-header">
        <img src={logo} className="ChartBuilder-logo" alt="logo" />
        <p>
          Edit <code>src/ChartBuilder.js</code> and save to reload.
        </p>
        <a
          className="ChartBuilder-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default ChartBuilder;
