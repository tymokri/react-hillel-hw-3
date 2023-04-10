import React from 'react';
import {Button, Form, Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";

const PostEditModal = ({ isPostEditModalOpen, handleOk, editedPost, handleCancel, updatePostHandle }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        updatePostHandle(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Modal
            title="You can update your post"
            open={ isPostEditModalOpen }
            onOk={ () => handleOk(true) }
            onCancel={ handleCancel }
            afterOpenChange={ () => onReset() }
        >
            <Form
                form={ form }
                name="basic"
                initialValues={{
                    remember: true,
                    ["title"]: editedPost.title,
                    ["body"]: editedPost.body,
                }}
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="body"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your description!',
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Update post
                    </Button>

                    <Button htmlType="button" onClick={ onReset }>
                        Reset
                    </Button>

                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PostEditModal;