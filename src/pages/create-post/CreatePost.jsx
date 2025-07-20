import "./create-post.css";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import CustomInput from "../../components/custom-input/CustomInput";
import { useFetcher } from "react-router";
import Button from "../../components/button/Button.jsx";
import { MoonLoader } from "react-spinners";
import InputErrors from "../../components/input-errors/InputErrors.jsx";
import PostCreationLoader from "./PostCreationLoader.jsx";

function CategoryLoader({ ammount = 5 }) {
  return Array.from({ length: ammount }).map((_, index) => {
    return <div
      key={index}
      className="category-loader"
    >
      <MoonLoader
        color="#7678ed"
        size="24px"
      />
    </div>
  })
}

export default function CreatePost() {
  const fetcher = useFetcher();
  const [userInputs, setUserInputs] = useState({
    title: "",
    content: "",
    shortDescription: "",
    imageUrl: "",
    readTime: "",
  })
  const [categories, setCategories] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [fetchCategoriesError, setFetchCategoriesError] = useState(null);

  function handleUserInputs(e, property) {
    setUserInputs({
      ...userInputs,
      [property]: e.target.value,
    })
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const categoriesUrl = "http://localhost:3000/api/categories";
        const response = await fetch(categoriesUrl);
        const result = await response.json();

        if (result.success) {
          setCategories(result.categories);
        }

      } catch (error) {
        setFetchCategoriesError("Server error. The app was not able fetch the categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  if (fetcher.state === "submitting") {
    return <PostCreationLoader />
  }

  // TODO: display a message to the user saying that after the post creation, the post is not going to be published automatically, it needs to be manually done.
  //
  return <section className="create-post">
    <div className="wrapper">
      {fetcher.data?.errors && (
        <InputErrors errors={fetcher.data} />
      )}
      {fetcher.data?.serverError && (
        <p className="server-error">
          There seems to be an error with the app's backend. The post was not created! Please try again later...
        </p>
      )}
      <fetcher.Form
        className="form"
        action="/dashboard/create-post"
        method="post"
      >
        <fieldset className="main">
          <legend>Post Details</legend>
          <CustomInput
            googleIcon="title"
            labelText="Post Title"
            inputType="text"
            roundBorders={false}
            inputName="title"
            inputPlaceholder="Lorem Ipsum"
            required={true}
            value={userInputs.title}
            onChange={handleUserInputs}
          />
          <CustomInput
            googleIcon="subtitles"
            labelText="Short Description"
            inputType="text"
            roundBorders={false}
            inputName="shortDescription"
            inputPlaceholder="Lorem Ipsum"
            required={true}
            value={userInputs.shortDescription}
            onChange={handleUserInputs}
          />
          <CustomInput
            googleIcon="add_photo_alternate"
            labelText="Image Url"
            inputType="text"
            roundBorders={false}
            inputName="imageUrl"
            inputPlaceholder="Lorem Ipsum"
            required={true}
            value={userInputs.imageUrl}
            onChange={handleUserInputs}
          />
          <CustomInput
            googleIcon="acute"
            labelText="Approximate Read Time"
            inputType="number"
            roundBorders={false}
            inputName="readTime"
            inputPlaceholder={5}
            required={true}
            value={userInputs.readTime}
            onChange={handleUserInputs}
          />
          {fetchCategoriesError ? (
            <fieldset className="categories-fieldset">
              <legend>Error while fetching categories</legend>
              <p className="fetch-error">
                {fetchCategoriesError}
              </p>
            </fieldset>
          ) : isLoadingCategories ? (
            <fieldset className="categories-fieldset">
              <legend>Fetching categories...</legend>
              <div className="categories">
                <CategoryLoader ammount={5} />
              </div>
            </fieldset>
          ) : (
            <fieldset className="categories-fieldset">
              <legend>Select the categories for your post</legend>
              <div className="categories">
                {categories.map((category) => {
                  return <label
                    className="category"
                    key={category.id}
                    htmlFor={category.name}
                  >
                    {category.name}
                    <input
                      className="checkbox"
                      type="checkbox"
                      name="categories"
                      id={category.name}
                      value={category.id}
                    />
                  </label>
                }
                )}
              </div>
            </fieldset>
          )}
          <Button
            type="submit"
          >
            Create post!
          </Button>
        </fieldset>
        <fieldset className="content-fieldset">
          <legend>Write your post</legend>
          <MDEditor
            className="markdown-editor"
            value={postContent}
            onChange={setPostContent}
          />
          <input
            type="hidden"
            name="content"
            value={postContent}
          />
        </fieldset>
      </fetcher.Form>
    </div>
  </section>
}

