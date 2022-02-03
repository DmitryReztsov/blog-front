import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../store/article/actions';
import { useTypedSelector } from '../../../store/selectors';
import { IUser } from '../../../store/user/types';
import ArticleDate from '../../Articles/ArticleDate/ArticleDate';
import ArticleIcon from '../../Articles/ArticleIcon/ArticleIcon';
import ArticleUsername from '../../Articles/ArticleUsername/ArticleUsername';
import './CommentCard.scss';
interface ICommentCardProps {
  text: string | undefined;
  username: string | undefined;
  date: string | undefined;
  slug: string | undefined;
  id: string | undefined;
}

const CommentCard: FC<ICommentCardProps> = ({ text, username, date, slug, id }) => {
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const removeComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteComment(slug!, id!));
  };

  return (
    <div className="CommentCard">
      <div className="CommentCard-content">{text}</div>
      <div className="CommentCard-panel">
        <div className="CommentCard-panel__block">
          <div className="CommentCard-panel__block_item">
            <ArticleIcon username={username} size={'small'} />
          </div>
          <div className="CommentCard-panel__block_item">
            <ArticleUsername username={username} size={'small'} />
          </div>
          <div className="CommentCard-panel__block_item">
            <ArticleDate date={date} />
          </div>
        </div>

        {user!.username === username && (
          <button className="CommentCard-panel__btn" onClick={removeComment}>
            <i className="ion-trash-a"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
