import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style.less';

import Header from '../../../components/header';
import InputModal from '../../../components/input-modal';

const Setting = ({ history }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);
  const [editItemMdalVisible, seteditItemMdalVisible] = useState(false);

  const [intialInputValue, setIntialInputValue] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    _getCheckItems();
  }, []);

  const handleGoBack = () => {
    history.go(-1);
  };

  const handleOpenAddItemModal = () => {
    setAddItemModalVisible(true);
  };

  const handleAddItem = async (e, value) => {
    const addedItem = await axios.post(`/api/check_item`, {
      name: value
    });
    checkItems.push(addedItem.data);
    setAddItemModalVisible(false);
  };

  const handleCancelAddItem = () => {
    setAddItemModalVisible(false);
  };

  const handleOpenEditItemModal = (index) => {
    setSelectedItemIndex(index);

    const item = checkItems[index];
    setIntialInputValue(item.name);

    seteditItemMdalVisible(true);
  };

  const handleDeleteItem = async () => {
    const item = checkItems[selectedItemIndex];
    await axios.put(`/api/check_item/${item.id}`, {
      enabled: 0
    });

    checkItems.splice(selectedItemIndex, 1);
    seteditItemMdalVisible(false);
  };

  const handleSaveItem = async (e, value) => {
    const item = checkItems[selectedItemIndex];
    await axios.put(`/api/check_item/${item.id}`, {
      name: value
    });

    checkItems[selectedItemIndex].name = value;
    seteditItemMdalVisible(false);
  };

  const handleCloseEditItem = () => {
    seteditItemMdalVisible(false);
  };

  const _getCheckItems = async () => {
    const res = await axios.get('/api/check_item');
    setCheckItems(res.data);
  };

  const goBackIcon = <i className="iconfont icon-left"></i>;
  const addItemIcon = <i className="iconfont icon-plus"></i>;
  return (
    <div className="setting-container">

      <Header
        title="设置"
        leftIcon={goBackIcon}
        onClickLeftOp={handleGoBack}
        rightIcon={addItemIcon}
        onClickRightOp={handleOpenAddItemModal}
      />

      <div className="content-wrapper">
        <div className="check-item-list">
          <ul>
            {checkItems.map((item, index) => {
              return (
                <li key={item.id} onClick={() => { handleOpenEditItemModal(index); }}>{item.name}</li>
              );
            })}
          </ul>
        </div>
      </div>

      <InputModal
        visible={addItemModalVisible}
        title="添加打卡项"
        bodyText="输入打卡项名称，添加新的打卡项"
        leftOpText="取消"
        onClickLeftOp={handleCancelAddItem}
        rightOpText="添加"
        onClickRightOp={handleAddItem}
        onDismissModal={handleCancelAddItem}
      />

      <InputModal
        visible={editItemMdalVisible}
        intialInputValue={intialInputValue}
        title="编辑打卡项"
        leftOpText="删除"
        onClickLeftOp={handleDeleteItem}
        rightOpText="保存"
        onClickRightOp={handleSaveItem}
        onDismissModal={handleCloseEditItem}
      />

    </div>
  );
};

Setting.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Setting);
