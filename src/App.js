import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderLayout from './pages/header.layout';
import { v4 as uuidv4 } from 'uuid';
import ListtodoLayout from './pages/listtodo.layout';
import { useEffect, useState } from 'react';
import AddtodoLayout from './pages/addtodo.layout';
import PopupLayout from './pages/popup.layout';
let cx = classNames.bind(styles);

const App = () => {

  const [todo, setTodo] = useState([])
  const [nameTask, setNameTask] = useState('')
  const [activeTag, setActiveTag] = useState(0)
  const [resultFilter, setResultFilter] = useState([])
  const [search, setSearch] = useState('')

  const [isEdit, setIsEdit] = useState({})
  const [editNameTask, setEditNameTask] = useState('')

  const [isPopup, setIsPopup] = useState(false)

  const selectTag = (type) => {
    setActiveTag(type)
    handleSelectOption(type)
  }

  const addToDo = () => {
    try {
      if (!nameTask) {
        toast.error('Vui lòng điền đầy đủ thông tin', {
          position: "bottom-center",
          autoClose: 5000,
        });
        return;
      }

      const newID = uuidv4();

      const newToDo = {
        ID: newID,
        NameTask: nameTask,
        IsProcess: 'UNFINISHED',
      };
      const savedTodo = JSON.parse(localStorage.getItem('todo')) || [];
      const updatedTodo = [...savedTodo, newToDo];

      localStorage.setItem('todo', JSON.stringify(updatedTodo));

      setTodo(updatedTodo);
      setNameTask('');
    } catch (e) {
      console.log(e);
    }
  };


  const deletetToDo = (id) => {
    try {
      const updatedTodo = todo.filter(todoItem => todoItem.ID !== id);

      localStorage.setItem('todo', JSON.stringify(updatedTodo));
      setTodo(updatedTodo);
    } catch (e) {
      console.log(e)
    }
  }

  const handleInputChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleInputChangeAdd = (e) => {
    setNameTask(e.target.value);
  };

  const handleInputEdit = (e) => {
    setEditNameTask(e.target.value);

  };

  const updateTodo = (id) => {
    try {
      const updatedTodo = todo.map(todoItem => {
        if (todoItem.ID === id) {
          switch (todoItem.IsProcess) {
            case 'UNFINISHED':
              return { ...todoItem, IsProcess: 'PROCESSING' };
            case 'PROCESSING':
              return { ...todoItem, IsProcess: 'COMPLETE' };
            default:
              return todoItem;
          }
        }
        return todoItem;
      });

      localStorage.setItem('todo', JSON.stringify(updatedTodo));
      setTodo(updatedTodo);
    } catch (e) {
      console.log(e);
    }
  };

  const updateTodoDown = (id) => {
    try {
      const updatedTodo = todo.map(todoItem => {
        if (todoItem.ID === id) {
          switch (todoItem.IsProcess) {
            case 'COMPLETE':
              return { ...todoItem, IsProcess: 'PROCESSING' };
            case 'PROCESSING':
              return { ...todoItem, IsProcess: 'UNFINISHED' };
            default:
              return todoItem;
          }
        }
        return todoItem;
      });

      localStorage.setItem('todo', JSON.stringify(updatedTodo));
      setTodo(updatedTodo);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSearch = () => {
    const result = todo.filter(item => item.NameTask.includes(search));
    setResultFilter(result)
  }

  const handleSelectOption = (type) => {
    if (type === 1) {
      const result = todo.filter(item => item.IsProcess === 'UNFINISHED')
      setResultFilter(result)
    } else if (type === 2) {
      const result = todo.filter(item => item.IsProcess === 'PROCESSING')
      setResultFilter(result)
    } else if (type === 3) {
      const result = todo.filter(item => item.IsProcess === 'COMPLETE')
      setResultFilter(result)
    } else {
      setResultFilter(todo)

    }
    setSearch('')
  }

  const deleteAll = () => {
    setIsPopup(true)

  }

  const closePopup = () => {
    setIsPopup(false)
  }

  const handleDeleteAll = () => {
    setTodo([])
    setResultFilter([])
    localStorage.setItem('todo', JSON.stringify([]));
    setIsPopup(false)

  }

  const changTypeNameTask = (data) => {
    setIsEdit(prevStates => ({
      ...prevStates,
      [data.ID]: !prevStates[data.ID],
    }));
    setEditNameTask(data.NameTask)
  }


  const doneEditNameTask = (ID) => {
    console.log(ID)
    console.log(editNameTask)

    if (editNameTask != null) {
      try {
        const updatedTodo = todo.map(item => {
          if (item.ID === ID) {
            return {
              ...item,
              NameTask: editNameTask
            };
          }
          return item;
        });

        localStorage.setItem('todo', JSON.stringify(updatedTodo));
        setTodo(updatedTodo);
        setEditNameTask('');
        setIsEdit(prevStates => ({
          ...prevStates,
          [ID]: false
        }));
      } catch (e) {
        console.log(e);
      }
    }
  };


  useEffect(() => {
    handleSelectOption()


  }, [todo]);


  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todo')) || [];
    setTodo(savedTodo);
  }, []);


  return (
    <div className={cx('todo_wapper')}>
      <div className={cx('todo_main')}>
        {
          isPopup ?
            <PopupLayout
              handleDeleteAll={handleDeleteAll}
              closePopup={closePopup}
            /> : null
        }
        <HeaderLayout
          activeTag={activeTag}
          selectTag={selectTag}
          addToDo={addToDo}
          handleSearch={handleSearch}
          search={search}
          handleInputChangeSearch={handleInputChangeSearch}
          deleteAll={deleteAll}

        />

        <ListtodoLayout
          resultFilter={resultFilter}
          updateTodo={updateTodo}
          deletetToDo={deletetToDo}
          isEdit={isEdit}
          changTypeNameTask={changTypeNameTask}
          handleInputEdit={handleInputEdit}
          editNameTask={editNameTask}
          doneEditNameTask={doneEditNameTask}
          updateTodoDown={updateTodoDown}
        />
        <div className={cx('note')}>
          <span>Để cập nhật trạng thái vui lòng bấm vào nút 'Trạng thái'</span>
        </div>
        <AddtodoLayout
          addToDo={addToDo}
          nameTask={nameTask}
          handleInputChangeAdd={handleInputChangeAdd}
        />
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
