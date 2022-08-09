import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import useSWR from "swr";
import { Prisma } from "@prisma/client";

import Button from "@mui/material/Button";

type FormData = {
  name: string;
  email: string;
  password: string;
  roleId: string;
  departmentId: string;
};

const UserCreate: NextPage = () => {
  const router = useRouter();

  const {
    register,
    //setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const responseJSON = await response.json();
    // TODO: 成功時・失敗時にの判定
    console.log(responseJSON);
    router.push("/user/");
  });

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: roles, error: role_error } = useSWR<Prisma.RoleCreateInput[]>(
    "/api/role",
    fetcher
  );
  const { data: departments, error: department_error } = useSWR<
    Prisma.DepartmentCreateInput[]
  >("/api/department", fetcher);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>name</label>
        <input {...register("name", { required: true, maxLength: 40 })} />
        {errors.name && <p>name is required</p>}
      </div>
      <div>
        <label>email</label>
        <input {...register("email", { required: true, maxLength: 60 })} />
        {errors.email && <p>email is required</p>}
      </div>
      <div>
        <label>password</label>
        <input
          {...register("password", { required: true, maxLength: 8 })}
          type="password"
        />
        {errors.password && <p>password is required</p>}
      </div>
      <div>
        <label>role</label>
        <select {...register("roleId")}>
          {roles?.map((role) => {
            return (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>department</label>
        <select {...register("departmentId")}>
          {departments?.map((department) => {
            return (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            );
          })}
        </select>
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
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserCreate;
