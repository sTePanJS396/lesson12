// 'use strict';

const todoControl = document.querySelector('.todo-control');
const headerButton = document.querySelector('.header-button');
headerButton.disabled = true;
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplete = document.querySelector('.todo-completed');
const todoRemove = document.querySelector('.todo-remove');

headerInput.addEventListener('input', function () {
    headerButton.disabled = false;
});

let todoData = [];

if (localStorage.getItem('todoStorag')) {
    todoData = JSON.parse(localStorage.getItem('todoStorag'));
    render()
}

function render() {

    const addToStorage = () => {
        localStorage.setItem('todoStorag', JSON.stringify(todoData));
        console.log(todoData);
    };
    todoList.textContent = '';
    todoComplete.textContent = '';

    
    todoData.forEach(function (item) {
        if (item.value !== undefined && item.completed !== undefined) {

            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                '<div class="todo-buttons">' +
                    '<button class="todo-remove"></button>' +
                    '<button class="todo-complete"></button>' +
                '</div>';

            if (item.completed) {
                todoComplete.append(li);
            } else {
                todoList.append(li);
            };

            const btnTodoComplete = li.querySelector('.todo-complete');
            const todoRemove = li.querySelector('.todo-remove');

            btnTodoComplete.addEventListener('click', function () {
                item.completed = !item.completed;
                render();
            });

            todoRemove.addEventListener('click', function () {
                li.remove();
                delete item.value; 
                delete item.completed;

                localStorage.removeItem(item.value);
                localStorage.removeItem(item.completed);
                localStorage.setItem('todoStorag', JSON.stringify(todoData));
            });
            addToStorage();
            headerInput.value = '';
        };
    });

}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    todoData.push(newTodo);
    render();
});

