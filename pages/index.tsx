import type { NextPage } from "next";
import React from "react";

import ThanksCardList from "./components/thanks_card/list";

const Home: NextPage = () => {
  return (
    <>
      <ThanksCardList />
    </>
  );
};

export default Home;
