import React from 'react';
import { Card, Typography, Space, Descriptions } from 'antd';
import { Mail, Phone, MapPin } from 'lucide-react';

const { Title, Paragraph } = Typography;

const ContactPage: React.FC = () => {
  return (
    <Space direction="vertical" size="large">
      <Card>
        <Typography>
          <Title level={2}>联系我们</Title>
          <Paragraph>
            如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们。我们会尽快回复您的咨询。
          </Paragraph>
        </Typography>
      </Card>

      <Card title="联系方式">
        <Descriptions column={1}>
          <Descriptions.Item label={<><Mail size={16} /> 邮箱</>}>
            support@ai-course-platform.com
          </Descriptions.Item>
          <Descriptions.Item label={<><Phone size={16} /> 电话</>}>
            400-123-4567
          </Descriptions.Item>
          <Descriptions.Item label={<><MapPin size={16} /> 地址</>}>
            北京市海淀区中关村科技园区
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="工作时间">
        <Typography>
          <Paragraph>
            <strong>客服工作时间：</strong>周一至周五 9:00-18:00
          </Paragraph>
          <Paragraph>
            <strong>技术支持：</strong>7×24小时在线
          </Paragraph>
        </Typography>
      </Card>
    </Space>
  );
};

export default ContactPage;
