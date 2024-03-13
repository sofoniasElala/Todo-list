import { todoCreator } from "./todoAndProjectCreatorDialogBox";
import { deleteTask as deleteTaskFromStorage } from "./storageCRUD.js";
import {format, parseISO, isPast} from 'date-fns';
export default function taskDisplay(task, tasks){
    const main = document.querySelector('.main');
    const taskContainer = document.createElement('div');
    const index = tasks.indexOf(task);
        taskContainer.classList.add('task-container');
        taskContainer.classList.add(`${task.name.replace(/\s/g, "")}-task-container`);
        const name = document.createElement('p');
        name.textContent = task.name;
        const dueDate = document.createElement('p');
        dueDate.textContent = `⏲ ${format(parseISO(task.dueDate), "MMMM do" )}`;//task.description;
        dueDate.style.color = isPast(parseISO(task.dueDate)) ? 'red' : 'green';
        /*const edit = document.createElement('button');
        edit.textContent = 'Edit'; */
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

        const info = document.createElement('div');
        info.classList.add('info');
        info.appendChild(dueDate);
        info.appendChild(deleteTask);

        taskContainer.appendChild(checkboxNname);
        //taskContainer.appendChild(dueDate);
        //taskContainer.appendChild(edit);
        taskContainer.appendChild(info);

        main.appendChild(taskContainer);
}