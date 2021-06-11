import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { HiMoon, HiSun, HiX, HiCheck } from 'react-icons/hi'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Todo = ({ todo, toggleTodo, removeTodo, index }) => {
  return (
    <Draggable index={index} draggableId={todo.id}>
      {provided => (
        <div
          className='flex items-center p-5 border-b dark:border-gray-700 text-gray-600 dark:text-gray-400 flex-wrap'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 ${
              todo.completed && 'bg-gradient-to-br from-blue-400 to-purple-400'
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            <HiCheck
              className={`text-bold text-white ${
                todo.completed ? 'block' : 'hidden'
              }`}
            />
          </div>
          <h3
            className={`ml-4 flex-1 ${
              todo.completed && 'line-through text-gray-300 dark:text-gray-700'
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.name}
          </h3>
          <button
            className='ml-auto px-2 text-xl'
            onClick={() => removeTodo(todo.id)}
          >
            <HiX />
          </button>
        </div>
      )}
    </Draggable>
  )
}

const TODOS = [
  { id: '1', name: 'Complete online JavaScript course', completed: true },
  { id: '2', name: 'Jog around the park 3x', completed: false },
  { id: '3', name: '10 minutes meditation', completed: false },
  { id: '4', name: 'Read for 1 hour', completed: false },
  { id: '5', name: 'Pick up groceries', completed: false },
  {
    id: '6',
    name: 'Complete Todo App on Frontend Mentor',
    completed: true,
  },
]

const TABS = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
}

export default function Home() {
  const [theme, setTheme] = useState('white')
  const [todos, setTodos] = useState(TODOS)
  const [inputVal, setInputVal] = useState('')
  const [activeTabs, setActiveTabs] = useState(TABS.ALL)
  const [uniqueTodos, setUniqueTodos] = useState([])

  useEffect(() => {
    if (typeof window !== undefined) {
      let _theme = window.localStorage.getItem('theme')
      if (_theme === 'dark') {
        document.documentElement.classList.add('dark')
      }
      setTheme(_theme || 'white')
    }
  }, [])

  function toggleTodo(id) {
    let filteredTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(filteredTodos)
  }

  function clearCompletedTodos() {
    let filteredTodos = todos.filter(todo => !todo.completed)
    setTodos(filteredTodos)
  }

  function toggleTheme() {
    if (typeof window !== undefined) {
      let _theme = theme === 'white' ? 'dark' : 'white'
      window.localStorage.setItem('theme', _theme)
      if (_theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      setTheme(_theme)
    }
  }

  function addTodo(e) {
    e.preventDefault()
    if (!inputVal) return
    let id = nanoid(8)
    let newTodo = { id, name: inputVal, completed: false }
    setTodos(prevTodos => [...prevTodos, newTodo])
    if (activeTabs === TABS.ACTIVE) {
      setUniqueTodos(prevTodos => {
        let activeTodos = prevTodos.filter(todo => !todo.completed)
        return [...activeTodos, newTodo]
      })
    }
    setInputVal('')
  }

  function removeTodo(id) {
    let filteredTodos = todos.filter(todo => todo.id !== id)
    setTodos(filteredTodos)
    setUniqueTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id)
    })
  }

  function switchTab(state) {
    setActiveTabs(state)
    switch (state) {
      case TABS.COMPLETED:
        let completedTodos = todos.filter(todo => todo.completed === true)
        setUniqueTodos(completedTodos)
        console.log(completedTodos)
        return
      case TABS.ACTIVE:
        let activeTodos = todos.filter(todo => !todo.completed)
        console.log(activeTodos)
        setUniqueTodos(activeTodos)
        return
      case TABS.ALL:
        setUniqueTodos([])
      default:
        return
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    if (activeTabs === TABS.ACTIVE) {
      let activeTodos = items.filter(todo => !todo.completed)
      setUniqueTodos(activeTodos)
    } else if (activeTabs === TABS.COMPLETED) {
      let completedTodos = items.filter(todo => todo.completed)
      setUniqueTodos(completedTodos)
    } else {
      setTodos(items)
    }
  }

  return (
    <div className='w-full bg-white dark:bg-gray-900 min-h-screen'>
      <main className='relative z-10 w-98% max-w-5xl mx-auto p-5'>
        <div className='flex mt-10 justify-between items-center'>
          <h1 className='font-bold text-3xl text-white uppercase'>Todo</h1>
          <button className='p-2 text-xl text-white' onClick={toggleTheme}>
            <HiSun className='hidden dark:block' />
            <HiMoon className='block dark:hidden' />
          </button>
        </div>

        <form
          onSubmit={addTodo}
          className='px-5 py-3 bg-white shadow-lg mt-6 rounded-md font-bold flex gap-2 items-center text-gray-400 dark:bg-gray-800 dark:text-gray-500'
        >
          <div className='flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700' />
          <input
            type='text'
            maxLength='100'
            placeholder='Create a new todo...'
            onChange={e => setInputVal(e.target.value)}
            value={inputVal}
            className='flex-1 py-2 px-2 border-0 bg-transparent ml-1 focus:text-gray-700 dark:focus:text-gray-300'
          />
        </form>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='draggableTodo'>
            {provided => (
              <div
                className='flex flex-col rounded-t-md mt-10 bg-white dark:bg-gray-800 shadow-lg'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {(activeTabs !== TABS.ALL ? uniqueTodos : todos).map(
                  (todo, index) => (
                    <Todo
                      key={todo.id}
                      toggleTodo={toggleTodo}
                      todo={todo}
                      removeTodo={removeTodo}
                      index={index}
                    />
                  )
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className='p-5 flex justify-between items-center text-gray-400 bg-white dark:bg-gray-800 rounded-b-md shadow-lg b'>
          <span>
            {(activeTabs !== TABS.ALL ? uniqueTodos : todos).length} items left
          </span>
          <button onClick={clearCompletedTodos}>Clear Completed</button>
        </div>

        <div className='p-5 bg-white shadow-lg mt-6 rounded-md font-bold flex gap-2 items-center justify-center text-gray-400 dark:bg-gray-800 dark:text-gray-500'>
          <button
            className={`font-bold ${
              activeTabs === TABS.ALL && 'text-blue-500'
            }`}
            onClick={() => switchTab(TABS.ALL)}
          >
            All
          </button>
          <button
            className={`font-bold ${
              activeTabs === TABS.ACTIVE && 'text-blue-500'
            }`}
            onClick={() => switchTab(TABS.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`font-bold ${
              activeTabs === TABS.COMPLETED && 'text-blue-500'
            }`}
            onClick={() => switchTab(TABS.COMPLETED)}
          >
            Completed
          </button>
        </div>
      </main>

      <div className='absolute top-0 left-0 right-0 h-2/6 bg-purple-400 bg-mobile-light dark:bg-mobile-dark lg:bg-desktop-light dark:lg:bg-desktop-dark bg-cover bg-center bg-no-repeat w-full z-0' />

      <footer className='pt-2 pb-5 w-full text-center text-gray-400'>
        <span>Drag and drop to order list</span>
      </footer>
    </div>
  )
}
