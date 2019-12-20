const request = require("supertest");
const server = require("./server");

describe("server.js tests", function() {
  describe("GET /", function() {
    it("should return a 200 status", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a working message", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.message).toBe("server is working");
        });
    });
  });
});
