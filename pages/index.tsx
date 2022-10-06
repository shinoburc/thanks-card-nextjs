import type { NextPage } from "next";
import React from "react";
import { useSession } from "next-auth/react";

import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import ThanksCardList from "@/components/thanks_card/list";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Link href="/thanks_card/create" passHref>
        <Button variant="contained" color="primary">
          <AddIcon />
          Create ThanksCard
        </Button>
      </Link>
      <ThanksCardList toId={session?.user?.id} />
    </>
  );
};

export default Home;
