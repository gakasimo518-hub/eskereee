import React from 'react';
import PropTypes from 'prop-types';
import './Hello.css';

const Hello = ({ name = 'World' }) => {
  return (
    <section className="hello-container">
      <h1 className="hello-title">Hello, {name}!</h1>
      <p className="hello-subtitle">Welcome to the Eskereee project.</p>
    </section>
  );
};

Hello.propTypes = {
  name: PropTypes.string,
};

export default Hello;