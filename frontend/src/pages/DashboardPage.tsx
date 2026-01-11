import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space } from 'antd';
import { BookOpen, User, CheckCircle } from 'lucide-react';

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
              prefix={<BookOpen size={20} />}
              suffix="门"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="学习时长"
              value={0}
              prefix={<CheckCircle size={20} />}
              suffix="小时"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="完成课程"
              value={0}
              prefix={<User size={20} />}
              suffix="门"
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default DashboardPage;
