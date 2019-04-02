import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style.less';

import Header from '../../../components/header';
import ConfirmModal from '../../../components/confirm-modal';
import BottomButton from '../../../components/bottom-button';

const AddCheck = ({ history }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleGoBack = () => {
    history.go(-1);
  };

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleNoJournal = () => {
    _addCheckItem();
    setModalVisible(false);
  };

  const handleOpenJournal = () => {
    _addCheckItem();
    setModalVisible(false);
  };

  const _addCheckItem = async () => {
    try {
      await axios.post(`/api/check_item`, {
        name,
        description,
        journalMust: true
      });
      history.go(-1);
    } catch (e) {

    }
  };

  return (
    <div className="add-check-container">

      <Header title="添加打卡项" leftIcon="<" onClickLeft={handleGoBack}/>
      <input
        className="name"
        placeholder="请输入打卡名称"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="description"
        placeholder="请输入打卡描述"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

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
