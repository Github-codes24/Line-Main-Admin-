import React from 'react';
import { FiEye } from 'react-icons/fi';

const DashboardTable = ({ title, headers, data, actionLink }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full border border-[#616666]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-bold">{title}</h3>
        <a href="/" className="text-teal-600 text-sm hover:underline">
          {actionLink || "See All"}
        </a>
      </div>
      <div className="overflow-x-auto border border-[#616666] rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#E0E9E9]">
            <tr>
              {headers.map((head, idx) => (
                <th key={idx} className="px-3 py-2">{head}</th>
              ))}
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="">
                {row.map((cell, i) => (
                  <td key={i} className="px-3 py-2">{cell}</td>
                ))}
                <td className="px-3 py-2">
                  <FiEye className="text-teal-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
