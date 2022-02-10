import React, { FC } from 'react';
import './FollowUserBtn.scss';

interface IFollowUserBtnProps {
  username: string | undefined;
  click: () => void;
  following: boolean | undefined;
}

const FollowUserBtn: FC<IFollowUserBtnProps> = ({ username, click, following }) => {
  return (
    <div className="FollowUserBtn" onClick={click}>
      <i className="ion-plus-round"></i>
      {following ? `Unfollow ${username}` : `Follow ${username}`}
    </div>
  );
};

export default FollowUserBtn;
