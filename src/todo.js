export default class Task {
  #name;
  #description;
  #notes;
  #dueDate;
  #priority;
  #project;
  #complete;

  constructor(name, description, dueDate, priority, project, complete = false) {
    this.#name = name;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#project = project;
    this.#complete = complete;
  }

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set description(description) {
    this.#description = description;
  }

  get description() {
    return this.#description;
  }

  set notes(notes) {
    this.#notes = notes;
  }

  get notes() {
    return this.#notes;
  }

  set dueDate(dueDate) {
    this.#dueDate = dueDate;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set priority(priority) {
    this.#priority = priority;
  }

  get priority() {
    return this.#priority;
  }

  set project(project) {
    this.#project = project;
  }

  get project() {
    return this.#project;
  }

  set complete(complete) {
    this.#complete = complete;
  }

  get complete() {
    return this.#complete;
  }

  toJSON() {
    return {
      name: this.#name,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      project: this.#project,
      complete: this.#complete,
    };
  }
}
