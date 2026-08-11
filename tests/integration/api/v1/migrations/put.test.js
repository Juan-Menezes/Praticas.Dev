import database from "infra/database.js";

test("POST to api/v1/migrations should return 405", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  expect(response1.status).toBe(405);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  expect(response1.status).toBe(405);

  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnections = parseInt(openedConnectionsResult.rows[0].count);

  expect(openedConnections).toBe(1);
});
