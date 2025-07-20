import "./posts-loader.css";
import { CircleLoader } from "react-spinners";

export default function PostsLoader({ postsNumber }) {
    return (
        <section className="posts-preview">
            {Array.from({ length: postsNumber }).map((_, index) => {
                return <li
                    key={index}
                    className="post-loader"
                >
                    <div className="image">
                        <CircleLoader
                            color="#7678ed"
                            size="50px"
                        />
                    </div>
                    <div className="date-and-read-time">
                        <div className="date"></div>
                        <div className="read-time"></div>
                    </div>
                    <div className="title"></div>
                    <div className="description"></div>
                </li>
            })}
        </section>
    )
}
