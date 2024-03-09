import {projects as projectsDOM} from './projectsDOM.js';
import Project from './project.js';
import { projectCreator, todoCreator } from './todoAndProjectCreatorDialogBox.js';
import taskDisplay from './taskDOM.js';

export default function home (allTasks = []){
    const main = document.querySelector('.main');
    const add = document.createElement('button');
    add.classList.add('home-add-button');
    add.textContent = '+';
    add.addEventListener('click', ()=> {
        createTaskOrProject.style.visibility = createTaskOrProject.style.visibility === 'visible' ? 'hidden' : 'visible';
    })
    
    const createTaskOrProject = document.createElement('div');
    createTaskOrProject.classList.add('home-create');

    const createTask = document.createElement('button');
    createTask.textContent = 'Task';
    createTask.addEventListener('click', ()=> {
        todoCreator();
    })

    const createProject = document.createElement('button');
    createProject.textContent = 'Project';
    createProject.addEventListener('click', ()=>{
        projectCreator();
    })

    createTaskOrProject.appendChild(createProject);
    createTaskOrProject.appendChild(createTask);

    main.appendChild(add);
    main.appendChild(createTaskOrProject);

    allTasks.forEach(task => {
        taskDisplay(task);
    })


}
