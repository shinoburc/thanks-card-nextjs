import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useSWR from "swr";
import { Prisma } from "@prisma/client";

import Button from "@mui/material/Button";

import { fetcher } from "@/utils/fetcher";
import { userFormSchema, UserFormData } from "../../formSchema/user";

const UserCreate: NextPage = () => {
  const router = useRouter();

  const {
    register,
    //setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      const responseJSON = await response.json();
      router.push("/user/");
    } else {
      // TODO: display error message
      console.log("error");
    }
  });

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
        <input {...register("name")} />
        <p className="error">{errors.name?.message}</p>
      </div>
      <div>
        <label>email</label>
        <input {...register("email")} />
        <p className="error">{errors.email?.message}</p>
      </div>
      <div>
        <label>password</label>
        <input {...register("password")} type="password" />
        <p className="error">{errors.password?.message}</p>
      </div>
      <div>
        <label>role</label>
        <select
          {...register("roleId")}
          defaultValue={roles ? roles[0].id : undefined}
        >
          {roles?.map((role) => {
            return (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            );
          })}
        </select>
        <p className="error">{errors.roleId?.message}</p>
      </div>
      <div>
        <label>department</label>
        <select
          {...register("departmentId")}
          defaultValue={departments ? departments[0].id : undefined}
        >
          {departments?.map((department) => {
            return (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            );
          })}
        </select>
        <p className="error">{errors.departmentId?.message}</p>
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
