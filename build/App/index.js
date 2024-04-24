"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiseServer = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
async function initialiseServer() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const graphqlServer = new server_1.ApolloServer({
        typeDefs: `
          type Query {
              sayHello : String
          }
          `,
        resolvers: {
            Query: {
                sayHello: () => "Hello from graph Ql",
            },
        },
    });
    await graphqlServer.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(graphqlServer));
    return app;
}
exports.initialiseServer = initialiseServer;
