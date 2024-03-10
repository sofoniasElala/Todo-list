//REFACTOR!!!
import {format} from 'date-fns';
import { projectTab } from './projectsDOM.js';
import { updateStorage, getValueFromStorage } from './storageCRUD.js';
import Project from './project.js';
import Task from './todo.js';

function todoCreator(){
    const  main = document.querySelector('.main');
    
    const dialog = document.createElement('dialog');
    dialog.classList.add('task-dialog');

    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');

    const name = document.createElement('input');
    name.setAttribute('placeholder', 'Task name');
    name.setAttribute('autocapitalize', 'on');
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Description');
    description.setAttribute('autocapitalize', 'on');

    const date = document.createElement('input');
    date.setAttribute('type', 'date');
    date.classList.add('dueDate');
    date.setAttribute('value', format(Date.now(), 'yyyy-MM-dd'));
    date.setAttribute('min', format(Date.now(), 'yyyy-MM-dd'));

    const dropDown = document.createElement('select');
    dropDown.setAttribute('id', 'drop-down');
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Default project';
    defaultOption.setAttribute('value', 'default-project');
    dropDown.appendChild(defaultOption);
    createProjectsDropdown(dropDown);

    const add = document.createElement('button');
    add.classList.add('task-dialog-add');
    add.textContent = 'Add task';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', ()=> {
        document.querySelector('.create').style.visibility = 'hidden';
        createDataInStorage('task',{
            name: name.value,
            description: description.value,
            dueDate: date.value,
            notes: '',
            priority: '',
            project: dropDown.value,
            complete: false

        });

    })

    const cancel = document.createElement('button');
    cancel.classList.add('task-dialog-cancel');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('type', 'button');
    cancel.addEventListener('click', ()=>{
        dialog.close();
    })

    form.appendChild(name);
    form.appendChild(description);
    form.appendChild(date);
    form.appendChild(dropDown);
    form.appendChild(cancel);
    form.appendChild(add);
    dialog.appendChild(form);
    main.appendChild(dialog);

    dialog.showModal();
}

function projectCreator(){
    const  main = document.querySelector('.main');
    
    const dialog = document.createElement('dialog');
    dialog.classList.add('project-dialog');

    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');

    const header = document.createElement('p');
    header.textContent = 'Add project';
    
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name';
    nameLabel.setAttribute('for', 'project-name');

    const name = document.createElement('input');
    name.setAttribute('id', 'project-name');
    name.setAttribute('autocapitalize', 'on');

    const add = document.createElement('button');
    add.classList.add('project-dialog-add');
    add.textContent = 'Add project';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', ()=> {
        document.querySelector('.create').style.visibility = 'hidden';
        createDataInStorage('project',{
            name: name.value,
        });
    })

    const cancel = document.createElement('button');
    cancel.classList.add('project-dialog-cancel');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('type', 'button');
    cancel.addEventListener('click', ()=>{
        dialog.close();
    })

    form.appendChild(header);
    form.appendChild(nameLabel);
    form.appendChild(name);
    form.appendChild(cancel);
    form.appendChild(add);
    dialog.appendChild(form);
    main.appendChild(dialog);

    dialog.showModal();
}

function createProjectsDropdown(dropdown){
    const projects = getValueFromStorage('projects');
    projects.forEach(project => {
        const option = document.createElement('option');
        option.setAttribute('value', `${project.name}`);
        option.textContent = project.name;
        dropdown.appendChild(option);
    });
}

function createDataInStorage(type, data){
    const projectsArray = getValueFromStorage('projects');
    if(type === 'project'){
        const project = new Project(data.name, []);
        projectsArray.push(project);
        updateStorage('projects', projectsArray);
        projectTab(project);
    } else if(type === 'task'){
        const task = new Task(data.name, data.description, data.notes, data.dueDate, 
            data.priority, data.project, data.complete);
        const allTasksArray = getValueFromStorage('all-tasks');
        allTasksArray.push(task);
        
        projectsArray.forEach(project => {
            if(project.name === data.project){
                project.tasks.push(task);
                updateStorage('projects', projectsArray);
                return;
             }
        });
        updateStorage('all-tasks', allTasksArray);
    }
}

export {todoCreator, projectCreator}