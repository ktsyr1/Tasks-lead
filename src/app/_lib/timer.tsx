import { useContext, useEffect, useState, useRef } from "react";
import { TasksContext } from "./store";
import { TaskDone } from "./task";

export default function PomodoroTimer() {
    let { time, mode, isRunning, handleStart, handleStop, handleReset, audioRef } = PomodoroTimerFun()
    const { state, dispatch } = useContext(TasksContext)


    return (
        <div>
            <div className="min-w-[300px] max-w-[400px] m-auto border border-blue-600 p-4 rounded-lg py-6 top-0" >
                <div className="time w-44 h-44 my-4 flex items-center border-4 justify-center border-blue-600 text-blue-600 p-4 rounded-full  m-auto text-center font-bold text-5xl">
                    {time}
                </div>
                <div className="border justify-center border-blue-600 text-blue-600 p-1 rounded-full w-12 h-12 m-auto bg-white mt-[-45px]">
                    {mode === 'work' ? <Work /> : mode === 'break' ? 'الاستراحة' : 'استراحة طويلة'}

                </div>
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
            </div>
        </div>
    )
}
let Icons = {
    Start: () => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"                        >
            <path d="M18.18 34.2L34.2 24L18.18 13.8V34.2ZM24 48C20.72 48 17.62 47.37 14.7 46.11C11.78 44.85 9.23 43.13 7.05 40.95C4.87 38.77 3.15 36.22 1.89 33.3C0.63 30.38 0 27.28 0 24C0 20.72 0.63 17.62 1.89 14.7C3.15 11.78 4.87 9.23 7.05 7.05C9.23 4.87 11.78 3.15 14.7 1.89C17.62 0.63 20.72 0 24 0C27.28 0 30.38 0.63 33.3 1.89C36.22 3.15 38.77 4.87 40.95 7.05C43.13 9.23 44.85 11.78 46.11 14.7C47.37 17.62 48 20.72 48 24C48 27.28 47.37 30.38 46.11 33.3C44.85 36.22 43.13 38.77 40.95 40.95C38.77 43.13 36.22 44.85 33.3 46.11C30.38 47.37 27.28 48 24 48ZM24 44.4C29.6 44.4 34.4 42.4 38.4 38.4C42.4 34.4 44.4 29.6 44.4 24C44.4 18.4 42.4 13.6 38.4 9.6C34.4 5.6 29.6 3.6 24 3.6C18.4 3.6 13.6 5.6 9.6 9.6C5.6 13.6 3.6 18.4 3.6 24C3.6 29.6 5.6 34.4 9.6 38.4C13.6 42.4 18.4 44.4 24 44.4Z" fill="#323238" />
        </svg>
    ),
    Stop: () => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"            >
            <path d="M24 48C20.6 48 17.44 47.39 14.52 46.17C11.6 44.95 9.06 43.26 6.9 41.1C4.74 38.94 3.05 36.4 1.83 33.48C0.610002 30.56 0 27.4 0 24C0 20.64 0.610002 17.5 1.83 14.58C3.05 11.66 4.74 9.12 6.9 6.96C9.06 4.8 11.6 3.1 14.52 1.86C17.44 0.62 20.6 0 24 0C27.36 0 30.5 0.62 33.42 1.86C36.34 3.1 38.88 4.8 41.04 6.96C43.2 9.12 44.9 11.66 46.14 14.58C47.38 17.5 48 20.64 48 24C48 27.4 47.38 30.56 46.14 33.48C44.9 36.4 43.2 38.94 41.04 41.1C38.88 43.26 36.34 44.95 33.42 46.17C30.5 47.39 27.36 48 24 48ZM24 44.4C29.8 44.4 34.65 42.45 38.55 38.55C42.45 34.65 44.4 29.8 44.4 24C44.4 18.2 42.45 13.35 38.55 9.45C34.65 5.55 29.8 3.6 24 3.6C18.2 3.6 13.35 5.55 9.45 9.45C5.55 13.35 3.6 18.2 3.6 24C3.6 29.8 5.55 34.65 9.45 38.55C13.35 42.45 18.2 44.4 24 44.4Z" fill="#323238" />
            <path d="M27 16.5C27 19.5 27 28 27 31C27 34 30.5 34 30.5 31C30.5 28 30.5 19.5 30.5 16.5C30.5 13.5 27 13.5 27 16.5Z" fill="#323238" />
            <path d="M27 16.5C27 19.5 27 28 27 31C27 34 30.5 34 30.5 31C30.5 28 30.5 19.5 30.5 16.5C30.5 13.5 27 13.5 27 16.5Z" fill="#323238" />
            <path d="M17.5 16.5C17.5 19.5 17.5 28 17.5 31C17.5 34 21 34 21 31C21 28 21 19.5 21 16.5C21 13.5 17.5 13.5 17.5 16.5Z" fill="#323238" />
            <path d="M17.5 16.5C17.5 19.5 17.5 28 17.5 31C17.5 34 21 34 21 31C21 28 21 19.5 21 16.5C21 13.5 17.5 13.5 17.5 16.5Z" fill="#323238" />
        </svg>
    ),
    Reset: () => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M24 48C20.6 48 17.44 47.39 14.52 46.17C11.6 44.95 9.06 43.26 6.9 41.1C4.74 38.94 3.05 36.4 1.83 33.48C0.61 30.56 0 27.4 0 24C0 20.64 0.61 17.5 1.83 14.58C3.05 11.66 4.74 9.12 6.9 6.96C9.06 4.8 11.6 3.1 14.52 1.86C17.44 0.62 20.6 0 24 0C27.36 0 30.5 0.62 33.42 1.86C36.34 3.1 38.88 4.8 41.04 6.96C43.2 9.12 44.9 11.66 46.14 14.58C47.38 17.5 48 20.64 48 24C48 27.4 47.38 30.56 46.14 33.48C44.9 36.4 43.2 38.94 41.04 41.1C38.88 43.26 36.34 44.95 33.42 46.17C30.5 47.39 27.36 48 24 48ZM24 44.4C29.8 44.4 34.65 42.45 38.55 38.55C42.45 34.65 44.4 29.8 44.4 24C44.4 18.2 42.45 13.35 38.55 9.45C34.65 5.55 29.8 3.6 24 3.6C18.2 3.6 13.35 5.55 9.45 9.45C5.55 13.35 3.6 18.2 3.6 24C3.6 29.8 5.55 34.65 9.45 38.55C13.35 42.45 18.2 44.4 24 44.4ZM15 33H33V15H15V33Z" fill="#323238" />
        </svg>
    )
}


