import classNames from 'classnames/bind';
import styles from '../styles/listtodo.module.scss';
import { Col, Row } from 'antd';
let cx = classNames.bind(styles);
const ListtodoLayout = ({ resultFilter, updateTodo, deletetToDo, changTypeNameTask, isEdit, handleInputEdit, editNameTask, doneEditNameTask, updateTodoDown }) => {

    return (

        <>
            <div className={cx('header_list')}>
                <span className={cx('text')}>Tên nhiệm vụ</span>
                <span>Trạng thái</span>
                <span className={cx('setting')}>Tùy chọn</span>

            </div>
            <div className={cx('listtodo')}>

                {
                    (resultFilter !== undefined && resultFilter !== null) &&
                    resultFilter.map((item, key) => {
                        return (
                            <div className={cx('box')} key={key}>

                                <span className={cx('title')}>
                                    {!isEdit[item.ID] ? (
                                        item.IsProcess === 'COMPLETE' ? (
                                            <span style={{ textDecoration: 'line-through', color: '#616065' }}>{item.NameTask}</span>
                                        ) : (
                                            <span>{item.NameTask}</span>
                                        )
                                    ) : (
                                        <>
                                            <input className={cx('edit_nametask')} value={editNameTask} onChange={(e) => handleInputEdit(e, item.ID)} />
                                            <i className="fa-regular fa-circle-check" onClick={() => doneEditNameTask(item.ID)} ></i>
                                        </>
                                    )}

                                </span>

                                <span className={cx('tag')}>
                                    {item.IsProcess === 'UNFINISHED' ? <span style={{ backgroundColor: '#fce100' }}>CHƯA HOÀN THÀNH</span> : null}
                                    {item.IsProcess === 'PROCESSING' ? <span style={{ backgroundColor: '#bb9167' }}>ĐANG THỰC HIỆN</span> : null}
                                    {item.IsProcess === 'COMPLETE' ? <span style={{ backgroundColor: '#86ba81' }}>HOÀN THÀNH</span> : null}
                                </span>

                                <span className={cx('handle')}>
                                    <span style={{ backgroundColor: 'white', marginRight: '0.5vh', color: 'black' }} onClick={() => changTypeNameTask(item)}>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </span>
                                    {item.IsProcess === 'UNFINISHED' || item.IsProcess === 'PROCESSING' ?
                                        <span style={{ backgroundColor: '#beb7ea' }} onClick={() => updateTodo(item.ID)}>
                                            <i className="fa-regular fa-circle-up"></i>
                                        </span> : null}

                                    {item.IsProcess === 'UNFINISHED' || item.IsProcess === 'PROCESSING' ?
                                        <span style={{ backgroundColor: '#beb7ea', marginLeft: '0.5vh' }} onClick={() => updateTodoDown(item.ID)}>
                                            <i className="fa-regular fa-circle-down"></i>
                                        </span> : null}

                                    {item.IsProcess === 'COMPLETE' ? <span style={{ backgroundColor: '#86ba81' }}><i className="fa-solid fa-check"></i></span> : null}


                                    <span style={{ backgroundColor: 'red', marginLeft: '0.5vh', color: 'white' }} onClick={() => deletetToDo(item.ID)}>
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </span>
                                </span>

                            </div>
                        );
                    })
                }

            </div>


        </>
    )
}

export default ListtodoLayout