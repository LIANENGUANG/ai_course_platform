import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space, theme } from 'antd';
import { BookOpen, User, CheckCircle } from 'lucide-react';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Space direction="vertical" size="large">
      <Title level={1}>欢迎回来！</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="我的课程"
              value={0}
              prefix={<BookOpen size={token.fontSizeXL} />}
              suffix="门"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="学习时长"
              value={0}
              prefix={<CheckCircle size={token.fontSizeXL} />}
              suffix="小时"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="完成课程"
              value={0}
              prefix={<User size={token.fontSizeXL} />}
              suffix="门"
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default DashboardPage;
