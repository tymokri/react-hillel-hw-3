import React from 'react';
import {Button, Form, Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";

const PostCreateModal = ({ isPostCreateModalOpen, handleOk, handleCancel, handleCreatePost }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        handleCreatePost(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Modal
            title="You can create your post"
            open={ isPostCreateModalOpen }
            onOk={ () => handleOk(true) }
            onCancel={ handleCancel }
        >
            <Form
                form={ form }
                name="basic"
                initialValues={{
                    remember: true,
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
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>

                    <Button htmlType="button" onClick={ onReset }>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PostCreateModal;