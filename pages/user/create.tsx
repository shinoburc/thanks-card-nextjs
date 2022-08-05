import type { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";

type FormData = {
  name: string;
  email: string;
  password: string;
  roleId: string;
  departmentId: string;
};

const UserCreate: NextPage = () => {
  const {
    register,
    //setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((formData) => console.log(formData));

  return (
    <form>
      {/*
      <form onSubmit={onSubmit}>
      */}
      <label>name</label>
      <input {...register("name", { required: true, maxLength: 40 })} />
      {errors.name && <p>name is required</p>}
      <label>email</label>
      <input {...register("email", { required: true, maxLength: 60 })} />
      {errors.email && <p>email is required</p>}
      <label>password</label>
      <input
        {...register("password", { required: true, maxLength: 8 })}
        type="password"
      />
      {errors.password && <p>password is required</p>}
      <label>role</label>
      <input {...register("roleId")} />
      <label>department</label>
      <input {...register("departmentId")} />
      {/*
      <button
        type="button"
        onClick={() => {
          setValue("lastName", "MIYAZATO");
          setValue("firstName", "Shinobu");
        }}
      >
        SetValue
      </button>
      <input type="submit" value="Submit" />
      */}
      <Button onClick={onSubmit} variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserCreate;
