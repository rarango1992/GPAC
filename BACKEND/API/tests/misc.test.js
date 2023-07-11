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

describe("Get Priority (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).get("/backend/misc/GetPriorityByCode/0");
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

describe("Get Priority (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .get("/backend/misc/GetPriorityByCode/0")
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

describe("Get Priority (invalid)", () => {
  it("request priority value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetPriorityByCode/h")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"code" must be a number',
          path: ["code"],
          type: "number.base",
          context: {
            label: "code",
            value: "h",
            key: "code",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Priority (invalid)", () => {
  it("request priority value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetPriorityByCode/-1")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"code" must be greater than or equal to 0',
          path: ["code"],
          type: "number.min",
          context: {
            limit: 0,
            label: "code",
            value: -1,
            key: "code",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Priority (invalid)", () => {
  it("request priority value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetPriorityByCode/5")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"code" must be less than or equal to 2',
          path: ["code"],
          type: "number.max",
          context: {
            limit: 2,
            label: "code",
            value: 5,
            key: "code",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Priority", () => {
  it("request priority value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetPriorityByCode/0")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: {
        _id: "64a93257295efa1a08d0acbc",
        level: 0,
        title: "High",
      },
      msg: "Priority Title.",
      code: 200,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Status (No Token)", () => {
  it("request with out token", async () => {
    const res = await request(app).get("/backend/misc/GetStatusByCode/1");
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

describe("Get Status (No Valid Token)", () => {
  it("request with out token", async () => {
    const res = await request(app)
      .get("/backend/misc/GetStatusByCode/1")
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

describe("Get Status (invalid)", () => {
  it("request priority value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetStatusByCode/h")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"code" must be a number',
          path: ["code"],
          type: "number.base",
          context: {
            label: "code",
            value: "h",
            key: "code",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Status (invalid)", () => {
  it("request priority value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetStatusByCode/-1")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"code" must be greater than or equal to 1',
          path: ["code"],
          type: "number.min",
          context: {
            limit: 1,
            label: "code",
            value: -1,
            key: "code",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Status (invalid)", () => {
  it("request priority value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetStatusByCode/5")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: [
        {
          message: '"code" must be less than or equal to 3',
          path: ["code"],
          type: "number.max",
          context: {
            limit: 3,
            label: "code",
            value: 5,
            key: "code",
          },
        },
      ],
      msg: "API Error.",
      code: 3,
    };
    expect(res.body).toEqual(expectedResult);
  });
});

describe("Get Status", () => {
  it("request status value", async () => {
    const res = await request(app)
      .get("/backend/misc/GetStatusByCode/1")
      .set("x-access-token", token);
    expect(res.statusCode).toEqual(200);
    const expectedResult = {
      data: {
        _id: "64a5d36331f21327aca6ab07",
        code: 1,
        title: "New",
      },
      msg: "Status Title.",
      code: 200,
    };
    expect(res.body).toEqual(expectedResult);
  });
});
