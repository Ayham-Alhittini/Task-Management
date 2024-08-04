import { createContext } from "react";
import { useContext } from "react";

export const SelectedTaskContext = createContext();
export const useSelectedTask = () => useContext(SelectedTaskContext);