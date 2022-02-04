import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getComments } from '../../../store/article/actions';
import { IComment } from '../../../store/article/types';
import { useTypedSelector } from '../../../store/selectors';
import CommentCard from '../CommentCard/CommentCard';
import './CommentList.scss';

interface ICommentListProps {
  slug: string;
}

const CommentList: FC<ICommentListProps> = ({ slug }) => {
  const { comments } = useTypedSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(getComments(slug));
    }
  }, [slug]);

  return (
    <div className="CommentList">
      {comments &&
        comments.map((item: IComment, i: number) => (
          <CommentCard
            key={i}
            text={item.body}
            username={item.author.username}
            date={item.createdAt}
            slug={slug}
            id={item.id}
          />
        ))}
    </div>
  );
};

export default CommentList;
