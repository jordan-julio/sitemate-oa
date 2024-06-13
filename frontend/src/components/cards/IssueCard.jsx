import React from 'react';
import { Button, Card } from 'antd';

const IssueCard = ({ data }) => {
    const handleEdit = () => {
        console.log('Edit:', data);
    }
    const handleDelete = () => {
        console.log('Delete:', data);
    }
    return (
        <Card title={data.title} style={{ width: 300 }}>
            <p>Description: {data.description}</p>
            <p>Status: {data.status}</p>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </Card>
    );
};

export default IssueCard;