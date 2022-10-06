import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";
import React from "react";

// ログイン済みかをチェックする useSession をモックにし、
// 常にログイン済み状態で username: admin を返すようにする。
jest.mock("next-auth/react", () => {
  // Require the original module to not be mocked.
  const originalModule = jest.requireActual("next-auth/react");
  // セッションに保存する情報をモックとしてリテラルで作成する。
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      //id: "cl7ts8yvu0045ssa2e2vcrezk",
      username: "admin",
      email: "admin@ts.occ.co.jp",
    },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("Home", () => {
  it("renders a create ThanksCard Link", () => {
    render(<Home />);

    //screen.debug();
    const link = screen.getByRole("link", {
      name: /create thankscard/i,
    });

    expect(link).toBeInTheDocument();
  });
});
