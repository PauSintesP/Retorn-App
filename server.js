import { createRequestHandler } from "@react-router/express";
import { installGlobals } from "@react-router/node";

installGlobals();

export default createRequestHandler({
  build: () => import("./build/server/index.js"),
});
