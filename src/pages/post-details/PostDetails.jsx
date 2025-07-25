import "./post-details.css";
import PostNotFound from "./PostNotFound";
import MDEditor from "@uiw/react-md-editor";
import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  useActionData,
  useLoaderData,
  useRouteLoaderData,
  Form,
} from "react-router";
import { format } from "date-fns";
import ServerError from "../server-error/ServerError";
import { NavLink } from "react-router";

export default function PostDetails() {
  const actionData = useActionData();
  const userData = useRouteLoaderData("root");
  const data = useLoaderData();
  const post = data?.post;
  const [commentToEdit, setCommentToEdit] = useState(null);
  const commentInputRef = useRef();

  function clearCommentInput() {
    commentInputRef.current.value = "";
  }

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
          src={post.imageUrl}
          alt="Post image banner"
        />
        <div className="overlay"></div>
        <div className="content">
          <div className="empty"></div>
          <div className="author-details">
            <img
              className="ppf"
              src={post.user.profilePictureUrl}
              alt="Post author's profile picture"
            />
            <div className="name-username">
              <h2 className="name">
                {post.user.firstName} {post.user.lastName}
              </h2>
              <h4 className="username">
                @{post.user.username}
              </h4>
            </div>
          </div>
          <div className="likes-comments">
            <div className="likes">
              <span className="number">
                {post.likes.length}
              </span>
              <span className="text">
                {post.likes.length === 1 ? "Like" : "Likes"}
              </span>
            </div>
            <div className="comments">
              <span className="number">
                {post.comments.length}
              </span>
              <span
                className="text"
              >
                {post.comments.length === 1 ? "Comment" : "Comments"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="empty">
      </div>
      <div className="post-content">
        <h1 className="post-title">
          {post.title}
        </h1>
        <p className="post-short-description">
          {post.shortDescription}
        </p>
        <MDEditor.Markdown
          className="editor"
          source={post.content}
        >
        </MDEditor.Markdown>
        {userData.success && (
          post.likes?.some((like) => like.userId === userData?.user?.id) ? (
            <Form
              method="post"
              className="remove-like-form"
            >
              <input
                type="hidden"
                name="intent"
                value="removePostLike"
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
          {post.readTime} minutes read
        </p>
        <div className="horizontal-separator"></div>
        <h3>
          Categories
        </h3>
        <div className="categories">
          {post.categories.map((category) => {
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
              type="hidden"
              name="intent"
              value="commentPost"
            />
            <input
              className="input-box"
              name="comment"
              id="comment"
              placeholder="Leave a comment..."
              required={true}
              ref={commentInputRef}
            >
            </input>
            <div className="button-wrapper">
              <button
                className="submit-comment-button"
                type="submit"
                onClick={() => setTimeout(clearCommentInput, 100)}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
        <div className="horizontal-separator"></div>
        {actionData?.fail && (
          <p className="fail-message">
            {actionData.failMessage}
          </p>
        )}
        {actionData?.success && (
          <p className="success-message">
            {actionData.message}
          </p>
        )}
        {!userData?.success && (
          <p className="not-logged">
            You need an account to leave a comment. <NavLink to="/register">Create an account</NavLink> and come back! Or <NavLink to="/login">log in</NavLink> if you already have one.
          </p>
        )}
        <section className="post-comments">
          <h2>Comments <span className="ammount">{data.post.comments.length}</span></h2>
          {post.comments.length === 0 ? (
            <p className="no-comments">
              This post doesn't have any comments. Write the first!
            </p>
          ) : (
            <div className="comments-container">
              {post.comments?.map((comment) => {
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
                    <h3 className="user-full-name">
                      {comment.user.firstName} {comment.user.lastName}
                    </h3>
                    <span className="comment-date">
                      {format(comment.createdAt, "LLLL do, yyyy")}
                    </span>
                    {post.userId == comment.userId && (
                      <p className="is-author">
                        <span
                          className="material-symbols-rounded"
                        >
                          verified
                        </span>
                        Post Author
                      </p>
                    )}
                  </div>
                  {commentToEdit === comment.id ? (
                    <Form
                      className="comment-interaction-form"
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
                          className="comment-interaction-button"
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
                  <>
                    <div className="comment-data">
                      <p
                        title="Likes in this comment"
                        className="comment-likes-counter"
                      >
                        <span className="number">
                          {comment.likes?.length}
                        </span>
                        <span className="horizontal-separator"></span>
                        <span className="icon material-symbols-rounded">
                          celebration
                        </span>
                      </p>
                      {/* TODO: move this outside the above ternary operator. */}
                      {userData?.success && (
                        <div className="buttons">
                          {userData?.success && (
                            comment.likes?.some((like) => like.userId === userData?.user?.id) ? <Form
                              method="post"
                            >
                              <input
                                type="hidden"
                                name="intent"
                                value="removeLikeFromComment"
                              />
                              <input
                                type="hidden"
                                name="commentId"
                                value={comment.id}
                              />
                              <button
                                type="submit"
                                className="comment-interaction-button"
                              >
                                <span className="material-symbols-rounded">
                                  thumb_down
                                </span>
                              </button>
                            </Form> : <Form
                              method="post"
                            >
                              <input
                                type="hidden"
                                name="intent"
                                value="likeComment"
                              />
                              <input
                                type="hidden"
                                name="commentId"
                                value={comment.id}
                              />
                              <button
                                className="comment-interaction-button"
                                type="submit"
                              >
                                <span className="material-symbols-rounded">
                                  thumb_up
                                </span>
                              </button>
                            </Form>
                          )}
                          {comment.userId === userData.user.id && (
                            <>
                              <button
                                className="comment-interaction-button"
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
                                method="post"
                              >
                                <input
                                  type="hidden"
                                  name="intent"
                                  value="deleteComment"
                                />
                                <input
                                  type="hidden"
                                  name="commentId"
                                  value={comment.id}
                                />
                                <button
                                  className="comment-interaction-button"
                                  type="submit"
                                >
                                  <span className="material-symbols-rounded icon">
                                    delete
                                  </span>
                                </button>
                              </Form>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                  {/* )} */}
                </div>
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  }
}
