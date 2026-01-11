import React from 'react';
import { Card, Typography, Space, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const PrivacyPage: React.FC = () => {
  return (
    <Space direction="vertical" size="large">
      <Card>
        <Typography>
          <Title level={2}>隐私政策</Title>
          <Paragraph>
            最后更新日期：2026年1月11日
          </Paragraph>
          <Paragraph>
            AI 课程平台（以下简称"我们"）非常重视用户的隐私保护。本隐私政策旨在帮助您了解我们如何收集、使用、存储和保护您的个人信息。
          </Paragraph>

          <Divider />

          <Title level={3}>1. 信息收集</Title>
          <Paragraph>
            我们收集的信息包括：
            <ul>
              <li><strong>账户信息</strong>：用户名、邮箱、密码（加密存储）</li>
              <li><strong>个人资料</strong>：昵称、头像、性别、生日等您主动提供的信息</li>
              <li><strong>学习数据</strong>：课程进度、学习时长、测试成绩等</li>
              <li><strong>设备信息</strong>：IP地址、浏览器类型、操作系统等技术信息</li>
            </ul>
          </Paragraph>

          <Divider />

          <Title level={3}>2. 信息使用</Title>
          <Paragraph>
            我们使用收集的信息用于：
            <ul>
              <li>提供和改进我们的服务</li>
              <li>个性化学习体验和推荐</li>
              <li>与您进行沟通和提供客户支持</li>
              <li>保障平台安全和防止欺诈</li>
              <li>遵守法律法规要求</li>
            </ul>
          </Paragraph>

          <Divider />

          <Title level={3}>3. 信息保护</Title>
          <Paragraph>
            我们采用行业标准的安全措施保护您的个人信息，包括：
            <ul>
              <li>数据加密传输（HTTPS/SSL）</li>
              <li>密码加密存储</li>
              <li>访问权限控制</li>
              <li>定期安全审计</li>
            </ul>
          </Paragraph>

          <Divider />

          <Title level={3}>4. 信息共享</Title>
          <Paragraph>
            我们不会出售、出租或以其他方式共享您的个人信息给第三方，除非：
            <ul>
              <li>获得您的明确同意</li>
              <li>法律法规要求</li>
              <li>保护我们的合法权益</li>
            </ul>
          </Paragraph>

          <Divider />

          <Title level={3}>5. 您的权利</Title>
          <Paragraph>
            您有权：
            <ul>
              <li>访问和更新您的个人信息</li>
              <li>删除您的账户和相关数据</li>
              <li>拒绝或撤回某些信息收集</li>
              <li>导出您的个人数据</li>
            </ul>
          </Paragraph>

          <Divider />

          <Title level={3}>6. Cookie 使用</Title>
          <Paragraph>
            我们使用 Cookie 和类似技术来改善用户体验、分析网站流量和记住您的偏好设置。
            您可以通过浏览器设置管理 Cookie。
          </Paragraph>

          <Divider />

          <Title level={3}>7. 联系我们</Title>
          <Paragraph>
            如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
            <br />
            邮箱：privacy@ai-course-platform.com
          </Paragraph>
        </Typography>
      </Card>
    </Space>
  );
};

export default PrivacyPage;
