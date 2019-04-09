import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cname from 'classnames';

import './style.less';

const ConfirmModal = ({ visible = false, title, confirmText, leftText, rightText, clickLeft, clickRight, onDismissModal }) => {
  const hasShow = useRef(false);

  function OnClickLeft (e) {
    clickLeft(e);
  }

  function OnClickRight (e) {
    clickRight(e);
  }

  const handleDismissModal = (e) => {
    if (e.target.className === 'confirm-modal-container' && onDismissModal) {
      onDismissModal();
    }
  };

  const Modal = (
    <div className={cname('confirm-modal-container', { hidden: !visible })} onClick={handleDismissModal}>
      <div className="modal-container">
        <span className="title">{title}</span>

        {
          confirmText ? <div className="body">{confirmText}</div> : null
        }

        <div className="footer">
          <button className="left" onClick={OnClickLeft}>{leftText}</button>
          <button className="right" onClick={OnClickRight}>{rightText}</button>
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

ConfirmModal.propTypes = {
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

export default ConfirmModal;
