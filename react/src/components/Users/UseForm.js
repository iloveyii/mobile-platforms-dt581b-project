import React, { useState, useEffect } from "react";
import UserService from "./UserService";

export default function UseForm(props) {
  const { defaultValues } = props;
  const [values, setValues] = useState(defaultValues);
  const [status, setStatus] = useState('');
  const userService = UserService();

  const onChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = values;
    if (form.id) {
      if (userService.update(form)) {
        setValues({ ...defaultValues });
        setStatus('update.success');
        setTimeout(() => setStatus(''), 4000);
      }
    } else {
      if (userService.create(form)) {
        setValues({ ...defaultValues });
        setStatus('create.success');
        setTimeout(() => setStatus(''), 4000);
      }
    }
  };

  const onDelete = e => {
    e.preventDefault();
    userService.deleted(values);
    setValues({ ...defaultValues });
    setStatus('delete.success');
    setTimeout(() => setStatus(''), 4000);
  };

  return {
    values,
    setValues,
    onChange,
    onSubmit,
    onDelete,
    status
  };
}
