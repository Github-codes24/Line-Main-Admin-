import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ icon, title, value, change, changeText, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white shadow-md  border rounded-xl p-4 flex items-center space-x-4"
    >
      <div className={`text-white p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
        <p className={`text-xs font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '▲' : '▼'} {Math.abs(change)}% {changeText}
        </p>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
