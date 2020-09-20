import React from "react";

export default function UserService() {
  const create = form => {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      users = {
        list: [{ ...form }]
      };
    } else {
      if (users.list) {
        users.list.push({ ...form });
      } else {
        users.list = [{ ...form }];
      }
    }

    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const readAll = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    return users && users.list || [];
  };

  return {
    create,
    readAll
  };
}
