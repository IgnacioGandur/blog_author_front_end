import "./home.css";

import {
  useLoaderData,
  useRouteLoaderData,
  NavLink,
  useSearchParams,
} from "react-router";

// Assets
import argentina from "../../assets/argentina.svg";
import postsCounterBg from "../../assets/images/posts-counter-bg.jpg";
import toolsUsedBg from "../../assets/images/tools-used-bg.jpg";
import githubPlush from "../../assets/images/github-plush.jpg";
import PostsPreview from "../../components/posts-preview/PostsPreview.jsx";

export default function Home() {
  const data = useRouteLoaderData("root");
  const postsData = useLoaderData();
  const [searchParams, setSetParams] = useSearchParams();
  const message = searchParams.get("message");


  return <main className="home">
    {data?.serverError && (
      <p className="message server-not-working">
        {data.serverError}
      </p>
    )}
    {message && (
      <p className="message">
        {message}
      </p>
    )}
    <div className="welcome-hero">
      <div className="bg">
        <span className="text">
          Hello<span className="blinking">
            _
          </span>
        </span>
      </div>
      <div className="welcome-content">
        <div className="wrapper">
          <div className="welcome-message">
            <h2 className="welcome">Welcome to my personal blog!</h2>
            <p className="sub-title">Where I write about my web development journey.</p>
          </div>
          <div className="owner">
            <img
              className="argentina-flag"
              src={argentina}
              alt="Argentina flag"
            />
            <div className="text">
              <h2 className="name">Ignacio Gandur</h2>
              <p className="sub-title">Full stack web developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="recent-posts">
      <h2>
        Recent posts
      </h2>
      <PostsPreview
        fetchError={postsData?.serverError}
        posts={postsData?.posts}
        linkPath="/posts"
        showPublishedStatus={false}
        showPostsAuthor={true}
        forEditing={false}
      />
    </div>
    <div className="grid">
      <div className="tools-used">
        <img
          className="image"
          src={toolsUsedBg}
          alt="Tools used background image"
        />
        <div className="wrapper">
          <span className="material-symbols-rounded icon">
            anchor
          </span>
          <p className="title">
            How this website was built
          </p>
          <p className="description">
            A list of the tools used for the development of this website.
          </p>
          <NavLink
            className="button"
            to="/about"
          >
            <span>
              About Page
            </span>
            <span className="material-symbols-rounded">
              east
            </span>
          </NavLink>
        </div>
      </div>
      <div className="posts-counter">
        <img
          src={postsCounterBg}
          alt="Posts counter background image"
        />
        <div className="overlay">
          <p>Posts available</p>
          <span>{postsData?.posts?.length || "-"}</span>
          <span className="material-symbols-rounded icon">
            newspaper
          </span>
        </div>
      </div>
      <div className="random">
        <img
          className="image"
          src={githubPlush}
          alt="Github plush image"
        />
        <div className="overlay">
          <p className="content">
            I write about the things I'm learning — mostly web development, coding, and side projects.
          </p>
          <span className="material-symbols-rounded icon">
            code
          </span>
        </div>
      </div>
    </div>
  </main>
}
