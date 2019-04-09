import React, { useRef, useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cname from 'classnames';

import './style.less';

const InputModal = ({ visible = false, title, confirmText, intialInputValue = '', leftText, rightText, clickLeft, clickRight, onDismissModal }) => {
  const hasShow = useRef(false);
  const [inputValue, setInputValue] = useState('');
  const [innerVisible, setInnerVisible] = useState(false);

  useLayoutEffect(() => {
    setInputValue(intialInputValue);
    setInnerVisible(visible);
  }, [intialInputValue, visible]);

  function OnClickLeft (e) {
    clickLeft(e);
  }

  function OnClickRight (e) {
    if (!inputValue) return;
    clickRight(e, inputValue);
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
          {
            confirmText ? <span>{confirmText}</span> : null
          }

          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>

        <div className="footer">
          {
            leftText ? <button className="left" onClick={OnClickLeft}>{leftText}</button> : null
          }
          {
            rightText ? <button className="right" onClick={OnClickRight}>{rightText}</button> : null
          }
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
  confirmText: PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  clickLeft: PropTypes.func,
  clickRight: PropTypes.func,
  onDismissModal: PropTypes.func
};

export default InputModal;
