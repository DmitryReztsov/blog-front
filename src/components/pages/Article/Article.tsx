import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { getArticle } from '../../../store/article/actions';

import { dateFormat } from '../../../utils/common/common';

import Container from '../../Container/Container';
import DeleteArticleBtn from '../../Buttons/DeleteArticleBtn/DeleteArticleBtn';
import ArticlePageTag from '../../Tags/ArticlePageTag/ArticlePageTag';

import './Article.scss';

const Article: FC = () => {
  const [tagList, setTagList] = useState<string[] | []>([]);
  const [articleData, setArticleData] = useState<any>();

  // get route params
  const params = useParams();
  const title = params.title;

  // get article
  const dispatch = useDispatch();
  dispatch(getArticle(title!));
  const { articles } = useTypedSelector((state) => state.article);

  useEffect(() => {
    if (articles) {
      articles.map((el: any) => {
        if (el.title.trim().toLowerCase() === title!.trim().toLowerCase()) {
          setArticleData(el);
        }
      });
    }
  }, [articles]);

  // set state by getting article
  // useEffect(() => {
  //   if (articleData) {

  //   }
  // }, [articleData]);

  return (
    <>
      {articleData && (
        <div className="Article">
          <div className="Article-top">
            <Container>
              <div className="Article-top__row">
                <h1 className="Article-top__title">{articleData?.title}</h1>
                <div className="Article-top__panel">
                  <div className="Article-top__userBlock">
                    <img
                      className="Article-top__icon"
                      src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                    />
                    <div className="Article-top__props">
                      <div className="Article-top__props_userName">
                        {articleData?.author.username}
                      </div>
                      <div className="Article-top__props_date">
                        {dateFormat(articleData.createdAt)}
                      </div>
                    </div>
                  </div>
                  <button className="Article-top__btn_edit">
                    <i className="ion-edit"></i>&nbsp;Edit Article
                  </button>
                  <DeleteArticleBtn slug={'werqwer-fn59us'} />
                </div>
              </div>
            </Container>
          </div>

          <Container>
            <div className="Article-content">
              <div className="Article-content__body">{articleData?.body}</div>
              <div className="Article-content__tag-list">
                {articleData.tagList.map((el: string, i: number) => (
                  <ArticlePageTag key={i} tag={el} />
                ))}
              </div>
              <hr className="Article-content__line" />
              <div className="Article-content__panel">
                <div className="Article-content__userBlock">
                  <img
                    className="Article-content__icon"
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                  />
                  <div className="Article-content__props">
                    <div className="Article-content__props_userName">
                      {articleData?.author.username}
                    </div>
                    <div className="Article-content__props_date">
                      {dateFormat(articles.createdAt)}
                    </div>
                  </div>
                </div>
                <button className="Article-content__btn_edit">
                  <i className="ion-edit"></i>&nbsp;Edit Article
                </button>
                <DeleteArticleBtn slug={'slug'} />
              </div>
            </div>
          </Container>

          <Container>
            <div className="Article-bottom">
              <form className="Article-bottom__form">
                <textarea
                  className="Article-bottom__form_body"
                  name="body"
                  placeholder="Write a comment..."
                ></textarea>
                <div className="Article-bottom__form_footer">
                  <img
                    className="Article-bottom__form_icon"
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                    alt="smile"
                  />
                  <button className="Article-bottom__form_btn">Post Comment</button>
                </div>
              </form>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Article;
