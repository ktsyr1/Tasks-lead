"use client"
import { createContext } from 'react';

export const TasksContext = createContext<any>(undefined);
export function TasksReducer(state: any, action: any) {
    return { ...state, [action.type]: action.payload };
}
export const TaskInitialState = {
    TaskOne: {}, // قم بتحديد القيم الافتراضية لـ TaskOne
    TaskList: [], // قائمة فارغة في البداية
    isRunning: false
};
