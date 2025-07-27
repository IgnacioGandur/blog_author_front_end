import "./login.css";
import {
  useState,
  useEffect
} from "react";
import {
  useRouteLoaderData,
  useSearchParams,
  useNavigation,
  useActionData,
  Form
} from "react-router";
import CustomInput from "../../components/custom-input/CustomInput";
import Button from "../../components/button/Button";
import InputErrors from "../../components/input-errors/InputErrors";
import LoaderOne from "../../components/loader-one/LoaderOne";

export default function Login() {
  const routeLoaderData = useRouteLoaderData("root");
  const navigation = useNavigation();
  const actionData = useActionData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInputs, setUserInputs] = useState({
    username: searchParams.get("username") ? searchParams.get("username") : '',
    password: ""
  });

  function handleUserInput(e, field) {
    setUserInputs({
      ...userInputs,
      [field]: e.target.value,
    })
  }

  // Display a greet message to a newly registered user and focus password field.
  useEffect(() => {
    if (searchParams.get("username") && searchParams.get("message")) {
      document.querySelector("input#password").focus();
    }
  }, [])

  if (navigation?.state === "submitting") {
    return <LoaderOne message="Processing author login, please wait..." />
  }

  console.log("route loader data is:", routeLoaderData);

  return <main className="login">
    <Form
      className="form"
      method="POST"
    >
      {routeLoaderData?.serverError && (
        <p className="back-end-error-message">
          {routeLoaderData.serverError}
        </p>
      )}
      {actionData?.validationFail && (
        <InputErrors errors={actionData.result} />
      )}
      {searchParams.get("message") && searchParams.get("username") && (
        <fieldset
          className="registered-message"
        >
          <legend>
            User registered successfully!
          </legend>
          <p>
            {searchParams.get("message")}
          </p>
        </fieldset>
      )}
      <fieldset
      >
        <legend>
          Log in
        </legend>
        <CustomInput
          googleIcon="account_circle"
          labelText="Username"
          inputType="text"
          inputName="username"
          roundBorders={false}
          inputPlaceholder="John_doe"
          required={true}
          value={userInputs.username}
          onChange={handleUserInput}
        />
        <CustomInput
          googleIcon="key_vertical"
          labelText="Password"
          inputType="password"
          roundBorders={false}
          inputName="password"
          inputPlaceholder="******"
          required={true}
          value={userInputs.password}
          onChange={handleUserInput}
        />
      </fieldset>
      <Button
        type="submit"
        roundBorders={false}
      >
        Log in
      </Button>
    </Form>
  </main>
}
