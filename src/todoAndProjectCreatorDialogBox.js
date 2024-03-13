//REFACTOR!!!
import {format} from 'date-fns';
import { projectTab } from './projectsDOM.js';
import { updateStorage, getValueFromStorage } from './storageCRUD.js';
import Project from './project.js';
import Task from './todo.js';
import updateState from './updatePageState.js';
import oneFlag from './priority-flags/one.svg';
import twoFlag from './priority-flags/two.svg';
import threeFlag from './priority-flags/three.svg';
import fourFlag from './priority-flags/four.svg';

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
    const description = document.createElement('textarea');
    description.textContent = editTask.description ? editTask.description : '';
    description.setAttribute('placeholder', 'Description');
    description.setAttribute('autocapitalize', 'on');
    description.setAttribute('rows', '5');
    description.setAttribute('cols', '33');

    const date = document.createElement('input');
    date.setAttribute('type', 'date');
    date.classList.add('dueDate');
    date.setAttribute('value', editTask.dueDate? editTask.dueDate : format(Date.now(), 'yyyy-MM-dd'));
    date.setAttribute('min', format(Date.now(), 'yyyy-MM-dd'));

    const dropDown = document.createElement('select');
    dropDown.setAttribute('id', 'drop-down');
    createProjectsDropdown(dropDown, editTask.name ? true: false, editTask.project);

    const priority = document.createElement('div');
    priority.setAttribute('id', 'priority');
    const priorityDropDown = document.createElement('select');
    priorityDropDown.setAttribute('id', 'priority-drop-down');
    let img = createPriorityDropdown(priorityDropDown, editTask.name ? true: false, editTask.priority);
    priorityDropDown.addEventListener('change', ()=>{
        img.src = priorityDropDown.value;
    })
    priority.appendChild(img);
    priority.appendChild(priorityDropDown);
    
    //priority.appendChild(priorityDropDown);


    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-div');
    const add = document.createElement('button');
    add.classList.add('dialog-add');
    add.textContent = editTask.name ? 'Save changes' : 'Add task';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', (e)=> {
        
        document.querySelector('.create').style.visibility = 'hidden';
        createDataInStorage('task',{
            name: name.value,
            description: description.value,
            dueDate: date.value,
            priority: priorityDropDown.value,
            project: dropDown.value,
            complete: false

        }, edit, editTask);
        main.innerHTML = '';
        updateState();

    })

    const cancel = document.createElement('button');
    cancel.classList.add('dialog-cancel');
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
    form.appendChild(priority);
    bottomDiv.appendChild(cancel);
    bottomDiv.appendChild(add);
    form.appendChild(bottomDiv);
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
    header.textContent = edit ? 'Project' : 'Add project';
    
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name';
    nameLabel.setAttribute('for', 'project-name');

    const name = document.createElement('input');
    name.value = edit ? editProject.name : '';
    name.setAttribute('id', 'project-name');
    name.setAttribute('autocapitalize', 'on');

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom-div');

    const add = document.createElement('button');
    add.classList.add('dialog-add');
    add.textContent = edit ? 'Save changes' : 'Add';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', (e)=> {
        document.querySelector('.create').style.visibility = 'hidden';
        createDataInStorage('project',{
            name: name.value,
        }, edit, editProject);
        main.innerHTML = '';
        updateState();
    })

    const cancel = document.createElement('button');
    cancel.classList.add('dialog-cancel');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('type', 'button');
    cancel.addEventListener('click', (e)=>{
        e.preventDefault();
        dialog.close();
    })

    form.appendChild(header);
    form.appendChild(nameLabel);
    form.appendChild(name);
    bottomDiv.appendChild(cancel);
    bottomDiv.appendChild(add);
    form.appendChild(bottomDiv);
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

function createPriorityDropdown(dropdown, edit, prevOption){
    const one = document.createElement('img');
    one.src = oneFlag;
    const two = document.createElement('img');
    two.src = twoFlag;
    const three = document.createElement('img');
    three.src = threeFlag;
    const four = document.createElement('img');
    four.src = fourFlag;
    let priorityImg = one;

    const flags = [one, two, three, four];
    flags.forEach((flag, index) => {
        const option = document.createElement('option');
        if(edit && (`${flag.src}` == prevOption)) {
            option.setAttribute('selected', '');
            priorityImg= flag;
        }
        option.setAttribute('value', `${flag.src}`);
        option.textContent = `Priority ${index+1}`;
        dropdown.appendChild(option); 
    });
    return priorityImg;
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
        const task = new Task(data.name, data.description, data.dueDate, 
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

export {todoCreator, projectCreator, createDataInStorage}