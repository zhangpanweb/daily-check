import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './style.less';

import Header from '../../../components/header';

const Setting = ({ history }) => {
  const [checkItems, setCheckItems] = useState([]);

  const goBackIcon = <i className="iconfont icon-left"></i>;
  const addItemIcon = <i className="iconfont icon-plus"></i>;

  const goBack = () => {
    history.go(-1);
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
        onClickLeft={goBack}
        rightIcon={addItemIcon}
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

    </div>
  );
};

Setting.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Setting);
