import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import './style.less';

import Header from '../../components/header';
import CheckItem from './check-item';
import ConfirmModal from '../../components/confirm-modal';
import NavTab from '../../components/nav-tab';

const Home = () => {
  const clickedItem = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [todayCheckItems, setTodayCheckItems] = useState([]);

  useEffect(() => {
    _getTodayCheckItems();
  }, []);

  const handleClickItem = (index) => {
    const checkItem = todayCheckItems[index];

    if (checkItem && checkItem.isCompleted) {
      return;
    }

    clickedItem.current = index;
    setModalVisible(true);
  };

  const handleDoCheck = async (e) => {
    const index = clickedItem.current;

    await axios.post('/api/check_record', {
      checkItemId: todayCheckItems[index].id
    });

    todayCheckItems[index].isCompleted = true;
    setModalVisible(false);
  };

  const handleCancelCheck = () => {
    setModalVisible(false);
  };

  const _getTodayCheckItems = async () => {
    const res = await axios.get('/api/check_record/today');
    setTodayCheckItems(res.data);
  };

  return (
    <div className="home-container">

      <Header title="打卡" />

      <div className="content-wrapper">
        {todayCheckItems.map((checkItem, index) => (
          <div className="habit-item"
            key={checkItem.id}
            onClick={() => { handleClickItem(index); }}
          >
            <CheckItem checkItem={checkItem} />
          </div>
        ))}
      </div>

      <NavTab />

      <ConfirmModal
        visible={modalVisible}
        title="打卡确认"
        bodyText="确认已经完成了打卡项吗？完成了就打卡吧"
        leftOpText="取消"
        rightOpText="确认"
        onClickLeftOp={handleCancelCheck}
        onClickRightOp={handleDoCheck}
        onDismissModal={handleCancelCheck}
      />

    </div>
  );
};

export default Home;
