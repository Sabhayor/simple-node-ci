import request from "supertest";
import app from "../index.js";

describe("GET /health", () => {
  test("responds with 200 and contains status ok", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
