import React, { useState, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style.less';

import Header from '../../../components/header';
import Modal from '../../../components/modal';

const Setting = ({ history }) => {
  const checkItemReducer = (state, action) => {
    switch (action.type) {
      case 'initial': {
        const newState = state.concat(action.items);
        return newState;
      }
      case 'add': {
        const newState = [].concat(state);
        newState.push(action.item);
        return newState;
      }
      case 'edit': {
        const newState = [].concat(state);
        newState[action.payload.index].name = action.payload.name;
        return newState;
      }
      case 'delete': {
        const newState = [].concat(state);
        newState.splice(action.index, 1);
        return newState;
      }
      default:
        return state;
    }
  };

  const [checkItems, dispatchCheckItem] = useReducer(checkItemReducer, []);

  const [addItemModalVisible, setAddItemModalVisible] = useState(false);
  const [editItemModalVisible, setEditItemMdalVisible] = useState(false);
  const [deleteItemModalVisible, setDeleteItemModalVisible] = useState(false);

  const [intialInputValue, setIntialInputValue] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    _getCheckItems();
  }, []);

  const handleGoBack = () => {
    history.go(-1);
  };

  /** 增加打卡项 相关 --- */
  const handleOpenAddItemModal = () => {
    setAddItemModalVisible(true);
  };

  const handleAddItem = async (e, value) => {
    const addedItem = await axios.post(`/api/check_item`, {
      name: value
    });

    dispatchCheckItem({ type: 'add', item: addedItem.data });

    setAddItemModalVisible(false);
  };

  const handleCancelAddItem = () => {
    setAddItemModalVisible(false);
  };
  /** end ------ */

  /** 编辑打卡项 相关 ----- */
  const handleOpenEditItemModal = (index) => {
    setSelectedItemIndex(index);

    const item = checkItems[index];
    setIntialInputValue(item.name);

    setEditItemMdalVisible(true);
  };

  const handleSaveItem = async (e, value) => {
    const item = checkItems[selectedItemIndex];
    await axios.put(`/api/check_item/${item.id}`, {
      name: value
    });

    dispatchCheckItem({ type: 'edit',
      payload: {
        index: selectedItemIndex,
        name: value
      } });

    setEditItemMdalVisible(false);
  };

  const handleCloseEditItem = () => {
    setEditItemMdalVisible(false);
  };
  /** end ---- */

  /** 删除打卡项 相关 ---- */
  const handleOpenDeleteItemMOdal = (index) => {
    setSelectedItemIndex(index);
    setDeleteItemModalVisible(true);
  };

  const handleDeleteItem = async () => {
    const item = checkItems[selectedItemIndex];
    await axios.put(`/api/check_item/${item.id}`, {
      enabled: 0
    });

    dispatchCheckItem({ type: 'delete', index: selectedItemIndex });

    setDeleteItemModalVisible(false);
  };

  const handleCloseDeleteItem = () => {
    setDeleteItemModalVisible(false);
  };
  /** end ----- */

  const _getCheckItems = async () => {
    const res = await axios.get('/api/check_item');
    dispatchCheckItem({ type: 'initial', items: res.data });
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
                <li key={item.id}>
                  {item.name}
                  <span>
                    <i
                      className="iconfont icon-edit-square"
                      onClick={() => { handleOpenEditItemModal(index); }}
                    ></i>
                    <i
                      className="iconfont icon-delete"
                      onClick={() => { handleOpenDeleteItemMOdal(index); }}
                    ></i>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Modal
        visible={addItemModalVisible}
        title="添加打卡项"
        bodyText="输入打卡项名称，添加新的打卡项"
        leftOpText="取消"
        onClickLeftOp={handleCancelAddItem}
        rightOpText="添加"
        onClickRightOp={handleAddItem}
        onDismissModal={handleCancelAddItem}
        type="input"
      />

      <Modal
        visible={editItemModalVisible}
        intialInputValue={intialInputValue}
        title="编辑打卡项"
        leftOpText="取消"
        onClickLeftOp={handleCloseEditItem}
        rightOpText="保存"
        onClickRightOp={handleSaveItem}
        onDismissModal={handleCloseEditItem}
        type="input"
      />

      <Modal
        visible={deleteItemModalVisible}
        title="删除打卡项"
        bodyText="确认需要删除该打卡项吗？"
        leftOpText="取消"
        onClickLeftOp={handleCloseDeleteItem}
        rightOpText="确认"
        onClickRightOp={handleDeleteItem}
        onDismissModal={handleCloseDeleteItem}
        type="confirm"
      />

    </div>
  );
};

Setting.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Setting);
