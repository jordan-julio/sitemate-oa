import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const IssueForm = ({ visible, setVisible, refetchData, issue }) => {
  const [form] = Form.useForm();

  // Close the modal
  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  // Function to handle form submission
  const onCreateOrUpdate = async (values) => {
    const method = issue ? "PUT" : "POST";
    const endpoint = issue ? `/api/issues/${issue.id}` : "/api/issues";
    const payload = { ...values };

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        form.resetFields();
        setVisible(false);
        refetchData(); // Assuming this function fetches the latest issues list
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (issue && visible) {
      form.setFieldsValue({
        title: issue.title,
        description: issue.description,
        status: issue.status,
      });
    }
  }, [issue, form, visible]);

  return (
    <Modal
      open={visible}
      title="Create a new issue"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreateOrUpdate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          status: "open",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of the issue!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the description of the issue!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select>
            <Select.Option value="open">Open</Select.Option>
            <Select.Option value="closed">Closed</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IssueForm;