import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style.less';

import Header from '../../../components/header';
import InputModal from '../../../components/input-modal';

const Setting = ({ history }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [InputModalVisible, setInputModalVisible] = useState(false);

  const goBackIcon = <i className="iconfont icon-left"></i>;
  const addItemIcon = <i className="iconfont icon-plus"></i>;

  const handleGoBack = () => {
    history.go(-1);
  };

  const handleOpenAddItemModal = () => {
    setInputModalVisible(true);
  };

  const handleAddItem = async (e, value) => {
    console.log(value);
    const addedItem = await axios.post(`/api/check_item`, {
      name: value
    });
    checkItems.push(addedItem.data);
    setInputModalVisible(false);
  };

  const onCancelAddItem = () => {
    setInputModalVisible(false);
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
              checkItems.map((item) => {
                return (
                  <li key={item.id}>{item.name}</li>
                );
              })
            }
          </ul>
        </div>

      </div>

      <InputModal
        visible={InputModalVisible}
        title="添加打卡项"
        confirmText="输入打卡项名称，添加新的打卡项"
        leftText="取消"
        clickLeft={onCancelAddItem}
        rightText="添加"
        clickRight={handleAddItem}
      />

    </div>
  );
};

Setting.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Setting);
