import "./post-details.css";
import PostNotFound from "./PostNotFound";
import { useLoaderData } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import {
  useRouteLoaderData,
  useFetcher,
  Form,
} from "react-router";
import { format } from "date-fns";

export default function PostDetails() {
  const userData = useRouteLoaderData("root");
  const data = useLoaderData();
  const fetcher = useFetcher();

  console.log("user data is:", userData);
  console.log("data is:", data);

  if (!data.success) {
    return <PostNotFound errors={data.errors} />
  }

  if (data.success) {
    return <main className="post-details">
      <div className="banner">
        <img
          className="image"
          src={data.post.imageUrl}
          alt="Post image banner"
        />
        <div className="overlay"></div>
        <div className="content">
          <div className="empty"></div>
          <div className="author-details">
            <img
              className="ppf"
              src={data.post.user.profilePictureUrl}
              alt="Post author's profile picture"
            />
            <div className="name-username">
              <h2 className="name">
                {data.post.user.firstName} {data.post.user.lastName}
              </h2>
              <h4 className="username">
                @{data.post.user.username}
              </h4>
            </div>
          </div>
          <div className="likes-comments">
            <div className="likes">
              <span className="number">
                {data.post.likes.length}
              </span>
              <span className="text">
                {data.post.likes.length === 1 ? "Like" : "Likes"}
              </span>
            </div>
            <div className="comments">
              <span className="number">
                {data.post.comments.length}
              </span>
              <span
                className="text"
              >
                {data.post.comments.length === 1 ? "Comment" : "Comments"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="empty">
      </div>
      <div className="post-content">
        <h1 className="post-title">
          {data.post.title}
        </h1>
        <MDEditor.Markdown
          className="editor"
          source={data.post.content}
        >
        </MDEditor.Markdown>
        <div className="post-end-message">
          <div className="line"></div>
          <p>
            Thank you for reading!
          </p>
        </div>
      </div>
      <aside className="sidebar">
        <h3>
          Categories
        </h3>
        <div className="categories">
          {data.post.categories.map((category) => {
            return <span
              className="category"
              key={category.name}
            >
              {category.name}
            </span>
          })}
        </div>
      </aside>
      <section className="comments">
        {userData.success && (
          <Form
            method="post"
            className="leave-comment"
          >
            <textarea
              className="input-box"
              name="comment"
              id="comment"
              placeholder="Leave a comment..."
              required={true}
            >
            </textarea>
            <div className="button-wrapper">
              <button
                className="submit-comment-button"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
        <div className="horizontal-separator"></div>
        <section className="post-comments">
          <h2>Comments <span className="ammount">{data.post.comments.length}</span></h2>
          {data.post.comments.length === 0 ? (
            <p className="no-comments">
              This post doesn't have any comments. Write the first!
            </p>
          ) : (
            <div className="comments-container">
              {data.post.comments.map((comment) => {
                return <div
                  key={comment.id}
                  className="comment"
                >
                  <div className="comment-author">
                    <img
                      className="comment-ppf"
                      src={comment.user.profilePictureUrl}
                      alt="Comment author profile picture"
                    />
                    <h3>
                      {comment.user.firstName} {comment.user.lastName}
                    </h3>
                    ·
                    <span className="comment-date">
                      {format(comment.createdAt, "LLLL do, yyyy")}
                    </span>
                    {data.post.userId == userData.user.id && (
                      <p>
                        post author
                      </p>
                    )}
                  </div>
                  <p className="comment-content">
                    {comment.content}
                  </p>
                </div>
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  }
}
