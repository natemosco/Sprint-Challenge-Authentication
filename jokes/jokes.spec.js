const request = require("supertest");
const server = require("../api/server");

describe("jokes-router", function() {
  describe("GET /", function() {
    it("should call a GET method for type of request", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.req.method).toBe("GET");
          expect(res.req.method).not.toBe("POST");
        });
    });

    it("should return a 200 status on successful fetch", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
