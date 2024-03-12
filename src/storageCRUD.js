//create or update key-value 
function updateStorage(key, value){
    sessionStorage.setItem(key, JSON.stringify(value));
}

//get a parsed value from storage
function getValueFromStorage(key){
    return JSON.parse(sessionStorage.getItem(key));
}

//remove from storage
function removeFromStorage(key){
    sessionStorage.removeItem(key);
}

function getProjectFromStorage(name){
    const projects = getValueFromStorage('projects');
    return projects.find(project => {
        if(project.name === name) {
            console.log(project);
            return project;
        }
    }); 
}

function deleteProject(projectToDelete){
    const projectsArray = getValueFromStorage('projects');
    const onDOM = Array.from(document.getElementsByClassName(`${projectToDelete.name.replace(/\s/g, "")}`));
    projectsArray.forEach((project, index) => {
        if(projectToDelete.name === project.name){
            projectsArray.splice(index, 1);
            updateStorage('projects', projectsArray);
            onDOM.forEach(element => {
                element.remove();
            })
        }
    })
}

function deleteTask(taskToDelete, allTasks){
    const project = getProjectFromStorage(taskToDelete.project);
    const allProjects = getValueFromStorage('projects');
    const onDOM = Array.from(document.getElementsByClassName(`${taskToDelete.name.replace(/\s/g, "")}-task-container`));
    project.tasks.forEach((task, index) => {
        if(task.name === taskToDelete.name){
            project.tasks.splice(index, 1);
            return;
        }
    })

    allTasks.forEach((task, index) => {
        if(task.name === taskToDelete.name){
            allTasks.splice(index, 1);
            updateStorage('all-tasks', allTasks);
            onDOM.forEach(element => {
                element.remove();
            })
            return;
        }
    })

    allProjects.forEach((proj, index) => {
        if(proj.name === project.name){
            allProjects.splice(index, 1, project);
            updateStorage('projects', allProjects);
            return;
        }
    })
}

export {updateStorage, getValueFromStorage, removeFromStorage, getProjectFromStorage, deleteProject, deleteTask}