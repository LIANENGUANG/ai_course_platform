import React from 'react';
import { Card, Empty } from 'antd';

const CoursesPage: React.FC = () => {
  return (
    <Card title="我的课程">
      <Empty description="暂无课程" />
    </Card>
  );
};

export default CoursesPage;
