let newTask = document.querySelector('#newTask');

document.querySelector('.addTaskBtn').addEventListener('click', () => {
  if (newTask.value)
  {
    addTaskToLocalStorage();
    LoadTaskFromLocalStorage();
  }
  else
  {
    alert('Pls Pass in a new Task');
  }
  newTask.value = '';
})

function addTaskToLocalStorage()
{
  let task = {
    id: Math.round(Math.random() * 10000),
    task: newTask.value,
    status: 'new'
  }
  if (localStorage.getItem('Tasks') == null)
  {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }
  else
  {
    let tasks = JSON.parse(localStorage.getItem('Tasks'));
    tasks.push(task);
    localStorage.setItem('Tasks', JSON.stringify(tasks))
  }
}

function LoadTaskFromLocalStorage()
{
  let wrapper = '';
  if (JSON.parse(localStorage.getItem('Tasks')) !== null)
  {
    let tasks = JSON.parse(localStorage.getItem('Tasks'));
    for (let i = 0; i < tasks.length; i++)
    {
      wrapper += `
      <div class='task flex mb-20'>
        <input id="task-${tasks[i].id}" class='input' autocomplete="off" type="text" value="${tasks[i].task}" readonly>
        <input type='checkbox' ${tasks[i].status === 'new' ? '' : 'checked'} onclick='changeStatus(${tasks[i].id})'>
        <div>
          <i id='btn-${tasks[i].id}' class='fa-solid fa-pen-to-square' onclick='editTask(${tasks[i].id})'></i>
          <i class="fa-solid fa-trash-can" onclick='deleteTask(${tasks[i].id})'></i>
        </div>
      </div>
      `
    }

    document.querySelector('.tasks').innerHTML = wrapper;
    if (!wrapper)
    {
      document.querySelector('.tasks').innerHTML = '<h4>No Tasks</h4>';
    }
  }
  else
  {
    if (!wrapper)
    {
      document.querySelector('.tasks').innerHTML = '<h4>No Tasks</h4>';
    }
  }
}

function changeStatus(id)
{
  let tasks = JSON.parse(localStorage.getItem('Tasks'));
  
  for (let i = 0; i < tasks.length; i++)
  {
    if (tasks[i].id === id)
    {
      if (tasks[i].status === 'new')
      {
        tasks[i].status = 'completed';
      }
      else
      {
        tasks[i].status = 'new';
      }
    }
  }
  localStorage.setItem('Tasks', JSON.stringify(tasks));
  LoadTaskFromLocalStorage();
}

function deleteTask(id)
{
  let tasks = JSON.parse(localStorage.getItem('Tasks'));
  
  for (let i = 0; i < tasks.length; i++)
  {
    if (tasks[i].id === id)
    {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem('Tasks', JSON.stringify(tasks));
  LoadTaskFromLocalStorage();
}

function editTask(id)
{
  let taskBox = document.querySelector(`#task-${id}`);

  if (document.querySelector(`#btn-${id}`).classList.contains('fa-pen-to-square'))
  {
    taskBox.removeAttribute('readonly');
    document.querySelector(`#btn-${id}`).classList.remove('fa-pen-to-square');
    document.querySelector(`#btn-${id}`).classList.add('fa-pen');
  }
  else
  {
    taskBox.setAttribute("readonly", "1");
    saveTask(id);
    document.querySelector(`#btn-${id}`).classList.remove('fa-pen');
    document.querySelector(`#btn-${id}`).classList.add('fa-pen-to-square');
  }
}

function saveTask(id)
{
  let newTask = document.querySelector(`#task-${id}`).value;

  let tasks = JSON.parse(localStorage.getItem("Tasks"));

  for (let i = 0; i < tasks.length; i++)
  {
    if (tasks[i].id === id)
    {
      tasks[i].task = newTask;
      localStorage.setItem("Tasks", JSON.stringify(tasks));
    }
  }
}
