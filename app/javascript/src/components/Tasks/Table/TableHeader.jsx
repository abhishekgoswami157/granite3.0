import React from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
          Title
        </th>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
          Assigned To
        </th>
        <th className="px-6 py-3 bg-gray-50"></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
