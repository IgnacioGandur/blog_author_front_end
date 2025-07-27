import "./login.css";
import {
  useState,
  useEffect
} from "react";
import {
  useNavigate,
  useSearchParams,
  useFetcher,
} from "react-router";
// import Fieldset from "../../components/fieldset/Fieldset";
import CustomInput from "../../components/custom-input/CustomInput";
import Button from "../../components/button/Button";
import InputErrors from "../../components/input-errors/InputErrors";
import LoaderOne from "../../components/loader-one/LoaderOne";
import FetchErrors from "../../components/fetch-error/FetchError";

export default function Login() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchErrors, setFetchErrors] = useState(null);
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

  function tryAgain() {
    setFetchErrors(null);
  }

  // Display a greet message to a newly registered user and focus password field.
  useEffect(() => {
    if (searchParams.get("username") && searchParams.get("message")) {
      document.querySelector("input#password").focus();
    }
  }, [])

  // Show fetching error component if there's a server error.
  useEffect(() => {
    if (fetcher.data?.serverError) {
      setFetchErrors(fetcher.data.serverError);
    } else {
      setFetchErrors(null);
    }
  }, [fetcher.data]);


  // Redirect user if login is successfull.
  if (fetcher.data?.success) {
    return navigate("/", { replace: true });
  }

  if (fetcher.state === "submitting") {
    return <LoaderOne message="Processing author login, please wait..." />
  }

  if (fetchErrors) {
    return <FetchErrors
      errorCode="500"
      errorMessage={fetchErrors}
      reloadPageFunction={tryAgain}
    />
  }

  return <main className="login">
    <fetcher.Form
      className="form"
      action="/login"
      method="POST"
    >
      {fetcher.data?.errors && (
        <InputErrors errors={fetcher.data} />
      )}
      {searchParams.get("message") && searchParams.get("username") && (
        <fieldset
        >
          <legend>User registered successfully!</legend>
          {searchParams.get("message")}
        </fieldset>

      )}
      <fieldset>
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
    </fetcher.Form>
  </main>
}
