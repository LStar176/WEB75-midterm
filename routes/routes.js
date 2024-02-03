import { userRouter } from "./user.route.js";

const routes = [
  {
    path: "/user",
    router: userRouter,
  },
];

export const serverRouter = (server) => {
  routes.map((route) => {
    server.use(route.path, /* middlewares , */ route.router);
  });
};
