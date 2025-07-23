import "./posts-preview.css";
import { NavLink } from "react-router";
import { format } from "date-fns";

export default function PostsPreview({
    fetchError,
    posts,
    linkPath,
    showPublishedStatus,
    showPostsAuthor,
    forEditing = false
}) {
    return fetchError ? (
        <p className="fetch-error">
            {fetchError}
        </p>
    ) : posts?.length > 0 ? (
        <section className="posts-preview">
            {posts.map((post) => {
                return <NavLink
                    to={forEditing ? `${linkPath}/${post.id}/edit` : `${linkPath}/${post.id}`}
                    key={post.id}
                    className="post-preview"
                >
                    <span className="main-category">
                        {post.categories[0].name}
                    </span>
                    <img
                        className="image"
                        src={post.imageUrl}
                        alt="Post image"
                    />
                    <div className="date-read-time">
                        <span className="date">
                            {format(post.createdAt, "MMMM do, yyyy")}
                        </span>
                        ·
                        <span className="read-time">
                            {post.readTime} Mins read
                        </span>
                    </div>
                    <h2 className="title">
                        {post.title.length > 50 ? post.title + "..." : post.title}
                    </h2>
                    <p className="description">
                        {post.shortDescription.length > 100 ? post.shortDescription + "..." : post.shortDescription}
                    </p>
                    <div className="likes-comments">
                        <div className="likes">
                            <span className="material-symbols-rounded icon">
                                favorite
                            </span>
                            <span className="text">
                                {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
                            </span>
                        </div>
                        ·
                        <div className="comments">
                            <span className="material-symbols-rounded icon">
                                comic_bubble
                            </span>
                            <span className="text">
                                {post.comments.length} {post.comments.length === 1 ? "Comment" : "Comments"}
                            </span>
                        </div>
                    </div>
                    {showPublishedStatus && (
                        <div className={`published-status ${post.isPublished ? "published" : "not-published"}`}>
                            <span className="material-symbols-rounded icon">
                                {post.isPublished ? "check_circle" : "cancel"}
                            </span>
                            <div className="vertical-separator"></div>
                            <span className="text">
                                {post.isPublished ? "Published" : "Not Published"}
                            </span>
                        </div>
                    )}
                    {showPostsAuthor && (
                        <div className="author">
                            <img
                                src={post.user.profilePictureUrl}
                                alt="Post author profile picture"
                                className="ppf"
                            />
                            <div className="vertical-separator"></div>
                            <div className="name">
                                <span className="material-symbols-rounded icon">
                                    verified
                                </span>
                                <h3>{post.user.firstName} {post.user.lastName}</h3>
                            </div>
                        </div>
                    )}
                </NavLink>
            })}
        </section>
    ) : (
        <p className="no-posts">
            No posts yet...
        </p>
    )
}

