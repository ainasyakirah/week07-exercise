const MongoClient = require("mongodb").MongoClient;
const User = require("./user")


describe("User Account", () => {
  let client;
  beforeAll(async () => {
      client = await MongoClient.connect(
		  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.l8hiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true },
    );
    User.injectDB(client);
  })

  afterAll(async () => {
      await client.close();
  })

  test("New user registration", async () => {
    const res = await User.register("dibahh", "1234")
    expect(res).toBe("new user registered");
  })

  test("Duplicate username", async () => {
    const res = await User.register("dibahh", "1234")
    expect(res).toBe("username already existed");
  })

  test("User login invalid username", async () => {
    const res = await User.login("ainaa", "9876")
    expect(res).toBe("wrong username")
  })

  test("User login invalid password", async () => {
    const res = await User.login("dibahh", "1236")
    expect(res).toBe("invalid password")
  })

  test("User login successfully", async () => {
    const res = await User.login("dibahh", "1234")
    expect(res).toBe("login succesful")
  })
});