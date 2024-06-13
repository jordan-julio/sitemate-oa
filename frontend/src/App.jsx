import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Row, Col } from "antd";
import IssueForm from "./components/forms/IssueForm";
import IssueCard from "./components/cards/IssueCard";
import { HomeOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function App() {
  const [issues, setIssues] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch issues on mount
  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch("/api/issues");
      const data = await response.json();
      setIssues(data);
    };
    fetchIssues();
  }, []);

  return (
    <Layout className="layout" style={{
      width: '100%',
      height: '100vh',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ width: '100%', padding: '10px' }}>
          <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
        </Menu>
      </div>
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'start', flexGrow: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, padding: '15px' }}>
          <Button type="primary" onClick={() => setModalVisible(true)}>Create Issue</Button>
        </div>
        <IssueForm visible={modalVisible} setVisible={setModalVisible} />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Adjusts based on screen size
          gap: 20,
          marginTop: 20,
          width: '100%',
          padding: '0 15px', // Adds padding on smaller screens
        }}>
          {issues.map((issue) => (
            <IssueCard key={issue.id} data={issue} />
          ))}
        </div>
      </Content>
    </Layout>
  );
}

export default App;