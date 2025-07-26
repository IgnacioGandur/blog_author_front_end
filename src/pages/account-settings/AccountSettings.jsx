import "./account-settings.css";
import {
  useState,
  useRef,
} from "react";
import {
  useRouteLoaderData,
  useActionData,
  useNavigation,
  redirect,
  Form
} from "react-router";
import { ClockLoader, ClimbingBoxLoader } from "react-spinners";
import CustomInput from "../../components/custom-input/CustomInput";
import Button from "../../components/button/Button";
import InputErrors from "../../components/input-errors/InputErrors";

function FormSubmitionLoader() {
  return <div className="form-submition-loader">
    <ClimbingBoxLoader
      color="#7678ed"
    />
    <h2>Processing user update, please wait...</h2>
  </div>
}

function ProfileInfoLoader() {
  return <div className="profile-info-loader">
    <ClockLoader
      color="#7678ed"
    />
    <h2>Loading profile info...</h2>
  </div>
}

export default function AccountSettings() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const userData = useRouteLoaderData("root");
  const user = userData?.user;
  const [userInputs, setUserInputs] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    profilePictureUrl: user.profilePictureUrl,
    password: "",
    confirmPassword: "",
  })
  const deleteAccountDialogRef = useRef(null);

  function openDialog() {
    if (deleteAccountDialogRef.current) {
      deleteAccountDialogRef.current.showModal();
    }
  }

  function closeDialog() {
    if (deleteAccountDialogRef.current) {
      deleteAccountDialogRef.current.close();
    }
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  function handleUserInputs(e, field) {
    setUserInputs((prevUserInputs) => {
      return {
        ...prevUserInputs,
        [field]: e.target.value,
      }
    })
  }
  return <main className="account-settings">
    {
      actionData?.fail && (
        <p className="fail-message">
          {actionData.message}
        </p>
      )
    }
    {
      actionData?.success && (
        <p className="success-message">
          {actionData.message}
        </p>
      )
    }
    {
      actionData?.userInputErrors && (
        <div className="user-input-errors">
          <p>
            {actionData.message}
          </p>
          <InputErrors errors={actionData.errorResult} />
        </div>
      )
    }
    <dialog
      ref={deleteAccountDialogRef}
      className="delete-account-dialog"
    >
      <Form
        method="delete"
        className="delete-account-form"
      >
        <p className="title">
          Are you sure you want to delete your account?
        </p>
        <fieldset>
          <legend>
            Enter your password to confirm
          </legend>
          <label
            className="label"
            htmlFor="delete-account-password"
          >
            Password
            <input
              className="delete-account-password"
              type="password"
              name="deletePass"
              id="delete-account-password"
            />
          </label>
        </fieldset>
        <p className="warning-message">
          This can't be undone, all information related to your account will be lost.
        </p>
        <div className="buttons">
          <Button
            type="submit"
            onClick={closeDialog}
          >
            Confirm
          </Button>
          <Button
            type="button"
            onClick={closeDialog}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </dialog>
    <header className="header">
      <h2>
        Profile Info
      </h2>
      <button
        className="delete-account-button"
        onClick={openDialog}
      >
        <span className="material-symbols-rounded">
          account_circle_off
        </span>
        Delete account
      </button>
    </header>
    {
      navigation.state === "loading" ? (
        <ProfileInfoLoader />
      ) : (
        <section className="current-profile-info">
          <p className="author-status">
            <span className="material-symbols-rounded icon">
              {
                user.isAuthor ? "crown" : "account_circle"
              }
            </span>
            {user.isAuthor && "Author"}
          </p>
          <div className="ppf">
            <img
              className="image"
              src={user.profilePictureUrl}
              alt="Current profile picture"
            />
          </div>
          <h3
            className="name"
          >
            <span>
              {user.firstName} {user.lastName}
            </span>
          </h3>
          <div
            className="username"
          >
            <h3>
              @{user.username}
            </h3>
          </div>
        </section >
      )
    }
    {
      navigation.state === "idle" ? (
        <Form
          className="edit-profile-info"
          method="post"
        >
          <h2>
            Edit Your Profile Info
          </h2>
          <fieldset
            className="horizontal-fieldset"
          >
            <legend>
              Names
            </legend>
            <CustomInput
              googleIcon="id_card"
              labelText="First Name"
              inputType="text"
              roundBorders={false}
              inputName="firstName"
              inputPlaceholder="John"
              required={true}
              value={userInputs.firstName}
              onChange={handleUserInputs}
              constraintsMessage="Between 3 and 30 characters, only letters and spaces."
            />
            <div className="vertical-separator"></div>
            <CustomInput
              googleIcon="id_card"
              labelText="Last Name"
              inputType="text"
              roundBorders={false}
              inputName="lastName"
              inputPlaceholder="Doe"
              required={true}
              value={userInputs.lastName}
              onChange={handleUserInputs}
              constraintsMessage="Between 3 and 30 characters, only letters and spaces."
            />
          </fieldset>
          <fieldset
          >
            <legend>
              Profile Picture URL
            </legend>
            <CustomInput
              googleIcon="photo"
              labelText="Profile Picture URL"
              inputType="url"
              roundBorders={false}
              inputName="profilePictureUrl"
              inputPlaceholder="https://picsum.photos/200/300.jpg"
              required={true}
              value={userInputs.profilePictureUrl}
              onChange={handleUserInputs}
              constraintsMessage="A link that points to an image (jpg, jpeg, png, gif, bmp, or webp)."
            />
          </fieldset>
          <fieldset
            className="horizontal-fieldset"
          >
            <legend>
              Update Your Password
            </legend>
            <CustomInput
              googleIcon="lock"
              labelText="Password"
              inputType="password"
              roundBorders={false}
              inputName="password"
              inputPlaceholder="*****"
              required={false}
              value={userInputs.password}
              onChange={handleUserInputs}
            />
            <div className="vertical-separator"></div>
            <CustomInput
              googleIcon="lock_reset"
              labelText="Confirm Password"
              inputType="password"
              roundBorders={false}
              inputName="confirmPassword"
              inputPlaceholder="*****"
              required={false}
              value={userInputs.confirmPassword}
              onChange={handleUserInputs}
            />
          </fieldset>
          <Button
            type="submit"
            onClick={scrollToTop}
          >
            Update Profile
          </Button>
        </Form>
      ) : navigation.state === "submitting" ? (
        <FormSubmitionLoader />
      ) : null
    }
  </main >
}
