export default class Task {
    #title;
    #description;
    #notes;
    #dueDate;
    #priority;
    #project;
    #complete;
    
    constructor(title, description, notes, dueDate, priority, project, complete = false){
        this.#title = title;
        this.#description = description;
        this.#notes = notes;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#project = project;
        this.#complete = complete;
    }

    set title(title){
        this.#title = title;
    }

    get title(){
        return this.#title;
    }

    set description(description){
        this.#description = description;
    }

    get description(){
        return this.#description;
    }

    set notes(notes){
        this.#notes = notes;
    }

    get notes(){
        return this.#notes;
    }

    set dueDate(dueDate){
        this.#dueDate = dueDate;
    }

    get dueDate(){
        return this.#dueDate;
    }

    set priority(priority){
        this.#priority = priority;
    }

    get priority(){
        return this.#priority;
    }
    
    set project(project){
        this.#project = project;
    }

    get project(){
        return this.#project;
    }

    set complete(complete){
        this.#complete = complete;
    }

    get complete(){
        return this.#complete;
    }

    toJSON(){
       return  {
            title: this.#title,
            description: this.#description,
            notes: this.#notes,
            dueDate : this.#dueDate,
            priority: this.#priority,
            project: this.#project,
            complete: this.#complete

        }
    }
}