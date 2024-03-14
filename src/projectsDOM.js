import taskDisplay from "./taskDOM.js";
import {
  getValueFromStorage,
  deleteProject,
  updateStorage,
} from "./storageCRUD.js";
import { projectCreator } from "./todoAndProjectCreatorDialogBox.js";


//display the given project with the ability to edit/delete
function projects(projects) {
  const main = document.querySelector(".main");
  main.innerHTML = "";
  projects.forEach((project) => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.classList.add(`${project.name.replace(/\s/g, "")}`);
    projectContainer.addEventListener("click", () => {
      updateStorage("current-page", project.name);
      main.innerHTML = "";
      projectTasks(project);
    });
    const name = document.createElement("p");
    name.textContent = project.name;
    const editProject = document.createElement("button");
    editProject.textContent = "Edit";
    editProject.addEventListener("click", (e) => {
      e.stopPropagation();
      projectCreator(project);
    });
    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.textContent = "Delete";
    deleteProjectButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteProject(project);
    });

    projectContainer.appendChild(name);
    projectContainer.appendChild(editProject);
    projectContainer.appendChild(deleteProjectButton);
    main.appendChild(projectContainer);
  });
}

//display all tasks of the given project
function projectTasks(project) {
  const main = document.querySelector(".main");
  const header = document.createElement("h2");
  header.textContent = project.name;
  main.appendChild(header);
  const projectsArray = getValueFromStorage("projects");
  let projectToDisplay;
  projectsArray.forEach((p) => {
    if (p.name === project.name) {
      projectToDisplay = p;
      return;
    }
  });
  const tasks = projectToDisplay.tasks;
  tasks.forEach((task) => {
    taskDisplay(task, tasks);
  });
}

//display the given project under the projects tab
function projectTab(project, oldProjectTab = '') {
  if (oldProjectTab !== '') document.querySelector(`.side-bar .${oldProjectTab}`).remove();
  const sideBar = document.querySelector(".side-bar");
  const main = document.querySelector(".main");
  const projectButton = document.createElement("button");
  projectButton.classList.add(`${project.name.replace(/\s/g, "")}`);
  projectButton.classList.add("project-list");
  projectButton.innerHTML = `<img class="project-icon" src="e1a005fba6bca962a586.svg" alt="icon"> <span>${project.name}</span>`;

  projectButton.addEventListener("click", () => {
    main.innerHTML = "";
    updateStorage("current-page", project.name);
    projectTasks(project);
  });
  sideBar.appendChild(projectButton);
}

export { projects, projectTasks, projectTab };
