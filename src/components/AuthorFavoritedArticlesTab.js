import { useEffect, useState } from "react";
import ArticleTeaser from "components/ArticleTeaser";

const AuthorFavoritedArticlesTab = ({ author }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/articles?author=${author}&favorited=${author}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setArticles(result.articles);
    };

    fetchData();
  }, []);

  return (
    <>
      {articles.map(article => {
        return (
          <ArticleTeaser
            key={article.slug}
            slug={article.slug}
            author={article.author.username}
            title={article.title}
            description={article.description}
            createdAt={article.createdAt}
            favoritesCount={article.favoritesCount}
          />
        );
      })}
    </>
  );
};

export default AuthorFavoritedArticlesTab;
