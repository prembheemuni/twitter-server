import { initialiseServer } from "./App";

async function init() {
  const app = await initialiseServer();
  app.listen(8000, () => console.log("App is running at 8000"));
}

init()
  .then(() => console.log("no error"))
  .catch((e) => console.log("opl", e));
