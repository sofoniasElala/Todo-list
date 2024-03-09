export default class Project {
    #name;
    #tasks;

    constructor(name, tasks = []){
        this.#name = name;
        this.#tasks = tasks;
    }

    set name(name){
        this.#name = name;
    }
    get name(){
        return this.#name;
    }
    get tasks(){
        return this.#tasks;
    }

    addTask(task){
        this.#tasks.push(task);
    }

    deleteTask(index){
        this.#tasks.splice(index, 1);
    }

    toJSON(){
        return {
            name: this.#name,
            tasks: this.#tasks
        }
    }
}