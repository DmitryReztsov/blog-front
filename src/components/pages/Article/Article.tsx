import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { getGlobalArticles } from '../../../store/article/actions';

import { dateFormat } from '../../../utils/common/common';

import Container from '../../Container/Container';
import DeleteArticleBtn from '../../Buttons/DeleteArticleBtn/DeleteArticleBtn';
import ArticlePageTag from '../../Tags/ArticlePageTag/ArticlePageTag';

import './Article.scss';
import EditArticleBtn from '../../Buttons/EditArticleBtn/EditArticleBtn';
import FolowUserBtn from '../../Buttons/FolowUserBtn/FolowUserBtn';
import FavoriteArticleBtn from '../../Buttons/FavoriteArticleBtn/FavoriteArticleBtn';

const Article: FC = () => {
  const [article, setArticle] = useState<any>(null);
  const { articles } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    // console.log('user', user);
    // console.log('art', article);
  }, [article]);

  // get route params
  const params = useParams();
  const title = params.title;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGlobalArticles());
  }, []);

  useEffect(() => {
    articles.map((el: any) => {
      if (el.title.trim().toLowerCase() === title!.trim().toLowerCase()) {
        setArticle(el);
      }
    });
  }, []);

  return (
    <>
      <div className="Article">
        <div className="Article-top">
          <Container>
            <div className="Article-top__row">
              <h1 className="Article-top__title">{article && article?.title}</h1>
              <div className="Article-top__panel">
                <div className="Article-top__userBlock">
                  <img
                    className="Article-top__icon"
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                  />
                  <div className="Article-top__props">
                    <div className="Article-top__props_userName">
                      {article && article?.author?.username}
                    </div>
                    <div className="Article-top__props_date">
                      {article && dateFormat(article.createdAt)}
                    </div>
                  </div>
                </div>
                {/* { {article && user?.bio === article.author ? (
                  <> */}
                <EditArticleBtn article={article} />
                <DeleteArticleBtn slug={article && article.slug} />
                {/* </>
                ) : (
                  <>
                    <FolowUserBtn username={article.author.username} />
                    <FavoriteArticleBtn />
                  </>
                )} } */}
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="Article-content">
            <div className="Article-content__body">{article && article?.body}</div>
            <div className="Article-content__tag-list">
              {article &&
                article.tagList.map((el: string, i: number) => <ArticlePageTag key={i} tag={el} />)}
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
                    {article && article?.author.username}
                  </div>
                  <div className="Article-content__props_date">
                    {article && dateFormat(article.createdAt)}
                  </div>
                </div>
              </div>
              <EditArticleBtn article={article} />
              <DeleteArticleBtn slug={article && article.slug} />
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
    </>
  );
};

export default Article;
