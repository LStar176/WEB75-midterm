import { authentication } from "../middleware/auth.middle.js";

import { bonusRouter } from "./bonus.route.js";
import { jobRouter } from "./job.route.js";
import { userRouter } from "./user.route.js";
import { userInfoRouter } from "./userInfo.route.js";

const routes = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/userinfo",
    router: userInfoRouter,
  },
  {
    path: "/job",
    router: jobRouter,
  },
  {
    path: "/moreinfo",
    router: bonusRouter,
  },
];

export const routerFacroty = (server) => {
  routes.map((route) => {
      server.use(route.path, route.router);
  });
};
