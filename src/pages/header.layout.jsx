import classNames from 'classnames/bind';
import styles from '../styles/header.module.scss';
import { Col, Row } from 'antd';
let cx = classNames.bind(styles);
const HeaderLayout = ({ selectTag, activeTag, handleSearch, search, handleInputChangeSearch, deleteAll }) => {

    return (

        <div className={cx('header')}>
            <div className={cx('title')}>
                <span>TODO LIST</span>
            </div>
            <div className={cx('center')}>
                <Row gutter={[5, 5]}>
                    <Col className={cx('input_find')} span={18}>
                        <input
                            placeholder='Tìm nhiệm vụ'
                            value={search}
                            onChange={handleInputChangeSearch}

                        />
                    </Col>
                    <Col className={cx('btn_add_wapper')} span={6}>
                        <button className={cx('btn_add')}
                            onClick={() => handleSearch()}><span><i className="fa-solid fa-magnifying-glass"></i>Tìm kiếm</span></button>
                    </Col>
                </Row>
                <Row className={cx('btton_selecy')} gutter={[5, 5]}>
                    <Col span={3}>
                        <button
                            style={{ backgroundColor: `${activeTag === 4 ? '#373737' : ''}`, color: `${activeTag === 4 ? 'white' : ''}` }}
                            onClick={() => selectTag(4)}><span>Tất cả</span></button>

                    </Col>
                    <Col span={6}>
                        <button
                            style={{ backgroundColor: `${activeTag === 1 ? '#373737' : ''}`, color: `${activeTag === 1 ? 'white' : ''}` }}
                            onClick={() => selectTag(1)}><span>Chưa hoàn thành</span></button>
                    </Col>
                    <Col span={6}>
                        <button
                            style={{ backgroundColor: `${activeTag === 2 ? '#373737' : ''}`, color: `${activeTag === 2 ? 'white' : ''}` }}
                            onClick={() => selectTag(2)}><span>Đang thực hiện</span></button>

                    </Col>
                    <Col span={5}>
                        <button
                            style={{ backgroundColor: `${activeTag === 3 ? '#373737' : ''}`, color: `${activeTag === 3 ? 'white' : ''}` }}
                            onClick={() => selectTag(3)}><span>Hoàn thành</span></button>

                    </Col>
                    <Col span={4}>
                        <button
                            onClick={() => deleteAll()}
                            className={cx('delete')}
                        ><span>Xóa tất cả</span></button>

                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default HeaderLayout