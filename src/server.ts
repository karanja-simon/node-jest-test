import app from "./app";

const PORT: number | string = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
