import { useContext, useEffect, useState, useRef } from "react";
import { TasksContext } from "../tasks/store";

export default function PomodoroTimerFun() {
    const { state, dispatch } = useContext(TasksContext)

    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    console.log([state?.TaskOne?.timeComplete, time]);
    const [S10, setS10] = useState(0)
    // const [time, setTime] = useState(state?.TaskOne?.timeComplete); // 25 minutes in seconds 
    const [mode, setMode] = useState('break'); // 'work' or 'break' 
    // const [mode, setMode] = useState('work'); // 'work' or 'break' 
    const [cycles, setCycles] = useState(0);
    let setIsRunning = (a: boolean) => dispatch({ type: "isRunning", payload: a })

    let times = {
        work: 15 * 60,
        break: 5 * 60,
        longBreak: 15 * 60,
    }
    const audioRef: any = useRef(null);
    useEffect(() => {
        let timer: any
        if (state.isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime: any) => prevTime - 1);
                setS10((prevTime: any) => {
                    if (prevTime == 0) dispatch({
                        type: "TaskOne",
                        payload: { ...state.TaskOne, timeComplete: time, totleTime: state?.TaskOne.totleTime }
                    })
                    return prevTime > 0 ? prevTime - 1 : 9
                })
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
    }, [state.isRunning, time, mode, cycles]);

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
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return {
        time: formatTime(),
        audioRef,
        mode,
        isRunning: state.isRunning,
        handleStart,
        handleStop,
        handleReset,
        S10
    }

}


