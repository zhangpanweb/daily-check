import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

const Journal = ({ name, content }) => {
  return (
    <div className="journal-container">
      <span className="name">{name}</span>
      <div className="content">{content}</div>
    </div>
  );
};
Journal.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string
};

export default Journal;
