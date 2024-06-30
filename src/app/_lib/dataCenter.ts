
export class TaskManager {
    private static schema(title = "") {
        return {
            id: new Date().getTime() + Math.random().toString(9),
            idLocal: null,
            title: title,
            about: "",
            complete: false,
            timeComplete: 1500, // 25 * 60
            totleTime: 0,
            // idGroup 
        };
    }
    private static clean(array: any) {
        return array.filter((a: any) => a != null);
    }
    static create(title = "task emply") {
        let tasks = this.find();
        let task = this.schema(title)
        tasks.push(task);
        tasks = this.clean(tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return task
    }

    static find() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    static updateOne(query: any) {
        let tasks = this.find();
        const taskIndex = tasks.findIndex((task: any) => task.id === query.id);
        if (taskIndex > -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...query };
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        tasks = this.clean(tasks)
        return query
    }

    static findOne(query: any) {
        const tasks = this.find();
        return tasks.find((task: any) =>
            Object.keys(query).every(key => task[key] === query[key])
        ) || null;
    }
    static delete(taskId: any) {
        const tasks = this.find();
        const filteredTasks = tasks.filter((task: any) => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }
}

class DBCenter {
    static Id() {
        return Number(`${new Date().getTime() + Math.random().toString(9)}`.replace(".", "").slice(0, 20))
    }
    static create(name: string, data: any,) {
        if (typeof data !== 'object' || data === null) {
            throw new Error("Data must be an object");
        }

        let old = localStorage.getItem(name);
        let list = !old ? [] : JSON.parse(old);
        data.id = this.Id();
        data.complete = false
        list.push(data); // Add the new data object to the list

        let updatedList = JSON.stringify(list);
        localStorage.setItem(name, updatedList);
        return data;
    }
    static find(name: string, query: any,) {
        let text: any = localStorage.getItem(name)
        return text ? JSON.parse(text) : [];
    }
    static findOne(name: any) {
        console.log("test");

    }
    static updateOne(name: any) {

    }
    static delete(name: any) {

    }

}

export class DBtask {
    static create(data: any) {
        let one = DBCenter.create("tasks", data)

        return one
    }

    static find(query?: any) {
        let data = DBCenter.find("tasks", query)
        return data
    }
    static findOne(query?: any) {
        console.log("test");

    }
    static updateOneId(query: any, data: any) {
        let list = DBCenter.find("tasks", query)
        return list

    }
    static delete(query: any) {

    }

}