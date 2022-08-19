import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useSWR, { mutate } from "swr";
import { Prisma } from "@prisma/client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import { fetcher } from "@/utils/fetcher";

import { userFormSchema, UserFormData } from "../../../formSchema/user";

const UserEdit: NextPage = () => {
  // Dynamic Routes の仕組み([id].tsx)で URL から User の id を取得する
  // reference: https://nextjs.org/docs/routing/dynamic-routes
  const router = useRouter();
  const { id } = router.query;

  type UserPayload = Prisma.UserGetPayload<{}>;

  const { data: targetUser, error: user_error } = useSWR<UserPayload>(
    `/api/user/${id}`,
    fetcher
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      ...targetUser,
    },
  });

  /* targetUser を取得完了したタイミングでフォームに targetUser のプロパティをセットする */
  React.useEffect(() => {
    //reset({ ...targetUser });
  }, [reset, targetUser]);

  const onSubmit = handleSubmit(async (formData) => {
    const response = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      const responseJSON = await response.json();
      router.push({ pathname: "/user/" });
    } else {
      // TODO: display error message
      console.log("error");
    }

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
      <FormControl fullWidth>
        <TextField
          label="Name"
          variant="standard"
          error={"name" in errors}
          helperText={errors.name?.message}
          {...register("name")}
        />
      </FormControl>
      {/*
        <label>name: </label>
        <Input {...register("name")} />
      */}
      <FormControl fullWidth>
        <TextField
          label="Email"
          variant="standard"
          required
          error={"email" in errors}
          helperText={errors.email?.message}
          {...register("email")}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          label="Password"
          variant="standard"
          type="password"
          required
          error={"password" in errors}
          helperText={errors.password?.message}
          {...register("password")}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          label="role"
          required
          error={"roleId" in errors}
          {...register("roleId")}
        >
          {roles?.map((role) => {
            return (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error={true}>{errors.roleId?.message}</FormHelperText>
      </FormControl>
      {/*
        <label>role: </label>
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
        */}
      <FormControl fullWidth>
        <InputLabel>Department</InputLabel>
        <Select
          label="department"
          required
          error={"departmentId" in errors}
          {...register("departmentId")}
        >
          {departments?.map((department) => {
            return (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error={true}>
          {errors.departmentId?.message}
        </FormHelperText>
      </FormControl>
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
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserEdit;

/*
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
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserEdit;
*/
