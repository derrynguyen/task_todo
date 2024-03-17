import classNames from 'classnames/bind';
import styles from '../styles/popup.module.scss';
import { Col, Row } from 'antd';
let cx = classNames.bind(styles);
const PopupLayout = ({ handleDeleteAll, closePopup }) => {



    return (

        <div className={cx('popup')}>
            <div className={cx('box')}>
                <div className={cx('title')}>
                    <span>Bạn có chắc chắn xóa tất cả các nhiệm vụ?</span>
                </div>
                <div className={cx('center_bottom_end')}>
                    <button onClick={() => handleDeleteAll()}>Xác nhận</button>
                    <button onClick={() => closePopup()} className={cx('close')}>HỦY</button>
                </div>

            </div>
        </div>
    )
}

export default PopupLayout