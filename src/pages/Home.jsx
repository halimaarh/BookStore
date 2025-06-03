import React from 'react'
import Card from '../components/Card';
import { DollarOutlined, UsergroupAddOutlined, HeartOutlined, LockOutlined } from '@ant-design/icons';
import { RevenueChart, SalesChart } from '../components/charts';

function Home() {
  const stats = [
    { title: 'Total Revenue', price: '$53,000', increase: 30, icon: DollarOutlined },
    { title: 'Total Users', price: '3,200', increase: 25, icon: UsergroupAddOutlined },
    { title: 'Total Likes', price: '+1,200', increase: 15, icon: HeartOutlined },
    { title: 'Total Sales', price: '$13,752', increase: 20, icon: LockOutlined },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <SalesChart />
      </div>
    </div>
  );
}

export default Home