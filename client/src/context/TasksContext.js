import { createContext } from "react";
import { useContext } from "react";

export const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);