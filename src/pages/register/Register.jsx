import "./register.css";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useFetcher,
} from "react-router";
import CustomInput from "../../components/custom-input/CustomInput";
import Button from "../../components/button/Button.jsx";
import InputErrors from "../../components/input-errors/InputErrors.jsx";
import LoaderOne from "../../components/loader-one/LoaderOne.jsx";
import FetchError from "../../components/fetch-error/FetchError.jsx";

export default function Register() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    profilePictureUrl: "",
    confirmPassword: "",
  })

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  function handleUserInput(e, inputName) {
    setUserInputs({
      ...userInputs,
      [inputName]: e.target.value
    })
  }

  function tryAgain() {
    setFetchError(null);
  }

  // Show fetching error if there's a server error.
  useEffect(() => {
    if (fetcher.data?.serverError) {
      setFetchError(fetcher.data.serverError);
    } else {
      setFetchError(null);
    }
  }, [fetcher.data]);


  // If register is successfull, redirect the user to the login page with a greet message.
  if (fetcher.data?.success) {
    return navigate(
      `/login?message=${encodeURIComponent("Welcome, " + userInputs.username + "! You can log in now!")}&username=${userInputs.username}`,
      { replace: true }
    );
  }

  if (fetcher.state === "submitting") {
    return <LoaderOne
      message="Processing user register, please wait..."
    />
  }

  if (fetchError) {
    return <FetchError
      errorCode={"500"}
      errorMessage={fetchError}
      reloadPageFunction={tryAgain}
    />
  }

  return <main className="register">
    {fetcher.data?.errors &&
      <InputErrors errors={fetcher.data} />}
    <fetcher.Form
      method="post"
      action="/register"
      className="form"
    >
      <fieldset>
        <legend>What's your name?</legend>
        <div className="wrapper">
          <CustomInput
            googleIcon="person"
            labelText="First Name"
            inputType="text"
            inputName="firstName"
            inputPlaceholder="John"
            roundBorders={false}
            value={userInputs.firstName}
            onChange={handleUserInput}
            required={true}
            constraintsMessage="Between 3 and 30 characters, only letters"
          />
          <CustomInput
            googleIcon="group"
            labelText="Last Name"
            inputType="text"
            inputName="lastName"
            inputPlaceholder="Doe"
            roundBorders={false}
            value={userInputs.lastName}
            onChange={handleUserInput}
            required={true}
            constraintsMessage="Between 3 and 30 characters, only letters"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Username</legend>
        <CustomInput
          googleIcon="account_circle"
          labelText="Username"
          inputType="text"
          inputName="username"
          inputPlaceholder="John_doe"
          roundBorders={false}
          value={userInputs.username}
          onChange={handleUserInput}
          required={true}
          constraintsMessage="Between 3 and 30 characters, case-sensitive, alphanumeric and hyphen"
        />
      </fieldset>
      <fieldset>
        <legend>Pick a strong password</legend>
        <div className="wrapper">
          <CustomInput
            googleIcon="lock"
            labelText="Password"
            inputType="password"
            inputName="password"
            inputPlaceholder="*****"
            roundBorders={false}
            value={userInputs.password}
            onChange={handleUserInput}
            required={true}
          />
          <CustomInput
            googleIcon="lock_reset"
            labelText="Confirm Password"
            inputType="password"
            inputName="confirmPassword"
            inputPlaceholder="*****"
            roundBorders={false}
            value={userInputs.confirmPassword}
            onChange={handleUserInput}
            required={true}
          />
        </div>
      </fieldset>
      <fieldset className="password-tester">
        <legend>Passwords tester</legend>
        {userInputs.password !== userInputs.confirmPassword && (<p className="pass-message dont-match">The passwords don't match.</p>)}
        {userInputs.password === "" && userInputs.confirmPassword === ""
          ? (<p className="pass-message waiting">Waiting for passwords to change...</p>)
          : userInputs.password === userInputs.confirmPassword
            ? (<p className="pass-message match">The passwords match!</p>)
            : ''}
      </fieldset>
      <fieldset>
        <legend>
          Create your account!
        </legend>
        <Button
          onClick={scrollToTop}
          type="submit"
        >
          Register!
        </Button>
      </fieldset>
    </fetcher.Form>
  </main>
}
