import "./footer.css";

export default function Footer() {
    return <footer className="footer">
        <div className="wrapper">
            <div className="goodbye-message">
                <div className="icon-name">
                    <span className="material-symbols-rounded icon">
                        computer
                    </span>
                    <span className="name">
                        Ignacio's Blog
                    </span>
                </div>
                <div className="message">
                    Thanks for stopping by! Hope you found something interesting—see you again soon!
                </div>
                <span className="year">2025</span>
            </div>
            <div></div>
            <div className="github-links">
                <h3>Github</h3>
                <a
                    href="https://github.com/IgnacioGandur"
                    target="_blank"
                >
                    Personal profile
                </a>
                <a
                    href="https://github.com/IgnacioGandur/blog_api"
                    target="_blank"
                >
                    Back end API
                </a>
                <a
                    href="https://github.com/IgnacioGandur/blog_author_front_end"
                    target="_blank"
                >
                    Front end
                </a>
            </div>
        </div>
    </footer>
}