export function PomodoroTimerFun() {
    const { state, dispatch } = useContext(TasksContext)
    console.log({ time: state?.TaskOne?.timeComplete });

    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    // const [time, setTime] = useState(state?.TaskOne?.timeComplete); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' or 'break'
    // const [mode, setMode] = useState('break'); // 'work' or 'break'
    const [cycles, setCycles] = useState(0);

    const audioRef: any = useRef(null);
    useEffect(() => {
        let timer: any
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime: any) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            if (audioRef.current) audioRef.current?.play(); // تشغيل الصوت عند انتهاء الوقت

            if (mode === 'work') {
                if (cycles === 3) {
                    setTime(15 * 60); // 15 minutes break after 4 work sessions
                    setMode('longBreak');
                    setIsRunning(false);
                    setCycles(0);
                } else {
                    setTime(5 * 60); // 5 minutes break
                    setMode('break');
                    setIsRunning(false);
                }
            } else {
                setTime(25 * 60); // Reset to 25 minutes work
                setMode('work');
                setIsRunning(false);

                if (mode !== 'longBreak') {
                    setCycles(prevCycles => prevCycles + 1);
                }
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, time, mode, cycles]);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        // setIsRunning(false);
        // setTime(25 * 60);
        // setMode('work');
        // setCycles(0);
    };

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        console.log({ time, minutes, seconds });
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return {
        time: formatTime(),
        audioRef,
        mode,
        isRunning,
        handleStart,
        handleStop,
        handleReset,
    }

}



export function TaskRun({ data, size }: any) {
    const { state, dispatch } = useContext(TasksContext)

    function play() {
        localStorage.setItem('openTask', JSON.stringify({ ...data }))
        dispatch({ type: "TaskOne", payload: { ...data } })
    }
    return (
        <div onClick={play} >
            <IconPlay size={size || 48} />
        </div>
    )
}
function IconPlay({ size = 30 }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} className=" hover:*:stroke-blue-700 ">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" className=" hover:*:stroke-blue-700 stroke-black"></circle>
            <path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke="#1C274C" className=" hover:*:stroke-blue-700 stroke-black " strokeWidth="1.5"></path>
        </svg>
    )
}
export function Work({ size, color, className, style }: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M2.80408 15.4771C2.80408 15.4771 2.94608 17.2151 2.97908 17.7631C3.02308 18.4981 3.30708 19.3191 3.78108 19.8891C4.45008 20.6971 5.23808 20.9821 6.29008 20.9841C7.52708 20.9861 16.5221 20.9861 17.7591 20.9841C18.8111 20.9821 19.5991 20.6971 20.2681 19.8891C20.7421 19.3191 21.0261 18.4981 21.0711 17.7631C21.1031 17.2151 21.2451 15.4771 21.2451 15.4771" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8.49597 5.32949V4.95849C8.49597 3.73849 9.48397 2.75049 10.704 2.75049H13.286C14.505 2.75049 15.494 3.73849 15.494 4.95849L15.495 5.32949" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11.995 16.6783V15.3843" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path fillRule="evenodd" clipRule="evenodd" d="M2.74988 8.38905V11.8561C4.66788 13.1211 6.96588 14.0071 9.48788 14.3581C9.78988 13.2571 10.7829 12.4501 11.9899 12.4501C13.1779 12.4501 14.1909 13.2571 14.4729 14.3681C17.0049 14.0171 19.3119 13.1311 21.2399 11.8561V8.38905C21.2399 6.69505 19.8769 5.33105 18.1829 5.33105H5.81688C4.12288 5.33105 2.74988 6.69505 2.74988 8.38905Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>)
}