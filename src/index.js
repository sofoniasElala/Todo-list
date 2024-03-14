import home from "./homeDOM.js";
import { today, week } from "./calendarDOM.js";
import { projects as projectsDOM } from "./projectsDOM.js";
import {
  projectCreator,
  todoCreator,
} from "./todoAndProjectCreatorDialogBox.js";
import { updateStorage, getValueFromStorage } from "./storageCRUD.js";
import "./style.css";
class App {
  constructor() {
    this.add = document.querySelector(".add-button");
    this.addProject = document.querySelector(".project-add-button");
    this.addTask = document.querySelector(".task-add-button");
    this.createDiv = document.querySelector(".create");
    this.homeButton = document.querySelector(".home");
    this.todayButton = document.querySelector(".today");
    this.weekButton = document.querySelector(".week");
    this.projectsButton = document.querySelector(".projects");
    this.allProjects = [{ name: "default project", tasks: [] }];
    this.allTasks = [];

    //initialize storage
    updateStorage("projects", this.allProjects);
    updateStorage("all-tasks", this.allTasks);
    updateStorage("current-page", "home");
  }

  start() {
    home(this.allTasks);

    this.homeButton.addEventListener("click", () => {
      home(getValueFromStorage("all-tasks"));
      updateStorage("current-page", "home");
    });
    this.todayButton.addEventListener("click", () => {
      today(getValueFromStorage("all-tasks"));
      updateStorage("current-page", "today");
    });
    this.weekButton.addEventListener("click", () => {
      week(getValueFromStorage("all-tasks"));
      updateStorage("current-page", "week");
    });
    this.projectsButton.addEventListener("click", () => {
      projectsDOM(getValueFromStorage("projects"));
      updateStorage("current-page", "projects");
    });

    this.add.addEventListener("click", () => {
      this.createDiv.style.visibility =
        this.createDiv.style.visibility === "visible" ? "hidden" : "visible";
    });

    this.addTask.addEventListener("click", () => {
      todoCreator();
    });

    this.addProject.addEventListener("click", () => {
      projectCreator();
    });
  }
}

const app = new App();
app.start();
