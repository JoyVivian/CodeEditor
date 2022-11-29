import express from "express";
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
} from "http-proxy-middleware";

import path from "path";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  if (useProxy) {
    // Proxy to `http://localhost:3000`
    // http://localhost:3000 is not working.
    // Code for development environment.
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:3000",
        ws: true,
        //   logLevel: "silent",
      })
    );
    console.log(useProxy);
  } else {
    // Code for production environment.
    const packagePath = require.resolve("local-client/build/index.html");
    app.use(express.static(path.dirname(packagePath)));
    console.log(useProxy);
  }

  // If successfully start up the server and everything is as expected, call the `resolve` function.
  // If not successfully, call the reject function.
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
