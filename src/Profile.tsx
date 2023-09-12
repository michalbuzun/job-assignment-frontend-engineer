import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthorArticlesTab from "components/AuthorArticlesTab";
import AuthorFavoritedArticlesTab from "components/AuthorFavoritedArticlesTab";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [myArticlesActive, setMyArticlesActive] = useState(true);
  const location = useLocation();
  const { authenticated, token } = useContext(UserContext);
  const history = useHistory();

  const slug = location.pathname.split("/")[2];

  async function handleFollowAuthor() {
    if (!authenticated) {
      history.push("/login");
    } else {
      const response = await fetch(`http://localhost:3000/api/profiles/${slug}/follow`, {
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/profiles/${slug}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setProfile(result.profile);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleFollowAuthor}>
                  <i className="ion-plus-round" />
                  &nbsp; Follow {profile.username}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className={`nav-link ${myArticlesActive && "active"}`} onClick={() => setMyArticlesActive(true)}>
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${!myArticlesActive && "active"}`}
                      onClick={() => setMyArticlesActive(false)}
                    >
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>
              {myArticlesActive ? <AuthorArticlesTab author={slug} /> : <AuthorFavoritedArticlesTab author={slug} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
