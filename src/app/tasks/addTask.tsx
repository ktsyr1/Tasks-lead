import { useContext, useState } from "react";
import { TaskManager } from "../_lib/dataCenter";
import { TasksContext } from "./store";

export default function AddTask() {
    let [one, setOne] = useState("")
    const { state, dispatch } = useContext(TasksContext)

    let Send = (e: any) => {
        e.preventDefault();
        let arr = [...state.TaskList]
        one.split(/[\n,]/).map(async (text: string) => {
            text = text.trim()
            if (text != "") {
                let data = TaskManager.create(text)
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