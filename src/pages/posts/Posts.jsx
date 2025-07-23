import "./posts.css";
import PostsPreview from "../../components/posts-preview/PostsPreview";
import { useState, useEffect } from "react";
import CustomInput from "../../components/custom-input/CustomInput";
import Button from "../../components/button/Button";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigate
} from "react-router";
// import PostsLoader from "../../components/posts-preview/PostsLoaderss";
import ServerError from "../server-error/ServerError";

export default function Posts() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const data = useLoaderData();

  const currentSearch = new URLSearchParams(window.location.search);
  const selectedCategories = currentSearch.getAll("categories");
  const searchTerm = currentSearch.get("searchTerm") || "";

  const [categories, setCategories] = useState(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [fetchCategoriesError, setFetchCategoriesError] = useState(null);

  const [showSidebar, setShowSidebar] = useState(false);
  function toggleSidebar() {
    setShowSidebar((prevState) => !prevState);
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        const categoriesUrl = `${import.meta.env.VITE_API_BASE}/categories`;
        const response = await fetch(categoriesUrl);
        const result = await response.json();
        if (result.success) {
          setCategories(result.categories);
        }
      } catch (error) {
        setFetchCategoriesError("Something went wrong when trying to fetch categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  if (data.serverError) {
    return <ServerError
      message={data.serverError}
      navigateTo="/"
    />
  }

  return <main className="posts">
    {showSidebar && (
      <aside className="filter-sidebar">
        <Button
          type="button"
          onClick={toggleSidebar}
        >
          Hide sidebar
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
              labelText="Search Post"
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
          {fetchCategoriesError ? (
            <fieldset className="fetch-error">
              <legend>
                Error while fetching
              </legend>
              <p className="error-message">
                {fetchCategoriesError}
              </p>
            </fieldset>
          ) : isLoadingCategories ? (
            <p className="loading-categories">
              Loading categories.
            </p>
          ) : categories && categories.length > 0 ? (
            <>
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
              <Button
                type="button"
                onClick={() => navigate("/posts")}
              >
                Clear Filters
              </Button>
            </>
          ) : (
            <p className="no-categories">
              There are no categories.
            </p>
          )}
        </div>
      </aside>
    )}
    <div className="wrapper">
      <header className="header">
        <h1>
          {fetcher.state === "loading" ? "Fetching Posts" : "Published Posts"}
        </h1>
        {searchTerm !== "" && (
          <p className="filter-message">
            Currently filtering posts by the term: "{searchTerm}".
          </p>
        )}
        {selectedCategories && selectedCategories.length > 0 ? (
          <div className="filter-message">
            <p>
              Currently filtering posts by the categories:
            </p>
            <div className="categories">
              {selectedCategories.map((c) => <span className="category">{c}</span>)}
            </div>
          </div>
        ) : null}
        {!showSidebar && (
          <Button
            type="button"
            onClick={toggleSidebar}
          >
            Show filters
          </Button>
        )}
      </header>
      {fetcher.state === "loading" ? (
        <PostsLoader
          postsNumber={10}
        />
      ) : data.posts.length > 0 ? (
        <div className="posts-container">
          <PostsPreview
            fetchError={null}
            posts={data.posts}
            isLoading={false}
            linkPath="/posts"
            showPublishedStatus={false}
            showPostsAuthor={true}
            forEditing={false}
          />
        </div>
      ) : data.posts.length === 0 ? (
        <div className="wrapper">
          <p className="term-not-found">
            No post titles matches the search term: {searchTerm}.
          </p>
        </div>
      ) : null}
    </div>
  </main>
}
