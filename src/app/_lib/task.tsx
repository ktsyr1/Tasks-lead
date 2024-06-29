import { useContext, useEffect, useState } from "react";
import { DBtask } from "./dataCenter";
import { TaskOneType } from "../_types";
import { TasksContext } from "./store";
import { TaskRun } from "./timer";

export function AddTask() {
    let [one, setOne] = useState("")
    const { state, dispatch } = useContext(TasksContext)

    let Send = (e: any) => {
        e.preventDefault();
        let arr = [...state.TaskList]
        one.split(/[\n,]/).map(async (text: string) => {
            text = text.trim()
            if (text != "") {
                let data = DBtask.create({ title: text, timeComplete: 25 * 60, totleTime: 0 })
                arr.push(data)
            }
        })
        dispatch({ type: "TaskList", payload: arr })
        setOne('')
    }
    const handleChange = (e: any) => {
        setOne(e.target.value);
    };
    return (
        <form onSubmit={Send} className="max-w-[500px] mx-auto w-full flex flex-row"  >
            <textarea
                onChange={handleChange}
                value={one}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required
            />
            <div
                onClick={Send}
                className="text-white mx-4 bg-blue-700 hover:bg-blue-800 font-bold text-2xl rounded-lg  sm:w-auto px-5 py-2.5 text-center w-12 h-12 "
            >+</div>
        </form>

    )
}
export function ListTask() {
    const { state, dispatch } = useContext(TasksContext)
    let [complete, setComplete] = useState<any>(false)
    useEffect(() => {
        let res: TaskOneType[] = DBtask.find()

        if (res?.length == 0) {
            "المهمة الاولى,اتمام اول مهمة, تشغيل اول مهمة".split(/[\n,]/).map(async (text: string) => {
                text = text.trim()
                if (text != "") {
                    let data = DBtask.create({ title: text, timeComplete: 25 * 60, totleTime: 0 })
                    res.push(data)
                }
            })
        }
        dispatch({ type: "TaskList", payload: res })

    }, [dispatch])
    let count = state?.TaskList.filter((a: TaskOneType) => a.complete == true).length
    let unComplete = state?.TaskList?.filter((a: any) => !a.complete)
    let Complete = state?.TaskList?.filter((a: any) => a.complete)
    return (
        <div className="m-4" >
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {unComplete.map((task: TaskOneType) => <TaskOne key={task?.id} data={task} />)}
                <hr />
                <li className="mb-4 ms-4 mt-4" onClick={() => setComplete(!complete)}>
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm leading-none font-medium text-gray-900 dark:text-gray-300 cursor-pointer" >
                        <span >المهام المكتملة</span>
                        <span className="font-bold px-2" > ( {count} )</span>
                    </time>
                </li>
                {complete && Complete?.map((task: TaskOneType) => <TaskOne key={task?.id} data={task} />)}


            </ol>


        </div>

    )
}

export function TaskOne({ data }: { data: TaskOneType }) {
    const { state, dispatch } = useContext(TasksContext)

    function add() {
        let text: any = localStorage.getItem("tasks")
        text = text ? JSON.parse(text) : []
        data.complete = !data.complete
        let body = text.filter((a: TaskOneType) => a?.id != data?.id)
        body = [...body, data]
        if (state.TaskOne.id == data.id) dispatch({ type: "TaskOne", payload: {} })
        else dispatch({ type: "TaskOne", payload: body })

        localStorage.setItem("tasks", JSON.stringify(body))
    }
    return (
        <div className={`ms-2 items-center text-sm p-4 flex flex-row justify-between hover:bg-slate-50 rounded-md ${state.TaskOne.id == data.id && "border-2 border-blue-600"} `}>
            <li className="  ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <div className="flex flex-col ">
                    <time className={`mb-1 text-sm leading-none font-medium text-gray-900 dark:text-gray-300 ${data?.complete && "line-through"}`}>{data.title} </time>
                    {/* <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">{data?.about}</p> */}
                </div>
            </li>
            <div className="flex flex-row *:mx-2  cursor-pointer ">
                {!data?.complete &&
                    <>
                        <TaskDone data={data} size={30} />
                        <TaskRun data={data} size={30} />
                    </>}
                {data?.complete &&
                    <>
                        <div onClick={add} className="font-bold text-xl rounded-full border-2  border-zinc-900 text-center flex justify-center  w-[28px] h-[28px]" >
                            +
                        </div>
                    </>}
            </div>
        </div>
    )
}
export function TaskDone({ data, size }: any) {
    const { state, dispatch } = useContext(TasksContext)
    function ok() {
        let text: any = localStorage.getItem("tasks")
        text = text ? JSON.parse(text) : []
        data.complete = !data.complete
        let body = text.filter((a: TaskOneType) => a?.id != data?.id)
        body = [...body, data]
        if (state.TaskOne.id == data.id) dispatch({ type: "TaskOne", payload: {} })
        else dispatch({ type: "TaskOne", payload: body })

        localStorage.setItem("tasks", JSON.stringify(body))
    }
    return (
        <div onClick={ok} >
            <IconOk size={size || 48} />
        </div>
    )
}


function IconOk({ size = 30 }) {
    return (
        <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} className=" hover:*:fill-blue-700 group" >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>

            <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.5,0-8-3.5-8-8s3.5-8,8-8s8,3.5,8,8 S16.5,20,12,20z"></path>
            <polygon points="9.8,16.8 6.1,13.2 7.5,11.7 9.8,14 15.5,7.9 17,9.3 "></polygon>
            <rect fill="none" ></rect>
        </svg >
    )
}