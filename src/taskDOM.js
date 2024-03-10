export default function taskDisplay(task, tasks){
    const main = document.querySelector('.main');
    const taskContainer = document.createElement('div');
    const index = tasks.indexOf(task);
        taskContainer.classList.add('task-container');
        const name = document.createElement('p');
        name.textContent = task.name;
        const description = document.createElement('p');
        description.textContent = task.description;
        const labelForBox = document.createElement('label');
        labelForBox.setAttribute('for', `checkbox-${index}`);
        const completedBox = document.createElement('input');
        completedBox.setAttribute('type', 'checkbox');
        completedBox.setAttribute('id', `checkbox-${index}`);
        completedBox.classList.add('checkbox');

        taskContainer.appendChild(name);
        taskContainer.appendChild(description);
        taskContainer.appendChild(labelForBox);
        taskContainer.appendChild(completedBox);

        main.appendChild(taskContainer);
}