import React, { FC } from 'react';
import './PopularTag.scss';

interface IPopularTagProps {
  tag: string;
}

const PopularTag: FC<IPopularTagProps> = ({ tag }) => {
  return (
    <>
      <p className="PopularTag">{tag}</p>
    </>
  );
};

export default PopularTag;
