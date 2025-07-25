import "./posts.css";
import { useState } from "react";
import PostsPreview from "../../components/posts-preview/PostsPreview";
import CustomInput from "../../components/custom-input/CustomInput";
import Button from "../../components/button/Button";
import {
  Form,
  useLoaderData,
  useNavigate
} from "react-router";

export default function Posts() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const posts = data?.posts?.posts;
  const categories = data?.categories?.categories;

  const currentSearch = new URLSearchParams(window.location.search);
  const selectedCategories = currentSearch.getAll("categories");
  const searchTerm = currentSearch.get("searchTerm") || "";
  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
    setShowSidebar((prevState) => !prevState);
  }

  return <main className="posts">
    {showSidebar && (
      <aside className="filter-sidebar">
        <Button
          type="button"
          onClick={toggleSidebar}
        >
          Hide filters
        </Button>
        <Form
          className="search-term-form"
          method="get"
          action="/posts"
        >
          <fieldset>
            <legend>
              Search Posts
            </legend>
            <CustomInput
              googleIcon="search"
              labelText="Post Title"
              inputType="text"
              roundBorders={false}
              inputName="searchTerm"
              inputPlaceholder="Post title here..."
              required={true}
              defaultValue={searchTerm}
              onChange={null}
            />
          </fieldset>
          <Button
            type="submit"
          >
            Search
          </Button>
        </Form>
        <div className="filter-by-categories">
          {data?.serverError ? (
            <fieldset className="fetch-error">
              <legend>
                Error while fetching
              </legend>
              <p className="error-message">
                We were not able to fetch the categories.
              </p>
            </fieldset>
          ) : categories && categories?.length > 0 ? (
            <Form
              method="get"
              action="/posts"
            >
              <fieldset>
                <legend>Filter posts by categories</legend>
                <div className="categories">
                  <div className="container">
                    {categories.map((category) => {
                      return <label
                        key={category.id}
                        htmlFor={category.name}
                        className="category"
                      >
                        {category.name}
                        <input
                          type="checkbox"
                          name="categories"
                          value={category.name}
                          id={category.name}
                        />
                      </label>
                    })}
                  </div>
                  <Button
                    type="submit"
                  >
                    Filter
                  </Button>
                </div>
              </fieldset>
            </Form>
          ) : (
            <fieldset>
              <legend>No Categories</legend>
              <p className="no-categories">
                There are no categories.
              </p>
            </fieldset>
          )}
          <Button
            type="button"
            onClick={() => navigate("/posts")}
          >
            Clear Filters
          </Button>
        </div>
      </aside>
    )}
    <div className="wrapper">
      <header className="header">
        <h1>
          Published Posts
        </h1>
        {searchTerm !== "" && (
          <p className="filter-message">
            Currently filtering posts by the term: "{searchTerm}".
          </p>
        )}
        {selectedCategories && selectedCategories?.length > 0 ? (
          <div className="filter-message">
            <p>
              Currently filtering posts by the categories:
            </p>
            <div className="categories">
              {selectedCategories.map((c) => <span className="category">{c}</span>)}
            </div>
          </div>
        ) : null}
        {showSidebar && (
          <div className="empty"></div>
        )}
        {!showSidebar && (
          <Button
            type="button"
            onClick={toggleSidebar}
          >
            Show filters
          </Button>
        )}
      </header>
      <div
        className={`posts-container ${posts?.length > 0 ? "not-empty" : "empty"}`}
      >
        <PostsPreview
          fetchError={data?.serverError}
          posts={posts}
          linkPath="/posts"
          showPublishedStatus={false}
          showPostsAuthor={true}
          forEditing={false}
        />
      </div>
    </div>
  </main>
}
