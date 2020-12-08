import { ITodo, todos } from ".";

export const allTodos = (): Promise<ITodo[]> => {
  return new Promise((resolve, reject) => {
    resolve(todos);
  });
};

export const todoById = (id: number): Promise<ITodo> => {
  return new Promise((resolve, reject) => {
    resolve(todos.filter((todo) => todo.id === id)[0]);
  });
};

export const todoByStatus = (status: string): Promise<ITodo[]> => {
  const todoStatus = status === "done" ? true : false;
  return new Promise((resolve, reject) => {
    resolve(todos.filter((todo) => todo.completed === todoStatus));
  });
};
