import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import IssueForm from '../forms/IssueForm';

const IssueCard = ({ data, handleEditData, refetch }) => {
    const [visible, setVisible] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const handleEdit = () => {
        setVisible(true);
    }
    const handleDelete = async () => {
        const response = await fetch(`/api/issues/${data.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('deleted');
            setDelModal(false);
            refetch();
        }
    }

    const openDeleteModal = () => {
        setDelModal(true);
    }
    return (
        <>
        <Modal open={delModal} footer={
            <>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={() => setDelModal(false)}>No</Button>
            </>
        }>
            <p>Are you sure you want to delete this issue?</p>
        </Modal>
        <IssueForm visible={visible} setVisible={setVisible} issue={data} refetchData={refetch} />
        <Card title={data.title} style={{ width: 300 }}>
            <p>Description: {data.description}</p>
            <p>Status: {data.status}</p>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={openDeleteModal}>Delete</Button>
        </Card>
        </>
    );
};

export default IssueCard;