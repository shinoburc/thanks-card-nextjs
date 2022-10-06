import { testApiHandler } from "next-test-api-route-handler";
import handler from "@/pages/api/thanks_card/index";
import type { NextApiRequest } from "next";
//import { Prisma } from "@prisma/client";

// API で認証済みかをチェックする関数 isValidToken をモックにし、
// 常に true(認証済み) を返すようにする。
jest.mock("@/utils/isValidToken", () => {
  return {
    isValidToken: jest.fn(async (req: NextApiRequest) => {
      return true;
    }),
    /*
    isValidToken: async (req: NextApiRequest) => {
      return true;
    },
    */
  };
});

describe("ThanksCard API test", () => {
  test("GET test", async () => {
    /*
    type ThanksCardPayload = Prisma.ThanksCardGetPayload<{
      include: {
        from: true;
        to: true;
      };
    }>;
    await testApiHandler<ThanksCardPayload[]>({
    */
    await testApiHandler({
      //params: { userId: 222 },
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
        });
        expect(res.status).toBe(200);
        //expect((await res.json()).length).toBe(3);
      },
    });
  });
});
