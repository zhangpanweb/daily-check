import React from 'react';
import PropTypes from 'prop-types';
import cname from 'classnames';

import './style.less';

const ConfirmModal = ({
  visible = false,

  title,
  bodyText,
  leftOpText,
  rightOpText,

  onClickLeftOp,
  onClickRightOp,
  onDismissModal
}) => {
  function handleClickLeftOp (e) {
    onClickLeftOp(e);
  }

  function handleClickRightOp (e) {
    onClickRightOp(e);
  }

  const handleDismissModal = (e) => {
    if (e.target.className === 'confirm-modal-container' && onDismissModal) {
      onDismissModal();
    }
  };

  return (
    <div className={cname('confirm-modal-container', { hidden: !visible })} onClick={handleDismissModal}>
      <div className="modal-container">
        <span className="title">{title}</span>

        { bodyText ? <div className="body">{bodyText}</div> : null }

        <div className="footer">
          <button className="left" onClick={handleClickLeftOp}>{leftOpText}</button>
          <button className="right" onClick={handleClickRightOp}>{rightOpText}</button>
        </div>

      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  bodyText: PropTypes.string,
  leftOpText: PropTypes.string,
  rightOpText: PropTypes.string,
  onClickLeftOp: PropTypes.func,
  onClickRightOp: PropTypes.func,
  onDismissModal: PropTypes.func
};

export default ConfirmModal;
