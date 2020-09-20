import React, { useState, useEffect } from "react";
import UserService from "./UserService";

export function UseForm(props) {
  const { defaultValues } = props;
  const [values, setValues] = useState(defaultValues);
  const [mode, setMode] = useState("new");
  const userService = UserService();

  const onChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const defaultValues = {
      name: "",
      email: "",
      address: ""
    };
    const form = values;
    if (userService.create(form)) {
      setValues({ ...defaultValues });
      setTimeout(() => {
        console.log("setValues called", values);
        setMode("created" + Date.now());
      }, 5000);
    }
    console.log(userService.readAll());
  };

  useEffect(() => {
    console.log("Mode changed to ", mode, values);
  }, [mode]);

  return {
    values,
    setValues,
    onChange,
    onSubmit
  };
}

export function Form(props) {
  console.log("Form");
  const { children, ...other } = props;
  return <div {...other}>{children}</div>;
}
