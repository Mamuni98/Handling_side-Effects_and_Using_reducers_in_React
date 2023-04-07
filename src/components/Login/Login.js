import React, { useState, useReducer, useContext, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (prevstate, action) => {
  if (action.type === "EMAIL_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "EMAIL_BLUR") {
    return { value: prevstate.value, isValid: prevstate.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (prevstate, action) => {
  if (action.type === "PASS_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: prevstate.value, isValid: prevstate.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collegeReducer = (prevstate, action) => {
  if (action.type === "CLG_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "CLG_BLUR") {
    return { value: prevstate.value, isValid: prevstate.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState("");
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collegeIsValid } = collegeState;

  const cntxt = useContext(AuthContext);
// ONLY SHOWS HOW useEffect WORKS
  // useEffect(() => {
  //   console.log("Effect running");

  //   return () => {
  //     console.log("Effect cleanup");
  //   };
  // }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid && collegeIsValid);
    }, 1000);
    console.log(" After Cleanup");
    return () => {
      clearTimeout(identifier);
      console.log("Cleanup");
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "EMAIL_INPUT", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     passwordState.isValid &&
    //     collegeState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASS_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.trim().length > 6 &&
    //     collegeState.isValid
    // );
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "CLG_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     passwordState.isValid &&
    //     event.target.value.trim().length > 0
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASS_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "CLG_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    cntxt.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label="E-mail"
          type="email"
          id="email"
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          label="College Name"
          type="text"
          id="college"
          value={collegeState.value}
          isValid={collegeIsValid}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
