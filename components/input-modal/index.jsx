import React, { useRef, useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
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
  const hasShow = useRef(false);
  const [inputValue, setInputValue] = useState('');
  const [innerVisible, setInnerVisible] = useState(false);

  useLayoutEffect(() => {
    setInputValue(intialInputValue);
    setInnerVisible(visible);
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

  const Modal = (
    <div className={cname('input-modal-container', { hidden: !innerVisible })} onClick={(e) => handleDismissModal(e)}>
      <div className="modal-container">
        <span className="title">{title}</span>

        <div className="body">
          { bodyText ? <span>{bodyText}</span> : null }
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>

        <div className="footer">
          { leftOpText ? <button className="left" onClick={handleClickLeftOp}>{leftOpText}</button> : null }
          { rightOpText ? <button className="right" onClick={handleClickRightOp}>{rightOpText}</button> : null }
        </div>

      </div>
    </div>
  );

  let portal = null;
  if (visible || hasShow.current) {
    if (!hasShow.current) {
      hasShow.current = true;
    }
    portal = (
      ReactDOM.createPortal(
        Modal,
        document.body
      )
    );
  } else if (!visible && !hasShow.current) {
    portal = null;
  }

  return portal;
};

InputModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  bodyText: PropTypes.string,
  leftOpText: PropTypes.string,
  rightOpText: PropTypes.string,
  onClickLeftOp: PropTypes.func,
  onClickRightOp: PropTypes.func,
  onDismissModal: PropTypes.func
};

export default InputModal;
