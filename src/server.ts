import app from "./app";

const address = "http://127.0.0.1:3000";

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
