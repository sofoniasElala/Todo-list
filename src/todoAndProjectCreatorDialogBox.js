//REFACTOR!!!

function todoCreator(){
    const  main = document.querySelector('.main');
    
    const dialog = document.createElement('dialog');
    dialog.classList.add('task-dialog');

    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');

    const name = document.createElement('input');
    name.setAttribute('placeholder', 'Task name');
    const description = document.createElement('input');
    description.setAttribute('placeholder', 'Description');

    const add = document.createElement('button');
    add.classList.add('task-dialog-add');
    add.textContent = 'Add';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', ()=> {
        //handle task creation
    })

    const cancel = document.createElement('button');
    cancel.classList.add('task-dialog-cancel');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('type', 'button');
    cancel.addEventListener('click', ()=>{
        dialog.close();
    })

    form.appendChild(name);
    form.appendChild(description);
    form.appendChild(add);
    form.appendChild(cancel);
    dialog.appendChild(form);
    main.appendChild(dialog);

    dialog.showModal();
}

function projectCreator(){
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
    name.setAttribute('id', 'project-name');

    const add = document.createElement('button');
    add.classList.add('project-dialog-add');
    add.textContent = 'Add';
    add.setAttribute('type', 'submit');
    add.addEventListener('click', ()=> {
        //handle project creation
    })

    const cancel = document.createElement('button');
    cancel.classList.add('project-dialog-cancel');
    cancel.textContent = 'Cancel';
    cancel.setAttribute('type', 'button');
    cancel.addEventListener('click', ()=>{
        dialog.close();
    })

    form.appendChild(header);
    form.appendChild(nameLabel);
    form.appendChild(name);
    form.appendChild(add);
    form.appendChild(cancel);
    dialog.appendChild(form);
    main.appendChild(dialog);

    dialog.showModal();
}

export {todoCreator, projectCreator}