import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import InputModal from './input-modal';
import ConfirmModal from './confirm-modal';

const modalMap = new Map([
  ['confirm', ConfirmModal],
  ['input', InputModal]
]);

const Modal = ({ visible, type, ...otherProps }) => {
  const hasShow = useRef(false);

  let portal = null;
  if (visible || hasShow.current) {
    if (!hasShow.current) {
      hasShow.current = true;
    }

    const ModalComp = modalMap.get(type);
    portal = (
      ReactDOM.createPortal(
        <ModalComp visible={visible} {...otherProps}/>,
        document.body
      )
    );
  } else if (!visible && !hasShow.current) {
    portal = null;
  }

  return portal;
};

export default Modal;
