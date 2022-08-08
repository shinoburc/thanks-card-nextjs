import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import Button from "@mui/material/Button";

import useSWR from "swr";
import { Prisma } from "@prisma/client";

/* ライブラリ Material-UI が提供するコンポーネントの import */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

/* icons */
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const UserList: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  /* User の外部キー(role)も含んだ型を定義している */
  type UserPayload = Prisma.UserGetPayload<{
    include: {
      role: true;
      department: true;
    };
  }>;
  /* SWR を使用して /api/user からデータを取得し、 users 配列で受け取る */
  const { data: users, error } = useSWR<UserPayload[]>("/api/user", fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <>
      <Link href="/user/create" passHref>
        <Button variant="contained" color="primary">
          <PersonAddIcon /> Create User
        </Button>
      </Link>
      <div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>role</TableCell>
              <TableCell>department</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* thanks_cards 全件をテーブル出力する */}
            {users?.map((user: UserPayload) => {
              return (
                /* 一覧系の更新箇所を特定するために一意となる key を設定する必要がある */
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                  <TableCell>{user.department.name}</TableCell>
                  <TableCell>
                    <Link href="/user/edit" passHref>
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href="/user/delete" passHref>
                      <Button variant="contained" color="warning">
                        Delete
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserList;
