import React, {useState, useEffect, useRef} from "react";
import {API_BASE_URL} from '../utils/API_CONFIG';
import PostItem from "./PostItem";
import {Row, InputNumber, Button} from 'antd';
import PostDeleteModal from "./PostDeleteModal";
import PostCreateModal from "./PostCreateModal";
import PostEditModal from "./PostEditModal";


const PostsCatalog = () => {
    const [postsList, setPostsList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [numberOfPosts, setNumberOfPosts] = useState('');
    const [modal, setModal] = useState({
        message: '',
        isOpen: false
    });
    const [isPostCreateModalOpen, setPostCreateModalOpen] = useState(false);
    const [isPostEditModalOpen, setPostEditModalOpen] = useState(false);
    const [editedPost, setEditedPost] = useState({});
    const [editedPostId, setEditedPostId] = useState('');
    const [userId, setUserId] = useState('');
    const postIdRef = useRef();

    useEffect(() => {
        fetchPostsList();
    },[]);

    useEffect(() => {
        setLoading(true);
        const allPosts = JSON.parse(getPostsFromStorage());
        if (allPosts) {
            const newNumberOfPostFromStorage = allPosts.slice(0, numberOfPosts);
            setPostsList(newNumberOfPostFromStorage);
        }
        setLoading(false);
    }, [numberOfPosts]);

    const getPostsFromStorage = () => {
        return localStorage.getItem('jsonPosts');
    };

    const setPostsToStorage = (posts) => {
        localStorage.setItem('jsonPosts', JSON.stringify(posts));
    };

    const fetchPostsList = async () => {
        try {
            setLoading(true);
            let posts = await JSON.parse(getPostsFromStorage());
            if (!posts) {
                const res = await fetch(API_BASE_URL + '/posts');
                const response = await res.json();
                setPostsToStorage(response);
                posts = await JSON.parse(getPostsFromStorage());
            }
            setPostsList(posts);
        } catch (err) {
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };

    const showModalToDeletePost = () => {
        setModal({
            message: 'Are you sure you want to delete this item?',
            isOpen: true
        });
    };

    const changeNumberOfPosts = (value) => {
        setTimeout(() => {
            setNumberOfPosts(value);
        }, 1000);
    };

    const handleOkDelete = () => {
        const allPosts = JSON.parse(getPostsFromStorage());
        const filteredPosts = allPosts.filter(item => item.id !== postIdRef.current);
        setPostsToStorage(filteredPosts);
        const allPostsAfterDelete = JSON.parse(getPostsFromStorage());
        setPostsList(allPostsAfterDelete);
        setModal({
            message: '',
            isOpen: false
        });
    };

    const handleOkCreateModal = () => {
        setPostCreateModalOpen(false);
    };

    const handleOkEditModal = () => {
        setPostEditModalOpen(false);
    };

    const handleCancelDeleteModal = () => {
        setModal({
            message: '',
            isOpen: false
        });
    };

    const handleCancelEditModal = () => {
        setPostEditModalOpen(false);
    };

    const handleCancelCreateModal = () => {
        setPostCreateModalOpen(false);
    };

    const deletePostItem = (postId) => {
        postIdRef.current = postId;
        showModalToDeletePost();
    };

    const handleCreatePost = (newPostToSave) => {
        const allPosts = JSON.parse(getPostsFromStorage());
        const lastPostId = allPosts.at(-1).id;
        newPostToSave.id = lastPostId + 1;
        allPosts.push(newPostToSave);
        setPostsToStorage(allPosts);
        const allPostsAfterAddNewPost = JSON.parse(getPostsFromStorage());
        setPostsList(allPostsAfterAddNewPost);
    };

    const showFormHandle = () => {
        setPostCreateModalOpen(true);
    };

    const showEditFormHandle = (userId, postId, title, body) => {
        setEditedPost({userId, postId, title, body})
        setEditedPostId(postId);
        setUserId(userId);
        setPostEditModalOpen(true);
    };

    const updatePostHandle = (updatedValues) => {
        const allPosts = JSON.parse(getPostsFromStorage());

        const updatedAllPosts = allPosts.map(item => {
            if (item.id === editedPostId) {
                return {
                    userId: userId,
                    id: editedPostId,
                    title: updatedValues.title,
                    body: updatedValues.body
                };
            }
            return item;
        });

        setPostsToStorage(updatedAllPosts);
        setPostsList(JSON.parse(getPostsFromStorage()));
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="posts-catalog__wrapper">
            <h1>Posts Catalog</h1>

            <div className="posts-catalog__post-number-wrapper">
                <div className="posts-catalog__post-number">
                    <div>
                        <span>Number for posts to show: | { numberOfPosts || 'all'} | : </span>
                    </div>
                    <InputNumber
                        min={1}
                        max={100}
                        value={numberOfPosts}
                        onChange={ changeNumberOfPosts }
                    />
                </div>

                <Button type="primary" onClick={ showFormHandle }>Create new post</Button>
            </div>

            <PostCreateModal
                isPostCreateModalOpen={ isPostCreateModalOpen }
                handleOk={ handleOkCreateModal }
                handleCancel={ handleCancelCreateModal }
                handleCreatePost={ handleCreatePost }
            />

            <PostEditModal
                isPostEditModalOpen={ isPostEditModalOpen }
                handleOk={ handleOkEditModal }
                editedPost={ editedPost }
                updatePostHandle={ updatePostHandle }
                handleCancel={ handleCancelEditModal }
            />

            <PostDeleteModal
                message={ modal.message }
                isPostDeleteModalOpen={ modal.isOpen }
                handleOk={ handleOkDelete }
                handleCancel={ handleCancelDeleteModal }
            />

            <Row gutter={[16, 16]}>
                <>
                    {postsList.length
                        ? postsList.map((item) => (
                            <PostItem
                                userId={item.userId}
                                postId={item.id}
                                key={item.id}
                                title={item.title}
                                body={item.body}
                                deletePostItem={ deletePostItem }
                                showEditFormHandle={ showEditFormHandle }
                            />
                        ))
                        : <div>There are no data</div>
                    }
                </>
            </Row>
        </div>
    )
};

export default PostsCatalog;