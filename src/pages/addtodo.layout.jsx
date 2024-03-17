import classNames from 'classnames/bind';
import styles from '../styles/addtodo.module.scss';
import { Col, Row } from 'antd';
let cx = classNames.bind(styles);
const AddtodoLayout = ({ addToDo, nameTask, handleInputChangeAdd }) => {

    return (

        <div className={cx('addtodo')}>
            <Row gutter={[5, 5]}>
                <Col className={cx('input_find')} span={18}>
                    <input
                        placeholder='Thêm nhiêm vụ cần làm'
                        value={nameTask}
                        onChange={handleInputChangeAdd}
                    />
                </Col>
                <Col className={cx('btn_add_wapper')} span={6}>
                    <button className={cx('btn_add')}
                        onClick={() => addToDo()}><span><i className="fa-solid fa-plus"></i>Thêm</span></button>
                </Col>
            </Row>
        </div>
    )
}

export default AddtodoLayout