import { formatDate } from "helpers/formatDate";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

interface ArticleTeaserProps {
  slug: string;
  author: string;
  title: string;
  description: string;
  createdAt: string;
  favoritesCount: number;
}

export default function ArticleTeaser({
  slug,
  author,
  title,
  description,
  createdAt,
  favoritesCount,
}: ArticleTeaserProps) {
  const { authenticated, token } = useContext(UserContext);
  const history = useHistory();
  async function handleFavoriteClick() {
    if (!authenticated) {
      history.push("login");
    } else {
      const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
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
    <div className="article-preview" key={slug}>
      <div className="article-meta">
        <a href={`/#/profile/${author}`}>
          <img src="http://i.imgur.com/Qr71crq.jpg" />
        </a>
        <div className="info">
          <a href={`/#/profile/${author}`} className="author">
            {author}
          </a>
          <span className="date">{formatDate(createdAt)}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={handleFavoriteClick}>
          <i className="ion-heart" /> {favoritesCount}
        </button>
      </div>
      <a href={`/#/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
}
