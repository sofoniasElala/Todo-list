export default function taskDisplay(task, tasks){
    const main = document.querySelector('.main');
    const taskContainer = document.createElement('div');
    const index = tasks.indexOf(task);
        taskContainer.classList.add('task-container');
        const title = document.createElement('p');
        title.textContent = task.title;
        const description = document.createElement('p');
        description.textContent = task.description;
        const labelForBox = document.createElement('label');
        labelForBox.setAttribute('for', `checkbox-${index}`);
        const completedBox = document.createElement('input');
        completedBox.setAttribute('type', 'checkbox');
        completedBox.setAttribute('id', `checkbox-${index}`);
        completedBox.classList.add('checkbox');

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(labelForBox);
        taskContainer.appendChild(completedBox);

        main.appendChild(taskContainer);
}