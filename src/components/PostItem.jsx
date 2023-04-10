import React from 'react';
import {Button, Card, Col, Space} from 'antd';


const PostItem = ({userId, postId, title, body, deletePostItem, showEditFormHandle}) => {
    const removeHandler = (id) => {
        deletePostItem(id);
    };

    const editFormHandle = (userId, id, title, body) => {
        showEditFormHandle(userId, id, title, body);
    };

    return (
        <Col span={8}>
            <Space className="space-align-block" direction="vertical" size={16}>
                <Card
                    className="posts-catalog_single-post"
                    title={ <p>Post # {postId}</p> }
                >
                    <h3 className="posts-catalog__post-title">{ title }</h3>
                    <p className="posts-catalog__post-description">{ body }</p>

                    <div className="posts-catalog__button-wrapper">
                        <Button onClick={ () => editFormHandle(userId, postId, title, body) }>Edit post</Button>
                        <Button
                            danger
                            onClick={ () => removeHandler(postId) }
                        >
                            Delete post
                        </Button>
                    </div>
                </Card>
            </Space>
        </Col>
    );
};

export default PostItem;

