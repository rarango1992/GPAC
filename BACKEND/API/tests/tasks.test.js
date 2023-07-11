const request = require("supertest");
const app = require("../app");

let token = "";

beforeAll(async () => {
  const response = await request(app).post("/backend/users/Login").send({
    name: "admin",
    password: "admin",
  });
  token = response.body.token;
});

describe("Add Task (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).post("/backend/tasks/AddTask");
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", "no valid token");
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" is required',
          path: ["userId"],
          type: "any.required",
          context: {
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" must be a string',
          path: ["userId"],
          type: "string.base",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" is not allowed to be empty',
          path: ["userId"],
          type: "string.empty",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = ".";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" must only contain alpha-numeric characters',
          path: ["userId"],
          type: "string.alphanum",
          context: {
            value: idInvalid,
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" length must be at least 24 characters long',
          path: ["userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "64a5a5b95583d70fb0928c30s";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: idInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"userId" length must be less than or equal to 24 characters long',
          path: ["userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"title" is required',
          path: ["title"],
          type: "any.required",
          context: {
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"title" must be a string',
          path: ["title"],
          type: "string.base",
          context: {
            value: titleInvalid,
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"title" is not allowed to be empty',
          path: ["title"],
          type: "string.empty",
          context: {
            value: titleInvalid,
            label: "title",
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"title" length must be less than or equal to 255 characters long',
          path: ["title"],
          type: "string.max",
          context: {
            limit: 255,
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"description" is required',
          path: ["description"],
          type: "any.required",
          context: {
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"description" must be a string',
          path: ["description"],
          type: "string.base",
          context: {
            value: descriptionInvalid,
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"description" is not allowed to be empty',
          path: ["description"],
          type: "string.empty",
          context: {
            value: descriptionInvalid,
            label: "description",
            key: "description",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is required',
          path: ["endDate"],
          type: "any.required",
          context: {
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"endDate" must be a string',
          path: ["endDate"],
          type: "string.base",
          context: {
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is not allowed to be empty',
          path: ["endDate"],
          type: "string.empty",
          context: {
            value: endDateInvalid,
            label: "endDate",
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"endDate" length must be at least 10 characters long',
          path: ["endDate"],
          type: "string.min",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Add Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10000";
    const res = await request(app)
      .post("/backend/tasks/AddTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5a5b95583d70fb0928c30",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be less than or equal to 10 characters long',
          path: ["endDate"],
          type: "string.max",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).post("/backend/tasks/SearchTasks");
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", "no valid token");
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: idInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.userId" must be a string',
          path: ["filter", "userId"],
          type: "string.base",
          context: {
            value: idInvalid,
            label: "filter.userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: idInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.userId" is not allowed to be empty',
          path: ["filter", "userId"],
          type: "string.empty",
          context: {
            value: idInvalid,
            label: "filter.userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = ".";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: idInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.userId" must only contain alpha-numeric characters',
          path: ["filter", "userId"],
          type: "string.alphanum",
          context: {
            value: idInvalid,
            label: "filter.userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: idInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.userId" length must be at least 24 characters long',
          path: ["filter", "userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "filter.userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const idInvalid = "64a5a5b95583d70fb0928c30s";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: idInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"filter.userId" length must be less than or equal to 24 characters long',
          path: ["filter", "userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "filter.userId",
            value: idInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: titleInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.title" must be a string',
          path: ["filter", "title"],
          type: "string.base",
          context: {
            value: titleInvalid,
            label: "filter.title",
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: titleInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.title" is not allowed to be empty',
          path: ["filter", "title"],
          type: "string.empty",
          context: {
            value: titleInvalid,
            label: "filter.title",
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const titleInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: titleInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"filter.title" length must be less than or equal to 255 characters long',
          path: ["filter", "title"],
          type: "string.max",
          context: {
            limit: 255,
            label: "filter.title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: descriptionInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.description" must be a string',
          path: ["filter", "description"],
          type: "string.base",
          context: {
            value: descriptionInvalid,
            label: "filter.description",
            key: "description",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const descriptionInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: descriptionInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.description" is not allowed to be empty',
          path: ["filter", "description"],
          type: "string.empty",
          context: {
            value: descriptionInvalid,
            label: "filter.description",
            key: "description",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: statusInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.status" must be a number',
          path: ["filter", "status"],
          type: "number.base",
          context: {
            value: statusInvalid,
            label: "filter.status",
            key: "status",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = 0;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: statusInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.status" must be greater than or equal to 1',
          path: ["filter", "status"],
          type: "number.min",
          context: {
            limit: 1,
            value: statusInvalid,
            label: "filter.status",
            key: "status",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const statusInvalid = 4;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: statusInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.status" must be less than or equal to 3',
          path: ["filter", "status"],
          type: "number.max",
          context: {
            limit: 3,
            value: statusInvalid,
            label: "filter.status",
            key: "status",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: priorityInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.priority" must be a number',
          path: ["filter", "priority"],
          type: "number.base",
          context: {
            value: priorityInvalid,
            label: "filter.priority",
            key: "priority",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = -1;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: priorityInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.priority" must be greater than or equal to 0',
          path: ["filter", "priority"],
          type: "number.min",
          context: {
            limit: 0,
            value: priorityInvalid,
            label: "filter.priority",
            key: "priority",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const priorityInvalid = 3;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: priorityInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.priority" must be less than or equal to 2',
          path: ["filter", "priority"],
          type: "number.max",
          context: {
            limit: 2,
            value: priorityInvalid,
            label: "filter.priority",
            key: "priority",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: textInvalid,
          },
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.tags.text" must be a string',
          path: ["filter", "tags", "text"],
          type: "string.base",
          context: {
            value: textInvalid,
            label: "filter.tags.text",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: textInvalid,
          },
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.tags.text" is not allowed to be empty',
          path: ["filter", "tags", "text"],
          type: "string.empty",
          context: {
            value: textInvalid,
            label: "filter.tags.text",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: textInvalid,
          },
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.notes.text" must be a string',
          path: ["filter", "notes", "text"],
          type: "string.base",
          context: {
            value: textInvalid,
            label: "filter.notes.text",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const textInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: textInvalid,
          },
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.notes.text" is not allowed to be empty',
          path: ["filter", "notes", "text"],
          type: "string.empty",
          context: {
            value: textInvalid,
            label: "filter.notes.text",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: endDateInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.endDate" must be a string',
          path: ["filter", "endDate"],
          type: "string.base",
          context: {
            value: endDateInvalid,
            label: "filter.endDate",
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: endDateInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.endDate" is not allowed to be empty',
          path: ["filter", "endDate"],
          type: "string.empty",
          context: {
            value: endDateInvalid,
            label: "filter.endDate",
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: endDateInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"filter.endDate" length must be at least 10 characters long',
          path: ["filter", "endDate"],
          type: "string.min",
          context: {
            limit: 10,
            value: endDateInvalid,
            label: "filter.endDate",
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const endDateInvalid = "10/10/10000";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: endDateInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"filter.endDate" length must be less than or equal to 10 characters long',
          path: ["filter", "endDate"],
          type: "string.max",
          context: {
            limit: 10,
            value: endDateInvalid,
            label: "filter.endDate",
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = false;
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: updateDateInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.updateDate" must be a string',
          path: ["filter", "updateDate"],
          type: "string.base",
          context: {
            value: updateDateInvalid,
            label: "filter.updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: updateDateInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"filter.updateDate" is not allowed to be empty',
          path: ["filter", "updateDate"],
          type: "string.empty",
          context: {
            value: updateDateInvalid,
            label: "filter.updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "10/10/10";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          updateDate: updateDateInvalid,
        },
        endDate: "10/10/2023",
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"filter.updateDate" length must be at least 10 characters long',
          path: ["filter", "updateDate"],
          type: "string.min",
          context: {
            limit: 10,
            value: updateDateInvalid,
            label: "filter.updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const updateDateInvalid = "10/10/10000";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: updateDateInvalid,
        },
        order: {
          status: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"filter.updateDate" length must be less than or equal to 10 characters long',
          path: ["filter", "updateDate"],
          type: "string.max",
          context: {
            limit: 10,
            value: updateDateInvalid,
            label: "filter.updateDate",
            key: "updateDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: "10/10/2023",
        },
        order: {
          status: orderInvalid,
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"order.status" must be one of [asc, desc]',
          path: ["order", "status"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "order.status",
            value: orderInvalid,
            key: "status",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: "10/10/2023",
        },
        order: {
          priority: orderInvalid,
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"order.priority" must be one of [asc, desc]',
          path: ["order", "priority"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "order.priority",
            value: orderInvalid,
            key: "priority",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: "10/10/2023",
        },
        order: {
          title: orderInvalid,
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"order.title" must be one of [asc, desc]',
          path: ["order", "title"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "order.title",
            value: orderInvalid,
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: "10/10/2023",
        },
        order: {
          endDate: orderInvalid,
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"order.endDate" must be one of [asc, desc]',
          path: ["order", "endDate"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "order.endDate",
            value: orderInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task (invalid)", () => {
  it("request to add new task invalid", async () => {
    const orderInvalid = "";
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: "10/10/2023",
        },
        order: {
          updateDate: orderInvalid,
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"order.updateDate" must be one of [asc, desc]',
          path: ["order", "updateDate"],
          type: "any.only",
          context: {
            valids: ["asc", "desc"],
            label: "order.updateDate",
            value: orderInvalid,
            key: "updateDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Search Task", () => {
  it("request to search for a task", async () => {
    const res = await request(app)
      .post("/backend/tasks/SearchTasks")
      .set("x-access-token", token)
      .send({
        filter: {
          userId: "64a5a590648bd50348e07e37",
          title: "test",
          description: "test",
          status: 1,
          priority: 0,
          tags: {
            text: "test",
          },
          notes: {
            text: "test",
          },
          endDate: "10/10/2023",
          updateDate: "10/10/2023",
        },
        order: {
          updateDate: "asc",
        },
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Tasks List.",
      code: 200,
    };

    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Get Task List (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).get("/backend/tasks/GetTasks");
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .get("/backend/tasks/GetTasks")
      .set("x-access-token", "no valid token");
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Task List", () => {
  it("request task list", async () => {
    const res = await request(app)
      .get("/backend/tasks/GetTasks")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Tasks List.",
      code: 200,
    };

    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Get Tasks By UserId (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).get(
      "/backend/tasks/GetTasksByUser/64a5db2384755554e46c3eb5"
    );
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .get("/backend/tasks/GetTasksByUser/64a5db2384755554e46c3eb5")
      .set("x-access-token", "no valid token")
      .send({
        password: "Hola123*",
        adminPrivileges: false,
      });
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const res = await request(app)
      .get("/backend/tasks/GetTasksByUser/1")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" length must be at least 24 characters long',
          path: ["userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "userId",
            value: "1",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const res = await request(app)
      .get("/backend/tasks/GetTasksByUser/64a5db2384755554e46c3eb5q")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"userId" length must be less than or equal to 24 characters long',
          path: ["userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "userId",
            value: "64a5db2384755554e46c3eb5q",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Tasks By UserId", () => {
  it("request to delete user", async () => {
    const res = await request(app)
      .get("/backend/tasks/GetTasksByUser/64a5db2384755554e46c3eb5")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Tasks List.",
      code: 200,
    };
    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Update Task (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).put("/backend/tasks/UpdateTask");
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", "no valid token");
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" is required',
          path: ["userId"],
          type: "any.required",
          context: {
            label: "userId",
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = false;
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" must be a string',
          path: ["userId"],
          type: "string.base",
          context: {
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = "";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" is not allowed to be empty',
          path: ["userId"],
          type: "string.empty",
          context: {
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = ".";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" must only contain alpha-numeric characters',
          path: ["userId"],
          type: "string.alphanum",
          context: {
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = "64a5db2384755554e46c3eb";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"userId" length must be at least 24 characters long',
          path: ["userId"],
          type: "string.min",
          context: {
            limit: 24,
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const userIdInvalid = "64a5db2384755554e46c3eb5a";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: userIdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"userId" length must be less than or equal to 24 characters long',
          path: ["userId"],
          type: "string.max",
          context: {
            limit: 24,
            label: "userId",
            value: userIdInvalid,
            key: "userId",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" is required',
          path: ["_id"],
          type: "any.required",
          context: {
            label: "_id",
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = false;
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" must be a string',
          path: ["_id"],
          type: "string.base",
          context: {
            label: "_id",
            value: _IdInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = "";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" is not allowed to be empty',
          path: ["_id"],
          type: "string.empty",
          context: {
            label: "_id",
            value: _IdInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = ".";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" must only contain alpha-numeric characters',
          path: ["_id"],
          type: "string.alphanum",
          context: {
            label: "_id",
            value: _IdInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = "64a5db2384755554e46c3eb";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" length must be at least 24 characters long',
          path: ["_id"],
          type: "string.min",
          context: {
            limit: 24,
            label: "_id",
            value: _IdInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const _IdInvalid = "64a5db2384755554e46c3eb5a";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: _IdInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"_id" length must be less than or equal to 24 characters long',
          path: ["_id"],
          type: "string.max",
          context: {
            limit: 24,
            label: "_id",
            value: _IdInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const titleInvalid = false;
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"title" must be a string',
          path: ["title"],
          type: "string.base",
          context: {
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const titleInvalid = "";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"title" is not allowed to be empty',
          path: ["title"],
          type: "string.empty",
          context: {
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const titleInvalid =
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: titleInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"title" length must be less than or equal to 255 characters long',
          path: ["title"],
          type: "string.max",
          context: {
            limit: 255,
            label: "title",
            value: titleInvalid,
            key: "title",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const descriptionInvalid = false;
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"description" must be a string',
          path: ["description"],
          type: "string.base",
          context: {
            label: "description",
            value: descriptionInvalid,
            key: "description",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const descriptionInvalid = "";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: descriptionInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"description" is not allowed to be empty',
          path: ["description"],
          type: "string.empty",
          context: {
            label: "description",
            value: descriptionInvalid,
            key: "description",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = false;
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"endDate" must be a string',
          path: ["endDate"],
          type: "string.base",
          context: {
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = "";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"endDate" is not allowed to be empty',
          path: ["endDate"],
          type: "string.empty",
          context: {
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = "10/10/10";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"endDate" length must be at least 10 characters long',
          path: ["endDate"],
          type: "string.min",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const endDateInvalid = "10/10/10000";
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: endDateInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"endDate" length must be less than or equal to 10 characters long',
          path: ["endDate"],
          type: "string.max",
          context: {
            limit: 10,
            label: "endDate",
            value: endDateInvalid,
            key: "endDate",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = false;
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes" must be an array',
          path: ["notes"],
          type: "array.base",
          context: {
            label: "notes",
            value: notesInvalid,
            key: "notes",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [{}];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].text" is required',
          path: ["notes", 0, "text"],
          type: "any.required",
          context: {
            label: "notes[0].text",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: false,
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].text" must be a string',
          path: ["notes", 0, "text"],
          type: "string.base",
          context: {
            label: "notes[0].text",
            value: false,
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].text" is not allowed to be empty',
          path: ["notes", 0, "text"],
          type: "string.empty",
          context: {
            label: "notes[0].text",
            value: "",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" is required',
          path: ["notes", 0, "date"],
          type: "any.required",
          context: {
            label: "notes[0].date",
            key: "date",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: false,
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" must be a string',
          path: ["notes", 0, "date"],
          type: "string.base",
          context: {
            label: "notes[0].date",
            value: false,
            key: "date",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" is not allowed to be empty',
          path: ["notes", 0, "date"],
          type: "string.empty",
          context: {
            label: "notes[0].date",
            value: "",
            key: "date",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: "10/10/10",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"notes[0].date" length must be at least 10 characters long',
          path: ["notes", 0, "date"],
          type: "string.min",
          context: {
            limit: 10,
            value: "10/10/10",
            label: "notes[0].date",
            key: "date",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const notesInvalid = [
      {
        text: "test",
        date: "10/10/10000",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: notesInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"notes[0].date" length must be less than or equal to 10 characters long',
          path: ["notes", 0, "date"],
          type: "string.max",
          context: {
            limit: 10,
            value: "10/10/10000",
            label: "notes[0].date",
            key: "date",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = false;
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"tags" must be an array',
          path: ["tags"],
          type: "array.base",
          context: {
            label: "tags",
            value: tagsInvalid,
            key: "tags",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [{}];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].text" is required',
          path: ["tags", 0, "text"],
          type: "any.required",
          context: {
            label: "tags[0].text",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: false,
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].text" must be a string',
          path: ["tags", 0, "text"],
          type: "string.base",
          context: {
            label: "tags[0].text",
            value: false,
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].text" is not allowed to be empty',
          path: ["tags", 0, "text"],
          type: "string.empty",
          context: {
            label: "tags[0].text",
            value: "",
            key: "text",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: "test",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"tags[0].color" is required',
          path: ["tags", 0, "color"],
          type: "any.required",
          context: {
            label: "tags[0].color",
            key: "color",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task (invalid)", () => {
  it("request to Update new task invalid", async () => {
    const tagsInvalid = [
      {
        text: "test",
        color: "",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"tags[0].color" must be one of [primary, secondary, danger, warning, success, info, dark, light, white, muted]',
          path: ["tags", 0, "color"],
          type: "any.only",
          context: {
            valids: [
              "primary",
              "secondary",
              "danger",
              "warning",
              "success",
              "info",
              "dark",
              "light",
              "white",
              "muted",
            ],
            label: "tags[0].color",
            value: "",
            key: "color",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Update Task", () => {
  it("request to Update a task", async () => {
    const tagsInvalid = [
      {
        text: "test",
        color: "success",
      },
    ];
    const res = await request(app)
      .put("/backend/tasks/UpdateTask")
      .set("x-access-token", token)
      .send({
        userId: "64a5db2384755554e46c3eb5",
        _id: "64a5dbd93f7c7305c83843f4",
        title: "test",
        description: "test",
        endDate: "10/10/2023",
        notes: [
          {
            text: "test",
            date: "10/10/2023",
          },
        ],
        tags: tagsInvalid,
      });
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Task updated in DB.",
      code: 200,
    };
    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});

describe("Delete Task (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).delete("/backend/tasks/DeleteTask");
    expect(res.statusCode).toEqual(403);
    const expectedResult = {
      data: {},
      msg: "A token is required for authentication.",
      code: 2,
      token: undefined,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete Task (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .delete("/backend/tasks/DeleteTask")
      .set("x-access-token", "no valid token")
      .send({
        password: "Hola123*",
        adminPrivileges: false,
      });
    expect(res.statusCode).toEqual(401);
    const expectedResult = {
      data: {},
      msg: "Invalid Token.",
      code: 2,
      token: "no valid token",
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const res = await request(app)
      .delete("/backend/tasks/DeleteTask")
      .set("x-access-token", token);

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" is required',
          path: ["_id"],
          type: "any.required",
          context: {
            label: "_id",
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = false;
    const res = await request(app)
      .delete("/backend/tasks/DeleteTask")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" must be a string',
          path: ["_id"],
          type: "string.base",
          context: {
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "";
    const res = await request(app)
      .delete("/backend/tasks/DeleteTask")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" is not allowed to be empty',
          path: ["_id"],
          type: "string.empty",
          context: {
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "1";
    const res = await request(app)
      .delete("/backend/tasks/DeleteTask")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"_id" length must be at least 24 characters long',
          path: ["_id"],
          type: "string.min",
          context: {
            limit: 24,
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete Task (task invalid)", () => {
  it("request to delete which is invalid", async () => {
    const idInvalid = "64a5a590648bd50348e07e37q";
    const res = await request(app)
      .delete("/backend/tasks/DeleteTask")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message:
            '"_id" length must be less than or equal to 24 characters long',
          path: ["_id"],
          type: "string.max",
          context: {
            limit: 24,
            label: "_id",
            value: idInvalid,
            key: "_id",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };

    expect(res.body).toEqual(expectedResult);
  });
});

describe("Delete Task", () => {
  it("request to delete user", async () => {
    const idInvalid = "64ac817182ac043f20b5f79a";
    const res = await request(app)
      .delete("/backend/tasks/DeleteTask")
      .set("x-access-token", token)
      .send({
        _id: idInvalid,
      });

    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      msg: "Task not found in DB.",
      code: 10,
    };
    expect(res.body).toHaveProperty("data");
    expect(res.body).toMatchObject(expectedResult);
  });
});
