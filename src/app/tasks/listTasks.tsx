import { useContext, useEffect, useState } from "react";
import { TaskManager } from "../_lib/dataCenter";
import { TaskOneType } from "./types";
import { TasksContext } from "./store";
import { TaskOne } from "./taskOne";

export function ListTask() {
    const { state, dispatch } = useContext(TasksContext)
    let [complete, setComplete] = useState<any>(false)
    useEffect(() => {
        console.log();

        let res: TaskOneType[] = TaskManager.find()
        res.sort((a: any, b: any) => b.id + a.id).reverse();
        if (res?.length == 0) {
            "المهمة الاولى,اتمام اول مهمة, تشغيل اول مهمة".split(/[\n,]/).map(async (text: string) => {
                text = text.trim()
                if (text != "") {
                    let data: any = TaskManager.create(text)
                    res.push(data)
                }
            })
        }
        dispatch({ type: "TaskList", payload: res })

    }, [dispatch])
    let count = state?.TaskList.filter((a: TaskOneType) => a?.complete == true).length
    let unComplete = state?.TaskList?.filter((a: any) => !a?.complete)
    let Complete = state?.TaskList?.filter((a: any) => a?.complete)
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
