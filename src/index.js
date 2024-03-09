import Task from './todo.js';
import home from './homeDOM.js';
import Project from './project.js';
import {format} from 'date-fns';
import {today, week} from './calendarDOM.js';
import { projects as projectsDOM} from './projectsDOM.js';
import { projectCreator, todoCreator } from './todoAndProjectCreatorDialogBox.js';
import { updateStorage, getValueFromStorage} from './storageCRUD.js';
import './style.css';
class App {

    constructor(){
        this.add = document.querySelector('.add-button');
        this.addProject = document.querySelector('.project-add-button');
        this.addTask = document.querySelector('.task-add-button');
        this.createDiv = document.querySelector('.create');
        this.main = document.querySelector('.main');
        this.homeButton = document.querySelector('.home');
        this.todayButton = document.querySelector('.today');
        this.weekButton = document.querySelector('.week');
        this.projectsButton = document.querySelector('.projects');
        this.allProjects = [];
        this.allTasks = [];

        //projects/all-tasks key that holds all projects/tasks with an empty array
        updateStorage('projects', this.allProjects);
        updateStorage('all-tasks', this.allTasks);
    }

    start(){
         /*------tests-------*/
        const testProject = new Project('Fitness'); 
        const testProject2 = new Project('Household');
        const testProject3 = new Project('Work');

        const testProjectTask = new Task('jump rope', '20 x 4', '',format(Date.now(), "MM/dd/yyyy"),'', testProject.name, false);
        testProject.addTask(testProjectTask);
        this.allProjects.push(testProject);
        this.allTasks.push(testProjectTask);

        const testProjectTask1 = new Task('squat', '300 x 4', '', format(new Date(2024, 2, 10), "MM/dd/yyyy"),'', testProject.name, false);
        testProject.addTask(testProjectTask1);
        this.allProjects.push(testProject2);
        this.allTasks.push(testProjectTask1);

        const testProjectTask2 = new Task('bench press', '150 x 4', '', format(Date.now(), "MM/dd/yyyy"),'', testProject.name, false);
        testProject.addTask(testProjectTask2);
        this.allProjects.push(testProject3)
        this.allTasks.push(testProjectTask2);

        updateStorage('projects', this.allProjects);
        updateStorage('all-tasks', this.allTasks);
        /*---------------------*/

        home(this.allTasks); //landing page loaded with the test tasks

        this.homeButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            home(getValueFromStorage('all-tasks'));
        })
        this.todayButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            today(getValueFromStorage('all-tasks'));
        })
        this.weekButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            week(getValueFromStorage('all-tasks'));
        })
        this.projectsButton.addEventListener('click', ()=> {
            this.main.innerHTML = '';
            projectsDOM(getValueFromStorage('projects')); //projectsDOM([testProject, testProject2, testProject3]);
        })

        this.add.addEventListener('click', ()=> {
            this.createDiv.style.visibility = this.createDiv.style.visibility === 'visible' ? 'hidden' : 'visible';
        })

        this.addTask.addEventListener('click', ()=> {
            todoCreator();
        })

        this.addProject.addEventListener('click', ()=>{
            projectCreator();
        })
    }

}

const app = new App();
app.start();