import { useContext, useEffect, useState, useRef } from "react";
import { TasksContext } from "../tasks/store";
import { TaskDone } from "../tasks/taskOne";
import Icons from "./icons";
import PomodoroTimerFun from "./controle";

export default function PomodoroTimer() {
    let { time, mode, isRunning, handleStart, handleStop, handleReset, audioRef, audioRef3, S10 } = PomodoroTimerFun()
    const { state, dispatch } = useContext(TasksContext)


    return (
        <div>
            <div className={`min-w-[300px] max-w-[400px] m-auto border border-blue-600 p-4 rounded-lg py-6 top-0 ${!state.TaskOne?.title && "hidden"}`} >
                <div className="time w-44 h-44 my-4 flex items-center border-4 justify-center border-blue-600 text-blue-600 p-4 rounded-full  m-auto text-center font-bold text-5xl">
                    {time}
                </div>
                <div className="border justify-center border-blue-600 text-blue-600 p-1 rounded-full w-12 h-12  m-auto bg-white mt-[-45px]">
                    {mode === 'work' ? <Icons.Work /> : mode === 'break' ? <Icons.Break /> : <Icons.Break />}

                </div>
                {S10}
                <p className='my-8 text-center text-xl'> {state.TaskOne?.title} </p>
                {state.TaskOne && <div className=" m-auto flex justify-center *:mx-2">
                    {!isRunning
                        ? <button onClick={handleStart}  ><Icons.Start /></button>
                        : <button onClick={handleStop}><Icons.Stop /></button>
                    }
                    <TaskDone data={state.TaskOne} />
                    <button onClick={handleReset}><Icons.Reset /></button>
                </div>}
                <audio ref={audioRef} src="/audios_kichen-timer.mp3" />
                <audio ref={audioRef3} src="/audios_button-press.wav" />
            </div>
        </div>
    )
}

export function TaskRun({ data, size }: any) {
    const { state, dispatch } = useContext(TasksContext)

    function play() {
        localStorage.setItem('openTask', JSON.stringify({ ...data }))
        dispatch({ type: "TaskOne", payload: { ...data } })
        dispatch({ type: "isRunning", payload: !state.isRunning })
    }
    return (
        <div onClick={play} >
            <Icons.Play size={size || 48} />
        </div>
    )
}
