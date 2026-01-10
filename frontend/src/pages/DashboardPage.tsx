import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space } from 'antd';
import { BookOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  return (
    <Space direction="vertical" size="large">
      <Title level={1}>欢迎回来！</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="我的课程"
              value={0}
              prefix={<BookOutlined />}
              suffix="门"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="学习时长"
              value={0}
              prefix={<CheckCircleOutlined />}
              suffix="小时"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="完成课程"
              value={0}
              prefix={<UserOutlined />}
              suffix="门"
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default DashboardPage;
