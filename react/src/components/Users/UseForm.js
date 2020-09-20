import React, { useState, useEffect } from "react";
import UserService from "./UserService";

export default function UseForm(props) {
  const { defaultValues } = props;
  const [values, setValues] = useState(defaultValues);
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
    }
    console.log(userService.readAll());
  };

  return {
    values,
    setValues,
    onChange,
    onSubmit
  };
}
