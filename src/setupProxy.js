// eslint-disable-next-line
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("use http -proxy");
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "http://192.168.2.2:8080",
      changeOrigin: true,
    })
  );
};
