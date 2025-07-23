import "./create-post.css";
import {
  useState,
  useRef
} from "react";
import MDEditor from '@uiw/react-md-editor';
import CustomInput from "../../components/custom-input/CustomInput";
import {
  useFetcher,
  useActionData,
  Form,
  useLoaderData
} from "react-router";
import Button from "../../components/button/Button.jsx";
import InputErrors from "../../components/input-errors/InputErrors.jsx";
import PostCreationLoader from "./PostCreationLoader.jsx";

export default function CreatePost() {
  const actionData = useActionData();
  console.log("action data is:", actionData);
  const loaderData = useLoaderData();
  console.log("loader data is:", loaderData);
  const fetcher = useFetcher();
  const [userInputs, setUserInputs] = useState({
    title: "",
    content: "",
    shortDescription: "",
    imageUrl: "",
    readTime: "",
  })
  const [postContent, setPostContent] = useState('');
  const dialogRef = useRef(null);

  function openDialog() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  function closeDialog() {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  function handleUserInputs(e, property) {
    setUserInputs({
      ...userInputs,
      [property]: e.target.value,
    })
  }

  if (fetcher.state === "submitting") {
    return <PostCreationLoader />
  }
  return <section className="create-post">
    <dialog
      ref={dialogRef}
      className="create-category-dialog"
    >
      <Form
        className="create-category-form"
        method="post"
      >
        <fieldset>
          <legend>
            Create Category
          </legend>
          <label
            htmlFor="category-name"
          >
            Category Name
          </label>
          <input
            type="text"
            name="createCategory"
            id="category-name"
            placeholder="Programming..."
          />
          <div className="buttons-container">
            <Button
              type="submit"
              onClick={closeDialog}
            >
              Create!
            </Button>
            <Button
              type="button"
              onClick={closeDialog}
            >
              Cancel
            </Button>
          </div>
        </fieldset>
      </Form>
    </dialog>
    {actionData?.categoryCreated && (
      <p className="category-created">
        Category created successfully!
      </p>
    )}
    {actionData?.categoryCreated === false && (
      <div
        className="category-creation-failed"
      >
        <p className="message">
          Something went wrong when trying to create the category:
        </p>
        <ul className="errors-container">
          {actionData?.errors.map((error) => {
            return <li
              key={error.path}
              className="error"
            >
              {error.msg}
            </li>
          })}
        </ul>
      </div>
    )}
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
          {loaderData?.serverError ? (
            <fieldset className="categories-fieldset">
              <legend>Error while fetching categories</legend>
              <p className="fetch-error">
                {loaderData.serverError}
              </p>
            </fieldset>
          ) : loaderData?.success ? (
            <fieldset className="categories-fieldset">
              <legend>Select the categories for your post</legend>
              <div className="categories">
                {loaderData.categories.map((category) => {
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
          ) : null}
          <div className="category-not-found">
            <p>
              The category you are looking doesn't exists?
            </p>
            <button
              type="button"
              onClick={openDialog}
            >
              Create it!
            </button>
          </div>
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

