import "./profile.css";
import {
  useRouteLoaderData,
  useSearchParams,
  NavLink,
} from "react-router";
import { format } from "date-fns";
import profileBanner from "../../../src/assets/images/profile-banner.jpg";
import PostsPreview from "../../components/posts-preview/PostsPreview.jsx"

export default function Profile() {
  const data = useRouteLoaderData("root");
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");

  return <section className="profile">
    <article className="user-info">
      <div className="banner">
        <img
          src={profileBanner}
          alt="Banner image"
          className="banner-image"
        />
        <div className="ppf-and-info">
          <div className="ppf-and-name">
            <div className="ppf-wrapper">
              <img
                src={data.user.profilePictureUrl}
                alt="Profile picture"
                className="ppf"
              />
            </div>
            <h2 className="name">
              {data.user.firstName} {data.user.lastName}
            </h2>
            {data.user?.isAuthor && (
              <p className="author">
                <span className="material-symbols-rounded icon">
                  verified
                </span>
                Author
              </p>
            )}
          </div>
          <p className="username">
            <span className="data">
              @<i>{data.user.username}</i>
            </span>
            <span className="text">
              Username
            </span>
          </p>
          <p className="user-posts-length">
            <span className="data">
              {data.user.posts.length}
            </span>
            <span className="text">
              Your posts
            </span>
          </p>
          <p className="liked-posts">
            <span className="data">
              {data.user.likedPosts.length}
            </span>
            <span className="text">
              Liked posts
            </span>
          </p>
          <p className="comments-length">
            <span className="data">
              {data.user.comments.length}
            </span>
            <span className="text">
              Commented posts
            </span>
          </p>
          <p className="joined-date">
            <span className="data">
              {format(data.user.joinedOn, "MMMM do, yyyy")}
            </span>
            <span className="text">
              Joined on
            </span>
          </p>
        </div>
        <div className="empty-div"></div>
      </div>
    </article>
    {message && (
      <div className="message">
        {message}
      </div>
    )}
    <article className="user-posts">
      <h2>Your Posts</h2>
      {data.user?.posts.length === 0 && (
        <p className="no-posts-message">
          You don't have any posts.
        </p>
      )}
      {data.user?.posts && (
        <PostsPreview
          fetchError={null}
          isLoading={false}
          showPublishedStatus={true}
          posts={data.user.posts}
          linkPath={`/dashboard/my-posts`}
          showPostsAuthor={false}
          amountOfPostsToLoad={5}
          forEditing={true}
        />
      )}
    </article>
  </section>
}
