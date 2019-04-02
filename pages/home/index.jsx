import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import './style.less';

import Header from '../../components/header';
import Habit from './habit';
import ConfirmModal from '../../components/confirm-modal';
import NavTab from '../../components/nav-tab';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [todayCheckItems, setTodayCheckItems] = useState([]);
  const clickedItem = useRef(null);

  useEffect(() => {
    _getTodayCheckItems();
  }, []);

  const handleClick = (index) => {
    const habit = todayCheckItems[index];
    if (habit && habit.isCompleted) return;
    clickedItem.current = index;
    setShowModal(true);
  };

  const handleModalLeft = (e) => {
    setShowModal(false);
  };

  const handleModalRight = async (e) => {
    const index = clickedItem.current;
    await axios.post('/api/check_record', {
      checkItemId: todayCheckItems[index].id
    });
    todayCheckItems[index].isCompleted = true;
    setShowModal(false);
  };

  const _getTodayCheckItems = async () => {
    const res = await axios.get('/api/check_record/today');
    console.log('todayCheck', res);
    setTodayCheckItems(res.data);
  };

  return (
    <div className="home-container">

      <Header title="Home" />

      <div className="content-wrapper">
        {todayCheckItems.map((habit, index) => (
          <div className="habit-item" key={habit.id} onClick={() => { handleClick(index); }}>
            <Habit habit={habit} />
          </div>
        ))}
      </div>

      <NavTab/>

      <ConfirmModal
        visible={showModal}
        title="打卡确认"
        confirmText="是否确认打开"
        leftText="取消"
        rightText="确认"
        clickLeft={handleModalLeft}
        clickRight={handleModalRight}
      />
    </div>
  );
};

export default Home;
