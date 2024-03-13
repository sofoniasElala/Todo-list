import { todoCreator } from "./todoAndProjectCreatorDialogBox";
import { deleteTask as deleteTaskFromStorage } from "./storageCRUD.js";
import {format, parseISO, isBefore} from 'date-fns';


export default function taskDisplay(task, tasks){
    const main = document.querySelector('.main');
    const taskContainer = document.createElement('div');
    const index = tasks.indexOf(task);
        taskContainer.classList.add('task-container');
        taskContainer.classList.add(`${task.name.replace(/\s/g, "")}-task-container`);
        const name = document.createElement('p');
        name.textContent = task.name;
        const dueDate = document.createElement('p');
        dueDate.textContent = `⏲ ${format(parseISO(task.dueDate), "MMMM do" )}`;
        dueDate.style.color = isBefore(task.dueDate, format(Date.now(), 'yyyy-MM-dd')) ? 'red' : 'green';

        const project = document.createElement('p');
        project.innerHTML = `<img src="e1a005fba6bca962a586.svg" alt="icon"> <span> ${task.project}</span>`;
        project.classList.add('project-icon-task')
        const priority = document.createElement('img');
        priority.src = task.priority;
        taskContainer.addEventListener('click', ()=> {
            todoCreator(task);
        })
        const deleteTask = document.createElement('button');
        deleteTask.textContent = 'delete';
        deleteTask.addEventListener('click', (e)=> {
            e.stopPropagation();
           deleteTaskFromStorage(task, tasks);
           console.log('clicked')
        })
        const labelForBox = document.createElement('label');
        labelForBox.setAttribute('for', `checkbox-${index}`);
        const completedBox = document.createElement('input');
        completedBox.setAttribute('type', 'checkbox');
        completedBox.setAttribute('id', `checkbox-${index}`);
        completedBox.classList.add('checkbox');
        completedBox.onclick = (e) => e.stopPropagation();

        const checkboxNname = document.createElement('div');
        checkboxNname.classList.add('checkboxNname');
        checkboxNname.appendChild(completedBox);
        checkboxNname.appendChild(name);
        checkboxNname.appendChild(priority);

        const info = document.createElement('div');
        info.classList.add('info');
        info.appendChild(dueDate);
        info.appendChild(deleteTask);
        info.appendChild(project);

        taskContainer.appendChild(checkboxNname);
        //taskContainer.appendChild(dueDate);
        //taskContainer.appendChild(edit);
        taskContainer.appendChild(info);

        main.appendChild(taskContainer);
}