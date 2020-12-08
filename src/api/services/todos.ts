export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export const todos: ITodo[] = [
  {
    id: 1,
    title: "Walk the dog",
    completed: true,
  },
  {
    id: 2,
    title: "Mow the lawn",
    completed: false,
  },
  {
    id: 3,
    title: "Go for a coffee",
    completed: false,
  },
];
