import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "helpers/formatDate";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export default function Article() {
  const [article, setArticle] = useState<any>({});
  const location = useLocation();
  const history = useHistory();
  const { authenticated, token } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/articles${location.pathname}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setArticle(result.article);
    };

    fetchData();
  }, []);

  async function handleFavoriteClick() {
    if (!authenticated) {
      history.push("login");
    } else {
      const response = await fetch(`http://localhost:3000/api/articles/${article.slug}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Token: ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
    }
  }

  async function handleFollowAuthor() {
    if (!authenticated) {
      history.push("login");
    } else {
      const response = await fetch(`http://localhost:3000/api/profiles/${article.author.username}/follow`, {
        method: "POST",
        headers: {
          Authorization: `Token: ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
    }
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <a href={`/#/profile/${article?.author?.username}`}>
              <img src={article?.author?.image} />
            </a>
            <div className="info">
              <a href={`/#/profile/${article?.author?.username}`} className="author">
                {article?.author?.username}
              </a>
              <span className="date">{article.createdAt && formatDate(article.createdAt)}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleFollowAuthor}>
              {/* TODO: I couldng find where to find author likes in api */}
              <i className="ion-plus-round" />
              &nbsp; Follow {article?.author?.username}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary" onClick={handleFavoriteClick}>
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
            {/* # TODO:
              what is this h2 tag for */}
            {/* <h2 id="introducing-ionic">Introducing RealWorld.</h2> */}
            <p>{article.body}</p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href={`/#/profile/${article?.author?.username}`}>
              <img src={article?.author?.image} />
            </a>
            <div className="info">
              <a href={`/#/profile/${article?.author?.username}`} className="author">
                {article?.author?.username}
              </a>
              <span className="date">{article.createdAt && formatDate(article.createdAt)}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleFollowAuthor}>
              <i className="ion-plus-round" />
              &nbsp; Follow {article?.author?.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary" onClick={handleFavoriteClick}>
              <i className="ion-heart" />
              &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
