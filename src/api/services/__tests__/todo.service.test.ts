import { ITodo, allTodos } from "../";
import { todoById, todoByStatus } from "../";

const dummyTodo: ITodo = {
  id: 1,
  title: "Walk the dog",
  completed: true,
};

describe("Todo Service", () => {
  it("should return all todos", async () => {
    const todos = await allTodos();
    expect(todos.length).toEqual(3);
    expect(todos[0]).toMatchObject(dummyTodo);
  });

  it("should return a todo by id -> [id: 1]", async () => {
    const todo = await todoById(1);
    expect(todo).toBeDefined();
    expect(todo.id).toEqual(1);
    expect(todo).toMatchObject(dummyTodo);
  });

  it("should return todo(s) by status -> [status: done]", async () => {
    const todos = await todoByStatus("done");
    expect(todos).toBeDefined();
    expect(todos.length).toBeGreaterThan(0);
    expect(todos[0].completed).toBeTruthy();
  });

  it("should return todo(s) by status -> [status: pending]", async () => {
    const todos = await todoByStatus("pending");
    expect(todos).toBeDefined();
    expect(todos.length).toBeGreaterThan(0);
    expect(todos[0].completed).toBeFalsy();
  });
});
