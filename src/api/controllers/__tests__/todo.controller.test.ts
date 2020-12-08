import request from "supertest";

import app from "../../../app";
import { ITodo } from "../../services";

const dummyTodo: ITodo = {
  id: 1,
  title: "Walk the dog",
  completed: true,
};

beforeAll(() => {});

describe("Todo Controller", () => {
  it("should get all todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.success).toBeTruthy();
    expect(res.body.todos).toBeDefined();
    expect(res.body.todos.length).toEqual(3);
  });

  it("should get a todo by id -> [id: 1]", async () => {
    const res = await request(app).get("/api/todo/1");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.success).toBeTruthy();
    expect(res.body.todo).toBeDefined();
    expect(res.body.todo).toMatchObject(dummyTodo);
  });

  it("should get todos by status -> [status: 'done']", async () => {
    const res = await request(app).get("/api/todos/done");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.success).toBeTruthy();
    expect(res.body.todos).toBeDefined();
    expect(res.body.todos.length).toBeGreaterThan(0);
  });

  it("should get todos by status -> [status: 'pending']", async () => {
    const res = await request(app).get("/api/todos/pending");
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.success).toBeTruthy();
    expect(res.body.todos).toBeDefined();
    expect(res.body.todos.length).toBeGreaterThan(0);
  });

  it("should return a 404 with an error message if id in not numeric [id: abc]", async () => {
    const res = await request(app).get("/api/todo/abc");
    expect(res.status).toEqual(400);
    expect(res.body).toBeDefined();
    expect(res.body.success).toBeFalsy();
    expect(res.body).toMatchObject({
      success: false,
      errors: [
        {
          value: expect.any(String),
          msg: "Todo id should be numeric",
          param: "id",
          location: "params",
        },
      ],
    });
  });

  it("should return a 404 with an error message if status is neither 'done' or 'pending' [status: waiting]", async () => {
    const res = await request(app).get("/api/todos/waiting");
    expect(res.status).toEqual(400);
    expect(res.body).toBeDefined();
    expect(res.body.success).toBeFalsy();
    expect(res.body).toMatchObject({
      success: false,
      errors: [
        {
          value: expect.any(String),
          msg: "Status should be either 'done' or 'pending'",
          param: "status",
          location: "params",
        },
      ],
    });
  });
});
