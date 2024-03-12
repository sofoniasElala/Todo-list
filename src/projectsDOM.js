import taskDisplay from './taskDOM.js'
import { getValueFromStorage, deleteProject } from './storageCRUD.js';
import { projectCreator } from './todoAndProjectCreatorDialogBox.js';
function projects(projects){
    const main = document.querySelector('.main');
    main.innerHTML = '';
    projects.forEach(project => {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');
        projectContainer.classList.add(`${project.name.replace(/\s/g, "")}`);
        const name = document.createElement('p');
        name.textContent = project.name;
        /*const editProject = document.createElement('button');
        editProject.textContent = 'Edit';*/
        projectContainer.addEventListener('click', ()=> {
            projectCreator(project);
        })
        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.textContent = 'Delete';
        deleteProjectButton.addEventListener('click', (e)=> {
            e.stopPropagation();
            deleteProject(project);
        })

        projectContainer.appendChild(name);
       // projectContainer.appendChild(editProject);
        projectContainer.appendChild(deleteProjectButton);
        main.appendChild(projectContainer);
    });
}

function projectTasks(project){
    const projectsArray = getValueFromStorage('projects');
    let projectToDisplay;
    projectsArray.forEach(p => {
        if(p.name === project.name){
            projectToDisplay = p;
            return;
         }
    });
    const tasks = projectToDisplay.tasks;
    tasks.forEach(task => {
        taskDisplay(task, tasks);
    });
}

function projectTab(project){
    const sideBar = document.querySelector('.side-bar');
    const main = document.querySelector('.main');
    const projectButton = document.createElement('button');
    projectButton.classList.add(`${project.name}`);
    projectButton.classList.add('project-list');
    projectButton.textContent = project.name;
    projectButton.addEventListener('click', ()=>{
        main.innerHTML = '';
        projectTasks(project);
    })
    sideBar.appendChild(projectButton);
}

export { projects, projectTasks, projectTab}