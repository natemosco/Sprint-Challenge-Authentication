const Users = require("./users-model");
const db = require("../database/dbConfig");

describe("users-model", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("add()", function() {
    it("should add user to database", async function() {
      await Users.add({ username: "Sam", password: "IAmSam" });

      const userCount = await db("users");
      expect(userCount).toHaveLength(1);
    });
  });
});
