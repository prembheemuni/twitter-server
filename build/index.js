"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
async function init() {
    const app = await (0, App_1.initialiseServer)();
    app.listen(8000, () => console.log("App is running at 8000"));
}
init()
    .then(() => console.log("no error"))
    .catch((e) => console.log("opl"));
