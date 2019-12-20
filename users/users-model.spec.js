const Users = require("./users-model");
const db = require("../database/dbConfig");
const person = [
  { username: "sam", password: "IAmsam" },
  { username: "frodo", password: "ring" },
  { username: "sam2", password: "IAmsam" },
  { username: "frodo2", password: "ring" },
  { username: "sam3", password: "IAmsam" },
  { username: "frodo3", password: "ring" }
];
describe("users-model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("add()", function() {
    it("should add user to database", async function() {
      await Users.add(person[0]);

      const userCount = await db("users");
      expect(userCount).toHaveLength(1);
    });

    it("should have an id", async function() {
      await Users.add(person[1]);

      const users = await db("users");
      expect(users[0].id).toBeDefined();
      expect(users[0].id).toBe(1);
    });
  });

  describe("find()", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should return users", async function() {
      await Users.add(person[1]);
      await Users.add(person[2]);
      await Users.find().then(res => {
        expect(res.length).toBe(2);
        expect(res[0].username).toBe("frodo");
        expect(res[1].username).toBe("sam2");
      });
    });
  });

  describe("findById()", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should return the correct user to match the id given", async function() {
      await Users.add(person[0]);
      await Users.add(person[1]);
      await Users.add(person[2]);
      await Users.add(person[3]);

      await Users.findById(1).then(res => {
        expect(res.username).toBe("sam");
      });
      await Users.findById(3).then(res => {
        expect(res.username).toBe("sam2");
      });
    });
  });
});
