import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputFrom, Logo, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/AppContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  // global state and useNavigate
  const { isLoading, showAlert, displayAlert, user, setUpUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;

    // checking if the input field are empty or not
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    // passing user information to the backend
    const currentUser = { name, email, password };
    if (isMember) {
      setUpUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...'
      })
    } else {
      setUpUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created Successfully! Redirecting...'
      });
    }
  };

  // checking if user is already loggedin and redirecting
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* Alert */}
        {showAlert && <Alert />}

        {/* name input */}
        {!values.isMember && (
          <InputFrom
            handleChange={handleChange}
            labelText={"name"}
            type={"text"}
            value={values.name}
            name={"name"}
          />
        )}

        {/* email input */}
        <InputFrom
          handleChange={handleChange}
          labelText={"email"}
          type={"email"}
          value={values.email}
          name={"email"}
        />

        {/* password input */}
        <InputFrom
          handleChange={handleChange}
          labelText={"password"}
          type={"password"}
          value={values.password}
          name={"password"}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
