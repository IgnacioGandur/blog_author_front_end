import "./post-details.css";
import PostNotFound from "./PostNotFound";
import MDEditor from "@uiw/react-md-editor";
import {
  useState,
  useEffect
} from "react";
import {
  useActionData,
  useLoaderData,
  useRouteLoaderData,
  Form,
} from "react-router";
import { format } from "date-fns";
import ServerError from "../server-error/ServerError";

export default function PostDetails() {
  const actionData = useActionData();
  const userData = useRouteLoaderData("root");
  const data = useLoaderData();
  const [commentToEdit, setCommentToEdit] = useState(null);

  useEffect(() => {
    setCommentToEdit(null);
  }, [data])

  if (data?.serverError) {
    return <ServerError
      message="There seems to be a problem with the app's backend, we were not able to fetch the post."
      navigateTo="/"
    />
  }

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
        {userData.success && (
          data.post.likes?.some((like) => Object.values(like).includes(userData.user.id)) ? (
            <Form
              method="post"
              className="remove-like-form"
            >
              <input
                type="hidden"
                name="intent"
                value="remove-post-like"
              />
              <button className="remove-like-button">
                <span className="material-symbols-rounded icon">
                  heart_broken
                </span>
              </button>
              <span className="text">Remove like</span>
            </Form>
          ) : (
            <Form
              className="like-post-form"
              method="post"
            >
              <input
                type="hidden"
                name="intent"
                value="like-post"
              />
              <button
                className="like-post-button"
                type="submit"
              >
                <span className="material-symbols-rounded icon">
                  favorite
                </span>
              </button>
              <span className="text">
                Like
              </span>
            </Form>
          )
        )}
        <div className="post-end-message">
          <div className="line"></div>
          <p>
            Thank you for reading!
          </p>
        </div>
      </div>
      <aside className="sidebar">
        <p className="read-time">
          Approximate {data.post.readTime} minutes read
        </p>
        <div className="horizontal-separator"></div>
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
            <input
              className="input-box"
              name="comment"
              id="comment"
              placeholder="Leave a comment..."
              required={true}
            >
            </input>
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
        {actionData?.serverError ? (
          <p className="comment-created fail">
            {actionData.serverError}
          </p>
        ) : actionData?.message === "Comment created successfully!" ? (
          <p className="comment-created success">
            Comment created successfully!
          </p>
        ) : null}
        {actionData?.message === "Your comment was deleted successfully!" && (
          <p className="comment-deleted-message">
            Comment deleted!
          </p>
        )}
        {actionData?.commentUpdated && (
          <p className="comment-updated-message">
            Your comment was successfully updated!
          </p>
        )}
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
                    {data.post.userId == comment.userId && (
                      <p className="is-author">
                        <span
                          className="material-symbols-rounded"
                        >
                          verified
                        </span>
                        Post Author
                      </p>
                    )}
                    {comment.userId === userData.user.id && (
                      <div className="buttons">
                        <button
                          className="edit-comment-button"
                          onClick={() => {
                            // If comment to edit is already this comment id, null, else, set it to this.
                            setCommentToEdit((prev) => prev === comment.id ? null : comment.id);
                          }}
                        >
                          <span className="material-symbols-rounded">
                            edit
                          </span>
                        </button>
                        <Form
                          className="delete-comment-form"
                          method="post"
                        >
                          <input
                            type="hidden"
                            name="deleteComment"
                            value={comment.id}
                          />
                          <button
                            className="delete-comment-button"
                            type="submit"
                          >
                            <span className="material-symbols-rounded icon">
                              delete
                            </span>
                          </button>
                        </Form>
                      </div>
                    )}
                  </div>
                  {commentToEdit === comment.id ? (
                    <Form
                      className="edit-comment-form"
                      method="post"
                    >
                      <label
                        className="label"
                        htmlFor="update-comment"
                      >
                        Update Comment
                      </label>
                      <div className="input-button">
                        <input
                          id="update-comment"
                          type="text"
                          name="updatedComment"
                          defaultValue={comment.content}
                          required={true}
                        />
                        <input
                          name="commentId"
                          value={comment.id}
                          type="hidden"
                        />
                        <button
                          title="Edit your comment"
                          type="submit"
                        >
                          <span className="material-symbols-rounded">
                            edit_note
                          </span>
                        </button>
                      </div>
                    </Form>
                  ) : (
                    <p className="comment-content">
                      {comment.content}
                    </p>
                  )}
                </div>
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  }
}
