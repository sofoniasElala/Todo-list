import taskDisplay from './taskDOM.js'
function projects(projects){
    const main = document.querySelector('.main');
    projects.forEach(project => {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');
        const name = document.createElement('p');
        name.textContent = project.name;
        const editProject = document.createElement('button');
        editProject.textContent = 'Edit';
        const deleteProject = document.createElement('button');
        deleteProject.textContent = 'Delete';

        projectContainer.appendChild(name);
        projectContainer.appendChild(editProject);
        projectContainer.appendChild(deleteProject);
        main.appendChild(projectContainer);
    });
}

function projectTasks(project){
    const tasks = project.tasks;
    tasks.forEach(task => {
        taskDisplay(task, tasks);
    });
}

export { projects, projectTasks}