import { useState } from "react";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import GlobalArticlesTab from "components/GlobalArticlesTab";
import YourFeedArticlesTab from "components/YourFeedArticlesTab";

export default function ArticleList() {
  const [globalFeedActive, setGlobalFeedActive] = useState(true);
  const { authenticated } = useContext(UserContext);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {authenticated && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${!globalFeedActive && "active"}`}
                      onClick={e => setGlobalFeedActive(false)}
                    >
                      Your Feed
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a className={`nav-link ${globalFeedActive && "active"}`} onClick={() => setGlobalFeedActive(true)}>
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            {globalFeedActive ? <GlobalArticlesTab /> : <YourFeedArticlesTab />}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">
                  programming
                </a>
                <a href="" className="tag-pill tag-default">
                  javascript
                </a>
                <a href="" className="tag-pill tag-default">
                  emberjs
                </a>
                <a href="" className="tag-pill tag-default">
                  angularjs
                </a>
                <a href="" className="tag-pill tag-default">
                  react
                </a>
                <a href="" className="tag-pill tag-default">
                  mean
                </a>
                <a href="" className="tag-pill tag-default">
                  node
                </a>
                <a href="" className="tag-pill tag-default">
                  rails
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
