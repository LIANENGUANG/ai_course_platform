import React from 'react';
import { Card, Typography, Space, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  return (
    <Space direction="vertical" size="large">
      <Card>
        <Typography>
          <Title level={2}>关于我们</Title>
          <Paragraph>
            AI 课程平台是一个专注于人工智能教育的在线学习平台，致力于为学习者提供高质量的 AI 相关课程和学习资源。
          </Paragraph>

          <Title level={3}>我们的使命</Title>
          <Paragraph>
            通过优质的课程内容和智能化的学习体验，帮助每一位学习者掌握 AI 技术，推动人工智能技术的普及和应用。
          </Paragraph>

          <Divider />

          <Title level={3}>核心价值观</Title>
          <Paragraph>
            <ul>
              <li><strong>专业</strong>：提供业界领先的 AI 课程内容</li>
              <li><strong>创新</strong>：持续探索更好的教学方法和技术</li>
              <li><strong>开放</strong>：构建开放共享的学习社区</li>
              <li><strong>实践</strong>：注重理论与实践相结合</li>
            </ul>
          </Paragraph>

          <Divider />

          <Title level={3}>团队介绍</Title>
          <Paragraph>
            我们的团队由来自顶尖科技公司和高校的 AI 专家、资深工程师和教育专家组成，
            拥有丰富的 AI 研发经验和教学经验。
          </Paragraph>
        </Typography>
      </Card>
    </Space>
  );
};

export default AboutPage;
