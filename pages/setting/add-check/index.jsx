import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.less';

import Header from '../../../components/header';
import ConfirmModal from '../../../components/confirm-modal';
import BottomButton from '../../../components/bottom-button';

const AddCheck = ({ history }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleGoBack = () => {
    history.go(-1);
  };

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleNoJournal = () => {
    setModalVisible(false);
  };

  const handleOpenJournal = () => {
    setModalVisible(false);
  };

  return (
    <div className="add-check-container">

      <Header title="添加打卡项" leftIcon="<" onClickLeft={handleGoBack}/>
      <input className="name" placeholder="请输入打卡名称"/>
      <textarea className="description" placeholder="请输入打卡描述"/>
      <BottomButton
        text="确定"
        onClick={handleAdd}
      />

      <ConfirmModal
        visible={modalVisible}
        title="打卡日志设置"
        confirmText="设置了打日志之后，每天都要填写打卡日志才能打卡成功哦"
        leftText="不开启"
        rightText="开启"
        clickLeft={handleNoJournal}
        clickRight={handleOpenJournal}
      />
    </div>
  );
};

AddCheck.propTypes = {
  history: PropTypes.object
};

export default withRouter(AddCheck);
