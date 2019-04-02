import React, { useState, useRef } from 'react';

import './style.less';

import Header from '../../components/header';
import Habit from './habit';
import ConfirmModal from '../../components/confirm-modal';
import NavTab from '../../components/nav-tab';

const todayHabitData = {
  data: [{
    id: 1,
    name: 'get-up',
    description: 'get up early',
    isCompleted: false
  }, {
    id: 2,
    name: 'go-to-bed',
    description: 'go to bed early',
    isCompleted: true
  }]
};

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const clickedItem = useRef(null);

  const handleClick = (index) => {
    const habit = todayHabitData.data[index];
    if (habit && habit.isCompleted) return;
    clickedItem.current = index;
    setShowModal(true);
  };

  const handleModalLeft = (e) => {
    setShowModal(false);
  };

  const handleModalRight = (e) => {
    const index = clickedItem.current;
    todayHabitData.data[index].isCompleted = true;
    setShowModal(false);
  };

  return (
    <div className="home-container">

      <Header title="Home" />

      <div className="content-wrapper">
        {todayHabitData.data.map((habit, index) => (
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
