import React, { FC } from 'react';
import './FollowUserBtn.scss';

interface IFollowUserBtnProps {
  username: string | undefined;
}

const FollowUserBtn: FC<IFollowUserBtnProps> = ({ username }) => {
  return (
    <div className="FollowUserBtn">
      <i className="ion-plus-round"></i>
      {` Follow ${username}`}
    </div>
  );
};

export default FollowUserBtn;
