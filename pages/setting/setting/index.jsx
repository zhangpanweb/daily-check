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

  const goBackIcon = <i className="iconfont icon-left"></i>;
  const addItemIcon = <i className="iconfont icon-plus"></i>;

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

  const onCancelAddItem = () => {
    setAddItemModalVisible(false);
  };

  const handleOpenEditItemModal = (index) => {
    setSelectedItemIndex(index);

    const item = checkItems[index];
    setIntialInputValue(item.name);

    seteditItemMdalVisible(true);
  };

  const onDeleteItem = async () => {
    const item = checkItems[selectedItemIndex];
    await axios.put(`/api/check_item/${item.id}`, {
      enabled: 0
    });
    checkItems.splice(selectedItemIndex, 1);
    seteditItemMdalVisible(false);
  };

  const onSaveItem = async (e, value) => {
    const item = checkItems[selectedItemIndex];
    await axios.put(`/api/check_item/${item.id}`, {
      name: value
    });
    checkItems[selectedItemIndex].name = value;
    seteditItemMdalVisible(false);
  };

  const onCloseEditItem = () => {
    seteditItemMdalVisible(false);
  };

  useEffect(() => {
    _getCheckItems();
  }, []);

  const _getCheckItems = async () => {
    const res = await axios.get('/api/check_item/1');
    setCheckItems(res.data);
  };

  return (
    <div className="setting-container">

      <Header
        title="设置"
        leftIcon={goBackIcon}
        onClickLeft={handleGoBack}
        rightIcon={addItemIcon}
        onClickRight={handleOpenAddItemModal}
      />

      <div className="content-wrapper">

        <div className="check-item-list">
          <ul>
            {
              checkItems.map((item, index) => {
                return (
                  <li key={item.id} onClick={() => { handleOpenEditItemModal(index); }}>{item.name}</li>
                );
              })
            }
          </ul>
        </div>

      </div>

      <InputModal
        visible={addItemModalVisible}
        title="添加打卡项"
        confirmText="输入打卡项名称，添加新的打卡项"
        leftText="取消"
        clickLeft={onCancelAddItem}
        rightText="添加"
        clickRight={handleAddItem}
        onDismissModal={onCancelAddItem}
      />

      <InputModal
        visible={editItemMdalVisible}
        intialInputValue={intialInputValue}
        title="编辑打卡项"
        leftText="删除"
        clickLeft={onDeleteItem}
        rightText="保存"
        clickRight={onSaveItem}
        onDismissModal={onCloseEditItem}
      />

    </div>
  );
};

Setting.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Setting);
