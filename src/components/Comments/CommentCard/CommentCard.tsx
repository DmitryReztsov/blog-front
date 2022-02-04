import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, setButtonFetchMode } from '../../../store/article/actions';
import { BUTTON_FETCH_MODE } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
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
  const { buttonFetchMode } = useTypedSelector((state) => state.article);
  const dispatch = useDispatch();

  const removeComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setButtonFetchMode(BUTTON_FETCH_MODE.FETCHING));
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

        {user && user!.username === username && (
          <button
            className="CommentCard-panel__btn"
            onClick={removeComment}
            disabled={buttonFetchMode === BUTTON_FETCH_MODE.FETCHING ? true : false}
          >
            <i className="ion-trash-a"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
