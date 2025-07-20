import "./home.css";

// Packages
import { useState, useEffect } from "react";
import { useRouteLoaderData, NavLink } from "react-router";

// Components
import ServerErrorMessage from "../../components/server-error-message/ServerErrorMessage";

// Assets
import argentina from "../../assets/argentina.svg";
import postsCounterBg from "../../assets/images/posts-counter-bg.jpg";
import toolsUsedBg from "../../assets/images/tools-used-bg.jpg";
import githubPlush from "../../assets/images/github-plush.jpg";
import PostsPreview from "../../components/posts-preview/PostsPreview.jsx";

export default function Home() {
  const data = useRouteLoaderData("root");
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [availablePosts, setAvailablePosts] = useState(null);
  const [fetchingPostsError, setFetchingPostsError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const postsUrl = `${import.meta.env.VITE_API_BASE}/posts`;
        const fetchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        };

        const response = await fetch(postsUrl, fetchOptions);
        const result = await response.json();

        console.log("the content of result when fetching all published posts is:", result);

        if (result.success) {
          setPosts(result.posts.slice(0, 4));
          setAvailablePosts(result.posts.length);
        }

      } catch (error) {
        setFetchingPostsError("Something went wrong when trying ")
      } finally {
        setIsLoadingPosts(false);
      }
    }

    fetchPosts();
  }, []);

  return <main className="home">
    {data?.serverError && (
      <ServerErrorMessage errorMessage={data.serverError} />
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
        isLoading={isLoadingPosts}
        posts={posts}
        fetchError={fetchingPostsError}
        showPublishedStatus={false}
        linkPath="/posts"
        showPostsAuthor={true}
        amountOfPostsToLoad={5}
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
          <span>{availablePosts || "-"}</span>
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
