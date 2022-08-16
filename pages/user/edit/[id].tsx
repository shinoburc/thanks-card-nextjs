import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import useSWR, { mutate } from "swr";
import { Prisma } from "@prisma/client";

import Button from "@mui/material/Button";

type FormData = {
  name: string | null;
  email: string | null;
  password: string | null;
  roleId: string | null;
  departmentId: string | null;
};

const UserEdit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  type UserPayload = Prisma.UserGetPayload<{}>;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: targetUser, error: user_error } = useSWR<UserPayload>(
    `/api/user/${id}`,
    fetcher
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    /*
    defaultValues: {
      ...targetUser,
    },
    */
  });

  /* targetUser を取得完了したタイミングでフォームに targetUser のプロパティをセットする */
  React.useEffect(() => {
    reset({ ...targetUser });
  }, [reset, targetUser]);

  const onSubmit = handleSubmit(async (formData) => {
    const response = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const responseJSON = await response.json();
    // TODO: 成功時・失敗時の判定
    console.log(responseJSON);
    router.push({ pathname: "/user/" });

    // SWR のキャッシュを手動で更新する場合
    // reference: https://swr.vercel.app/ja/docs/mutation
    /*
    mutate(
      "/api/user",
      async (users: UserPayload[]) => {
        const response = await fetch(`/api/user/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        // TODO: 成功時・失敗時の判定
        const updatedUser = await response.json();
        // リストをフィルタリングし、更新されたアイテムを返します
        const filteredUsers = users.filter(
          (user) => user.id !== updatedUser.id
        );
        return [...filteredUsers, updatedUser];
        // API からすでに更新後の情報が取得できるため
        // 再検証する必要はありません
      },
      { revalidate: false }
    );
    */
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
        <select
          {...register("roleId", { required: true })}
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
      </div>
      <div>
        <label>department</label>
        <select
          {...register("departmentId", { required: true })}
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

export default UserEdit;
