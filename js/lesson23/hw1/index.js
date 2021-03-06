let tasks = [
    { id: Math.random(), text: 'Buy milk', done: false },
    { id: Math.random(), text: 'Pick up Tom from airport', done: false },
    { id: Math.random(), text: 'Visit party', done: false },
    { id: Math.random(), text: 'Visit doctor', done: true },
    { id: Math.random(), text: 'Buy meat', done: true },
];

const listElem = document.querySelector('.list');

const renderTasks = () => {
    console.log(tasks);
    const createListItems = (id, text, isDone) => {
        const checkboxClassName = isDone ? 'list__item_done' : '';
        const isChecked = isDone ? 'checked' : '';

        const newItem = `<li class="list__item ${checkboxClassName}" data-id=${id}>
                            <input class="list__item-checkbox" type="checkbox" ${isChecked}>
                            ${text}
                        </li>`;
        return newItem;
    };
    const todoListItems = tasks
        .sort((a, b) => a.done - b.done)
        .map(({ id, text, done }) => createListItems(id, text, done))
        .join('');
    return listElem.innerHTML = todoListItems;
}
renderTasks();

const onStatusTodoChange = event => {
    const isCheckbox = event.target.classList.contains('list__item-checkbox');
    if (!isCheckbox) return;
    const currentItem = event.target.closest('.list__item');
    const currentIndex = tasks.findIndex(item => item.id === +currentItem.dataset.id)
    const currentTodo = tasks[currentIndex];
    currentTodo.done = !currentTodo.done;
    return renderTasks();
}
listElem.addEventListener('click', onStatusTodoChange)

const onAddTodo = () => {
    const createNewTodo = text => {
        const newItem = {
            id: Math.random(),
            text,
            done: false
        };
        tasks.push(newItem);
        return renderTasks();
    }
    const inputTodoCreator = document.querySelector('.task-input');
    if (inputTodoCreator.value === '') return;
    createNewTodo(inputTodoCreator.value);
    inputTodoCreator.value = '';
}

const createTodoBtn = document.querySelector('.create-task-btn');
createTodoBtn.addEventListener('click', onAddTodo)
