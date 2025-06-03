import { DollarOutlined } from '@ant-design/icons';

const Card = ({ title, price, increase, icon: Icon = DollarOutlined }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4 mb-4">
        <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
        <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
          <Icon className="!text-white text-2xl" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-2xl font-bold text-gray-800">{price}</span>
        <div className="flex items-center gap-1">
          <span className="text-green-500 text-sm font-medium">+{increase}%</span>
          <span className="text-gray-400 text-xs">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
