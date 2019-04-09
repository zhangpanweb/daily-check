import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cname from 'classnames';

import './style.less';

const InputModal = ({ visible = false, title, confirmText, leftText, rightText, clickLeft, clickRight }) => {
  const hasShow = useRef(false);
  const [inputValue, setInputValue] = useState('');

  function OnClickLeft (e) {
    clickLeft(e);
  }

  function OnClickRight (e) {
    clickRight(e, inputValue);
    setInputValue('');
  }

  const Modal = (
    <div className={cname('input-modal-container', { hidden: !visible })}>
      <div className="modal-container">

        <span className="title">{title}</span>

        <div className="body">
          <span>
            {confirmText}
          </span>

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
  clickRight: PropTypes.func
};

export default InputModal;
