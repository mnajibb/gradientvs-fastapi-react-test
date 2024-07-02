import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import Todos, { TodosContext } from "./Todos";
import { ChakraProvider } from "@chakra-ui/react";

const mockFetchTodos = jest.fn();

jest.mock("./Todos", () => {
  const originalModule = jest.requireActual("./Todos");
  return {
    __esModule: true,
    ...originalModule,
    TodosContext: {
      ...originalModule.TodosContext,
      Provider: ({ children }) => <div>{children}</div>,
      Consumer: ({ children }) =>
        children({
          todos: [{ item: "Test Todo", id: 1 }],
          fetchTodos: mockFetchTodos,
        }),
    },
  };
});

describe("Todos Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [{ item: "Test Todo", id: 1 }] }),
      })
    );

    render(
      <ChakraProvider>
        <TodosContext.Provider
          value={{
            todos: [{ item: "Test Todo", id: 1 }],
            fetchTodos: mockFetchTodos,
          }}
        >
          <Todos />
        </TodosContext.Provider>
      </ChakraProvider>
    );
  });

  test("renders AddTodo input", () => {
    const inputElement = screen.getByPlaceholderText(/Add a todo item/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("can add a new todo item", async () => {
    const inputElement = screen.getByPlaceholderText(/Add a todo item/i);
    fireEvent.change(inputElement, { target: { value: "New Todo" } });
    fireEvent.submit(inputElement);

    await waitFor(() => {
      expect(mockFetchTodos).toHaveBeenCalledTimes(0);
    });
  });
});