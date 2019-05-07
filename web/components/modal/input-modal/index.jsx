import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import cname from 'classnames';

import './style.less';

const InputModal = ({
  visible = false,
  title,

  bodyText,
  intialInputValue = '',
  leftOpText,
  rightOpText,

  onClickLeftOp,
  onClickRightOp,
  onDismissModal
}) => {
  const [inputValue, setInputValue] = useState('');

  useLayoutEffect(() => {
    setInputValue(intialInputValue);
  }, [intialInputValue, visible]);

  function handleClickLeftOp (e) {
    onClickLeftOp(e);
  }

  function handleClickRightOp (e) {
    if (!inputValue) return;
    onClickRightOp(e, inputValue);
    setInputValue('');
  }

  const handleDismissModal = (e) => {
    if (e.target.className === 'input-modal-container' && onDismissModal) {
      onDismissModal();
    }
  };

  return (
    <div className={cname('input-modal-container', { hidden: !visible })} onClick={(e) => handleDismissModal(e)}>
      <div className="modal-container">
        <span className="title">{title}</span>

        <div className="body">
          {bodyText ? <span>{bodyText}</span> : null}
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>

        <div className="footer">
          {leftOpText ? <button className="left" onClick={handleClickLeftOp}>{leftOpText}</button> : null}
          {rightOpText ? <button className="right" onClick={handleClickRightOp}>{rightOpText}</button> : null}
        </div>

      </div>
    </div>
  );
};

InputModal.propTypes = {
  visible: PropTypes.bool.isRequired,

  title: PropTypes.string.isRequired,
  intialInputValue: PropTypes.string,
  bodyText: PropTypes.string,

  leftOpText: PropTypes.string,
  rightOpText: PropTypes.string,

  onClickLeftOp: PropTypes.func,
  onClickRightOp: PropTypes.func,
  onDismissModal: PropTypes.func
};

export default InputModal;
