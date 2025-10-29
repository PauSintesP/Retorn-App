import { createRequestHandler } from "@react-router/express";
import express from "express";

// Importar el build del servidor
const build = await import("../build/server/index.js");

const app = express();

// Servir archivos estáticos
app.use(express.static("build/client", { immutable: true, maxAge: "1y" }));

// Handler de React Router
app.all("*", createRequestHandler({ build }));

export default app;
