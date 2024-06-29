
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