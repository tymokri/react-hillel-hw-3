import React from 'react';
import {Modal} from "antd";

const PostDeleteModal = ({ message, handleOk, handleCancel, isPostDeleteModalOpen}) => {
    return (
        <Modal
            open={ isPostDeleteModalOpen }
            onOk={ () => handleOk(true) }
            onCancel={ handleCancel }
        >
            <p>{ message }</p>
        </Modal>
    );
};

export default PostDeleteModal;