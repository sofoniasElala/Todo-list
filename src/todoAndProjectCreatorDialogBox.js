//REFACTOR!!!
import {format} from 'date-fns';
import { projectTab } from './projectsDOM.js';
import { updateStorage, getValueFromStorage } from './storageCRUD.js';
import Project from './project.js';
import Task from './todo.js';
import updateState from './updatePageState.js';

function todoCreator(editTask = {}){
    const edit = editTask.name ? true : false;
    const main = document.querySelector('.main');
    
    const dialog = document.createElement('dialog');
    dialog.classList.add('task-dialog');

    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');

    const name = document.createElement('input');
    name.value = editTask.name ? editTask.name : '';
    name.setAttribute('placeholder', 'Task name');
    name.setAttribute('autocapitalize', 'on');
    const description = document.createElement('input');
    description.value = editTask.description ? editTask.description : '';
    description.setAttribute('placeholder', 'Description');
    description.setAttribute('autocapitalize', 'on');

    const date = document.createElement('input');
    date.setAttribute('type', 'date');
    date.classList.add('dueDate');
    date.setAttribute('value', editTask.dueDate? editTask.dueDate : format(Date.now(), 'yyyy-MM-dd'));
    date.setAttribute('min', editTask.dueDate? format(new Date(editTask.dueDate), 'yyyy-MM-dd'): format(Date.now(), 'yyyy-MM-dd'));

    const dropDown = document.createElement('select');
    dropDown.setAttribute('id', 'drop-down');
    /*const defaultOption = document.createElement('option');
    defaultOption.textContent = 'default project';
    defaultOption.setAttribute('selected', "");
    defaultOption.setAttribute('value', 'default project');
    dropDown.appendChild(defaultOption); */
    createProjectsDropdown(dropDown, editTask.name ? true: false, editTask.project);

    const add = document.createElement('button');
    add.classList.add('task-dialog-add');
    add.textContent = editTask.name ? 'Save task' : 'Add task';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', (e)=> {
        e.preventDefault();
        document.querySelector('.create').style.visibility = 'hidden';
        createDataInStorage('task',{
            name: name.value,
            description: description.value,
            dueDate: date.value,
            notes: '',
            priority: '',
            project: dropDown.value,
            complete: false

        }, edit, editTask);
        updateState();

    })

    const cancel = document.createElement('button');
    cancel.classList.add('task-dialog-cancel');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('type', 'button');
    cancel.addEventListener('click', (e)=>{
        e.preventDefault();
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

function projectCreator(editProject = {}){
    const edit = editProject.name ? true: false;
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
    name.value = editProject.name ? editProject.name : '';
    name.setAttribute('id', 'project-name');
    name.setAttribute('autocapitalize', 'on');

    const add = document.createElement('button');
    add.classList.add('project-dialog-add');
    add.textContent = editProject.name ? 'Save project' : 'Add project';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', (e)=> {
        e.preventDefault();
        document.querySelector('.create').style.visibility = 'hidden';
        createDataInStorage('project',{
            name: name.value,
        }, edit, editProject);
        updateState();
    })

    const cancel = document.createElement('button');
    cancel.classList.add('project-dialog-cancel');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('type', 'button');
    cancel.addEventListener('click', (e)=>{
        e.preventDefault();
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

function createProjectsDropdown(dropdown, edit, prevOption){
    const projects = getValueFromStorage('projects');
    projects.forEach(project => {
        const option = document.createElement('option');
        if(edit && (project.name == prevOption)) option.setAttribute('selected', '');
        option.setAttribute('value', `${project.name}`);
        option.textContent = project.name;
        dropdown.appendChild(option);
    });
}

function createDataInStorage(type, data, edit, old){
    const projectsArray = getValueFromStorage('projects');
    let projectToTab;
    if(type === 'project'){
        if(edit){
            projectsArray.forEach((project, index) => {
                if(project.name === old.name) {
                    data.tasks = project.tasks;
                    projectsArray.splice(index, 1, data);
                    projectToTab = data;
                }
            })
        } else {
        projectToTab = new Project(data.name, []);
        projectsArray.push(projectToTab);
        }
        updateStorage('projects', projectsArray);
        projectTab(projectToTab); 
    } else if(type === 'task'){
        const allTasksArray = getValueFromStorage('all-tasks');
        if(edit){
            allTasksArray.forEach((task, index) =>{
                if(task.name === old.name) allTasksArray.splice(index, 1, data);
                return;
            })
            projectsArray.forEach(project => {
                if(project.name === old.project && project.name === data.project){
                    project.tasks.forEach((task, index) => {
                        if(task.name === old.name) project.tasks.splice(index, 1, data);
                    })
                 }  if(project.name === old.project && project.name !== data.project){
                    project.tasks.forEach((task, index) => {
                        if(task.name === old.name) {project.tasks.splice(index, 1); }
                    })
                 }   if (project.name !== old.project && project.name === data.project){
                    project.tasks.push(data);
                 }
                 updateStorage('projects', projectsArray);
            });
        } else {
        const task = new Task(data.name, data.description, data.notes, data.dueDate, 
            data.priority, data.project, data.complete);
        allTasksArray.push(task);
        
        projectsArray.forEach(project => {
            if(project.name === data.project){
                project.tasks.push(task);
                updateStorage('projects', projectsArray);
                return;
             }
        });
    }
        updateStorage('all-tasks', allTasksArray);
    }
}

export {todoCreator, projectCreator}