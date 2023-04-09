import React, { useReducer, useEffect } from "react";
import ToDoList from "./component/ToDoList";
import { NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const todosInitialState = {
  todos: [
    // { id: "1", text: "finishing writing hooks chapter" },
    // { id: "2", text: "prepare lecture" },
    // { id: "3", text: "upload code on GitHub" },
  ],
};

export const TodosContext = React.createContext();

export default function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);

  // Load todos from AsyncStorage when the component mounts
  useEffect(() => {
    async function loadTodos() {
      try {
        const todosString = await AsyncStorage.getItem("todos");
        if (todosString !== null) {
          const todos = JSON.parse(todosString);
          dispatch({ type: "set", payload: todos });
        }
      } catch (error) {
        console.error("Failed to load todos from AsyncStorage", error);
      }
    }
    loadTodos();
  }, []);

  // Save todos to AsyncStorage whenever the todos state changes
  useEffect(() => {
    async function saveTodos() {
      try {
        const todosString = JSON.stringify(state.todos);
        await AsyncStorage.setItem("todos", todosString);
      } catch (error) {
        console.error("Failed to save todos to AsyncStorage", error);
      }
    }
    saveTodos();
  }, [state.todos]);

  return (
    <NativeBaseProvider>
      <TodosContext.Provider value={{ state, dispatch }}>
        <ToDoList />
      </TodosContext.Provider>
    </NativeBaseProvider>
  );
}

function todosReducer(state, action) {
  switch (action.type) {
    case "set":
      // set todos from AsyncStorage
      return { ...state, todos: action.payload };
    case "add":
      // add new todo onto array
      const addedToDos = [...state.todos, action.payload];
      // spread our state and assign todos
      return { ...state, todos: addedToDos };
    case "edit":
      const updatedToDo = { ...action.payload };
      const updatedToDoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ];
      return { ...state, todos: updatedToDos };
    case "delete":
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };
    default:
      return todosInitialState;
  }
}
