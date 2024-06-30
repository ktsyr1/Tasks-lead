"use client"
import { useEffect, useReducer } from "react";
import { TaskInitialState, TasksContext, TasksReducer } from "./store";
import AddTask from "./addTask";
import { ListTask } from "./listTasks";
import PomodoroTimer from "../time/timer";

export default function TasksPage() {

    const [state, dispatch] = useReducer(TasksReducer, TaskInitialState)
    useEffect(() => {

        let payload = localStorage.getItem('openTask');
        payload = payload ? JSON.parse(payload) : TaskInitialState
        dispatch({ type: "TaskOne", payload })
    }, [])
    return (
        <TasksContext.Provider value={{ state, dispatch }}>

            <main className="flex flex-row flex-wrap items-start md:p-24 p-4 max-w-[1100px] m-auto md:justify-between justify-center ">
                <div className="max-w-[450px]  w-full flex flex-col">
                    <AddTask />
                    <ListTask />
                </div>
                <PomodoroTimer />

            </main>
        </TasksContext.Provider>
    );
}
