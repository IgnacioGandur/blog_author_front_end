import "./posts-preview.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { format } from "date-fns";
import { MoonLoader } from "react-spinners";
import Button from "../button/Button";

export default function PostsPreview({
    title
}) {
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    function tryAgain() {
        setFetchError(null);
    }

    useEffect(() => {
        async function fetchPosts() {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const fetchUrl = "http://localhost:3000/api/posts";
                const response = await fetch(fetchUrl);
                const result = await response.json();

                if (result.success) {
                    setPosts(result.posts);
                } else {
                    setFetchError("Posts couldn't be retrieved.");
                }

            } catch (error) {
                setFetchError("There seems to be an error in the app's backend, please try again later...");
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, [fetchError]);

    if (fetchError) {
        return <div className="posts-preview">
            {title ? (
                <h2>{title}</h2>
            ) : null}
            <div className="error">
                <p className="message">
                    {fetchError}
                </p>
                <Button onClick={tryAgain}>
                    Try again
                </Button>
            </div>
        </div>
    }

    if (isLoading) {
        return <div className="posts-preview">
            <h2>Fetching posts</h2>
            <div className="posts-container">
                <div className="post-loader">
                    <div className="image">
                        <MoonLoader color="#7678ed" />
                    </div>
                    <span className="date">
                    </span>
                    <div className="text">
                        <div className="title">
                        </div>
                        <div className="description">
                        </div>
                    </div>
                    <div className="likes-comments">
                        <div className="likes">
                        </div>
                        <div className="comments">
                        </div>
                    </div>
                    <div className="author">
                        <div className="profile-picture"></div>
                        <div className="name"></div>
                    </div>
                </div>
                <div className="post-loader">
                    <div className="image">
                        <MoonLoader color="#7678ed" />
                    </div>
                    <span className="date">
                    </span>
                    <div className="text">
                        <div className="title">
                        </div>
                        <div className="description">
                        </div>
                    </div>
                    <div className="likes-comments">
                        <div className="likes">
                        </div>
                        <div className="comments">
                        </div>
                    </div>
                    <div className="author">
                        <div className="profile-picture"></div>
                        <div className="name"></div>
                    </div>
                </div>
                <div className="post-loader">
                    <div className="image">
                        <MoonLoader color="#7678ed" />
                    </div>
                    <span className="date">
                    </span>
                    <div className="text">
                        <div className="title">
                        </div>
                        <div className="description">
                        </div>
                    </div>
                    <div className="likes-comments">
                        <div className="likes">
                        </div>
                        <div className="comments">
                        </div>
                    </div>
                    <div className="author">
                        <div className="profile-picture"></div>
                        <div className="name"></div>
                    </div>
                </div>
                <div className="post-loader">
                    <div className="image">
                        <MoonLoader color="#7678ed" />
                    </div>
                    <span className="date">
                    </span>
                    <div className="text">
                        <div className="title">
                        </div>
                        <div className="description">
                        </div>
                    </div>
                    <div className="likes-comments">
                        <div className="likes">
                        </div>
                        <div className="comments">
                        </div>
                    </div>
                    <div className="author">
                        <div className="profile-picture"></div>
                        <div className="name"></div>
                    </div>
                </div>
                <div className="post-loader">
                    <div className="image">
                        <MoonLoader color="#7678ed" />
                    </div>
                    <span className="date">
                    </span>
                    <div className="text">
                        <div className="title">
                        </div>
                        <div className="description">
                        </div>
                    </div>
                    <div className="likes-comments">
                        <div className="likes">
                        </div>
                        <div className="comments">
                        </div>
                    </div>
                    <div className="author">
                        <div className="profile-picture"></div>
                        <div className="name"></div>
                    </div>
                </div>
            </div>

        </div>
    }

    return <div className="posts-preview">
        {title ? (
            <h2>{title}</h2>
        ) : null}
        <div className="posts-container">
            {posts && (
                posts.map((post) => {
                    return <NavLink
                        to={`/posts/${post.id}`}
                        className="post"
                        key={post.id}>
                        <span className="category">
                            {post.categories[0].name}
                        </span>
                        <img
                            className="image"
                            src={post.imageUrl}
                            alt="Post image"
                        />
                        <span className="date">
                            {format(post.createdAt, "MMMM do, yyyy")}
                        </span>
                        <div className="text">
                            <h2 className="title">
                                {post.title}
                            </h2>
                            <p className="short-description">
                                {post.shortDescription}
                            </p>
                        </div>
                        <div className="likes-comments">
                            <div className="likes">
                                <span className="material-symbols-rounded icon">
                                    favorite
                                </span> {post.likes.length} {post.likes.length != 1 ? "Likes" : "Like"}
                            </div>
                            ·
                            <div className="comments">
                                <span className="material-symbols-rounded icon">
                                    comic_bubble
                                </span> {post.comments.length} {post.comments.length != 1 ? "Comments" : "Comment"}
                            </div>
                        </div>
                        <div className="author">
                            <img
                                className="profile-picture"
                                src={post.user.profilePictureUrl}
                                alt="Post author profile picture"
                            />
                            <p className="name">
                                {post.user.firstName} {post.user.lastName}
                            </p>
                        </div>
                    </NavLink>
                })
            )}
        </div>
    </div>
}
