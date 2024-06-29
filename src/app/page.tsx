"use client"
import { useEffect, useReducer } from "react";
import { DBtask } from "./_lib/dataCenter";
import { AddTask, ListTask } from "./_lib/task";
import PomodoroTimer from "./_lib/timer";
import { createContext } from 'react';
import { TaskInitialState, TasksContext, TasksReducer } from "./_lib/store";

export default function Home() {

    const [state, dispatch] = useReducer(TasksReducer, TaskInitialState)
    useEffect(() => {
        DBtask.find()

        let payload = localStorage.getItem('openTask');
        payload = payload ? JSON.parse(payload) : TaskInitialState
        dispatch({ type: "TaskOne", payload })
    }, [])
    return (
        <TasksContext.Provider value={{ state, dispatch }}>

            <main className="flex flex-row flex-wrap items-start justify-center p-24 max-w-[1100px] m-auto ">
                <div className="max-w-[450px]  w-full flex flex-col">
                    <AddTask />
                    <ListTask />
                </div>
                <PomodoroTimer />

            </main>
        </TasksContext.Provider>
    );
}
