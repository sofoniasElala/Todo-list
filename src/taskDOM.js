import { todoCreator } from "./todoAndProjectCreatorDialogBox";
import { deleteTask as deleteTaskFromStorage } from "./storageCRUD.js";
export default function taskDisplay(task, tasks){
    const main = document.querySelector('.main');
    const taskContainer = document.createElement('div');
    const index = tasks.indexOf(task);
        taskContainer.classList.add('task-container');
        taskContainer.classList.add(`${task.name.replace(/\s/g, "")}-task-container`);
        const name = document.createElement('p');
        name.textContent = task.name;
        const description = document.createElement('p');
        description.textContent = task.description;
        /*const edit = document.createElement('button');
        edit.textContent = 'Edit'; */
        taskContainer.addEventListener('click', ()=> {
            todoCreator(task);
        })
        const deleteTask = document.createElement('button');
        deleteTask.textContent = 'deleteTask';
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

        taskContainer.appendChild(name);
        taskContainer.appendChild(description);
        //taskContainer.appendChild(edit);
        taskContainer.appendChild(deleteTask);
        taskContainer.appendChild(labelForBox);
        taskContainer.appendChild(completedBox);

        main.appendChild(taskContainer);
}