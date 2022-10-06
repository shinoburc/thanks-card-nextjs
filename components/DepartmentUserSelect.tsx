import React, { useState } from "react";

import { useController, UseControllerProps } from "react-hook-form";

import useSWR from "swr";
import { Prisma } from "@prisma/client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import { fetcher } from "@/utils/fetcher";

import { ThanksCardFormData } from "@/formSchema/thanks_card";

const DepartmentUserSelect = (
  props: UseControllerProps<ThanksCardFormData> & { label: string }
) => {
  // reference: https://react-hook-form.com/api/usecontroller
  // React Hook Form で管理された field をこのコンポーネントで使用する。
  // props.name で指定されている field が使用される。
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const [departmentId, setDepartmentId] = useState<string>();

  const { data: departments, error: department_error } = useSWR<
    Prisma.DepartmentCreateInput[]
  >("/api/department", fetcher);

  const {
    data: users,
    error: user_error,
    mutate,
  } = useSWR<Prisma.UserCreateInput[]>(
    `/api/department/${departmentId}/users`,
    fetcher
  );

  const departmentOnChange = async (event: SelectChangeEvent<string>) => {
    const departmentId = event.target.value;
    // state を更新することで useSWR がデータを再フェッチし、
    // その部署に所属するユーザが表示される。
    setDepartmentId(departmentId);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Department</InputLabel>
        <Select label="department" onChange={departmentOnChange}>
          {departments?.map((department) => {
            return (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select label="toId" required error={error ? true : false} {...field}>
          {users?.map((user) => {
            return (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText error={true}>{error?.message}</FormHelperText>
      </FormControl>
    </>
  );
};

export default DepartmentUserSelect;
