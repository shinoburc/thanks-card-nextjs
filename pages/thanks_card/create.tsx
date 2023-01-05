import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSession } from "next-auth/react";

import useSWR from "swr";
import { Prisma } from "@prisma/client";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import DepartmentUserSelect from "@/components/DepartmentUserSelect";

import { fetcher } from "@/utils/fetcher";
import {
  thanksCardFormSchema,
  ThanksCardFormData,
} from "@/formSchema/thanks_card";

const ThanksCardCreate: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [postError, setPostError] = React.useState<string>();

  const {
    register,
    //setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ThanksCardFormData>({
    resolver: yupResolver(thanksCardFormSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    // fromId(送り主) をログイン中のユーザIDとする
    formData.fromId = session?.user.id as string;
    const response = await fetch("/api/thanks_card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      router.push("/");
    } else {
      // TODO: display error message
      setPostError("server error");
    }
  });

  const { data: users, error: user_error } = useSWR<Prisma.UserCreateInput[]>(
    "/api/user",
    fetcher
  );

  return (
    <>
      <span className="error">{postError}</span>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            label="Title"
            variant="standard"
            error={"title" in errors}
            helperText={errors.title?.message}
            {...register("title")}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="outlined-multiline-flexible"
            label="Body"
            variant="standard"
            required
            multiline
            rows={8}
            error={"body" in errors}
            helperText={errors.body?.message}
            {...register("body")}
          />
        </FormControl>
        <DepartmentUserSelect
          control={control}
          name="toId"
          label="To"
          defaultValue=""
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default ThanksCardCreate;
