import "./edit-post.css";
import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  useSearchParams,
  useLoaderData,
  useRouteLoaderData,
  useFetcher,
  Form,
} from "react-router";
import UnauthorizedPostEdition from "./unathorized-post-edition/UnathorizedPostEdition";
import PostEditionErrors from "./post-edition-errors/PostEditionErrors";
import CustomInput from "../../components/custom-input/CustomInput";
import MDEditor from "@uiw/react-md-editor";
import Button from "../../components/button/Button";
import InputErrors from "../../components/input-errors/InputErrors";
import EditPostLoader from "./EditPostLoader";

export default function EditPost() {
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");
  const userData = useRouteLoaderData("root");
  const postData = useLoaderData("edit-post");
  const [postContent, setPostContent] = useState(postData.post.content);
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

  const [updatedPostFields, setUpdatedPostFields] = useState(
    postData ? {
      title: postData.post.title,
      content: postData.post.content,
      imageUrl: postData.post.imageUrl,
      shortDescription: postData.post.shortDescription,
      readTime: postData.post.readTime,
      isPublished: postData.post.isPublished,
      categories: postData.post.categories.map(category => ({ id: category.id })),
    } : {
      title: "",
      content: "",
      imageUrl: "",
      shortDescription: "",
      readTime: "",
      isPublished: "",
      categories: "",
    }
  );

  function handlePostFieldUpdate(e, fieldName) {
    setUpdatedPostFields((prevData) => ({
      ...prevData,
      [fieldName]: e.target.value,
    }))
  }

  function handleCategorySelection(e) {
    const id = Number(e.target.value);

    setUpdatedPostFields(prev => {
      const alreadySelected = prev.categories.some(category => category.id === id);

      return {
        ...prev,
        categories: alreadySelected
          ? prev.categories.filter(category => category.id !== id)
          : [...prev.categories, { id }]
      };
    });
  }

  function togglePublishedStatus(e) {
    setUpdatedPostFields((prev) => ({
      ...prev,
      isPublished: e.target.checked
    }))
  }

  const [categories, setCategories] = useState(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [fetchCategoriesError, setFetchCategoriesError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        const categoriesUrl = `${import.meta.env.VITE_API_BASE}/categories`;
        const fetchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }

        const response = await fetch(categoriesUrl, fetchOptions);
        const result = await response.json();

        if (result.success) {
          setCategories(result.categories);
        }
      } catch (error) {
        setFetchCategoriesError("Server error. The api's backend is not working.");
      } finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories();
  }, []);

  if (fetcher?.state === "submitting") {
    return <EditPostLoader />
  }

  if (!postData?.success) {
    return <PostEditionErrors
      errorTitle="There are some problems with the post you are trying to edit..."
      errors={postData}
    />
  }

  if (postData.success) {
    if (postData.post.userId != userData.user.id) {
      return <UnauthorizedPostEdition />
    }

    return <section className="edit-post">
      <dialog
        ref={dialogRef}
        className="edit-post-dialog"
      >
        <Form
          className="delete-post-form"
          method="post"
        >
          <input
            type="hidden"
            name="intent"
            value="delete-post"
          />
          <p className="message">
            Are you sure you want to delete this post?
            <span>(This can't be undone)</span>
          </p>
          <div className="buttons">
            <button
              type="submit"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={closeDialog}
            >
              Cancel
            </button>
          </div>
        </Form>
      </dialog>
      {message && (
        <p className="post-created-message">
          {message}
        </p>
      )}
      <div className="title-delete">
        <h1 className="title">
          Edit your post
        </h1>
        <button
          onClick={openDialog}
        >
          Delete post
        </button>
      </div>
      {fetcher.data?.success === false ? (
        <InputErrors
          errors={fetcher.data}
        />
      ) : fetcher.data?.success === true ? (
        <p className="updated-message success">
          Post updated successfully!
        </p>
      ) : null}
      <fetcher.Form
        method="PATCH"
        className="form"
      >
        <div className="inputs-and-categories">
          <fieldset className="inputs">
            <legend>
              Edit post info
            </legend>
            <CustomInput
              googleIcon="title"
              labelText="Edit Post Title"
              inputType="text"
              roundBorders={false}
              inputName="title"
              inputPlaceholder="Edited post title..."
              required={true}
              value={updatedPostFields.title}
              onChange={handlePostFieldUpdate}
            />
            <CustomInput
              googleIcon="subtitles"
              labelText="Edit Short Description"
              inputType="text"
              roundBorders={false}
              inputName="shortDescription"
              inputPlaceholder="Edited post's short description..."
              required={true}
              value={updatedPostFields.shortDescription}
              onChange={handlePostFieldUpdate}
            />
            <CustomInput
              googleIcon="add_photo_alternate"
              labelText="Edit post's image URL"
              inputType="url"
              roundBorders={false}
              inputName="imageUrl"
              inputPlaceholder="Edit your post's image Url..."
              required={true}
              value={updatedPostFields.imageUrl}
              onChange={handlePostFieldUpdate}
            />
            <CustomInput
              googleIcon="acute"
              labelText="Edit Post's Approximate Read Time"
              inputType="number"
              roundBorders={false}
              inputName="readTime"
              inputPlaceholder={5}
              required={true}
              value={updatedPostFields.readTime}
              onChange={handlePostFieldUpdate}
            />
          </fieldset>
          <fieldset className="toggle-published-status">
            <legend>
              Published Status
            </legend>
            <label htmlFor="published_status">
              Toggle published status
              <input
                type="checkbox"
                name="isPublished"
                checked={updatedPostFields.isPublished}
                onChange={togglePublishedStatus}
              />
            </label>
            <div className="status">
              <span className="text">
                Current published status
              </span>
              <div className="wrapper">
                <span className="material-symbols-rounded">
                  {postData.post.isPublished ? "verified" : "verified_off"}
                </span>
                <span>
                  {postData.post.isPublished ? "Published" : "Not Published"}
                </span>
              </div>
            </div>
          </fieldset>
          {fetchCategoriesError ? (
            <fieldset className="categories-fieldset">
              <legend>Error while fetching categories</legend>
              <p>
                {fetchCategoriesError}
              </p>
            </fieldset>
          ) : isLoadingCategories ? (
            <fieldset className="categories-fieldset">
              <legend>
                Loading post categories
              </legend>
              <p>Loading categories...</p>
            </fieldset>
          ) : categories ? (
            <fieldset className="categories-fieldset">
              <legend>
                Edit posts categories
              </legend>
              <div className="categories">
                {categories.map((category) => {
                  return <label
                    className="category"
                    htmlFor={category.name}
                    key={category.id}
                  >
                    {category.name}
                    <input
                      className="checkbox"
                      type="checkbox"
                      name="categories"
                      id={category.name}
                      value={category.id}
                      onChange={handleCategorySelection}
                      checked={updatedPostFields.categories.some(cat => cat.id === category.id)}
                    />
                  </label>
                })}
              </div>
            </fieldset>
          ) : null}
          <Button
            type="submit"
          >
            Edit post
          </Button>
        </div>
        <div className="post-content">
          <fieldset>
            <legend>
              Edit post content
            </legend>
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
        </div>
      </fetcher.Form>
    </section>
  }
}
