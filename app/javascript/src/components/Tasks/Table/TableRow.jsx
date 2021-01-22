// import React from "react";
// import PropTypes from "prop-types";

// const TableRow = ({ data, showTask, updateTask, destroyTask }) => {
//   return (
//     <tbody className="bg-white divide-y divide-gray-200">
//       {data.map((rowData) => (
//         <tr key={rowData.title}>
//           <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
//             {rowData.title}
//           </td>
//           <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
//             {rowData.user_id}
//           </td>
//           <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
//             <a
//               className="text-indigo-600 hover:text-indigo-900"
//               onClick={() => showTask(rowData.id)}
//             >
//               Show
//             </a>
//           </td>
//           <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
//             <a
//               className="text-indigo-600 hover:text-indigo-900"
//               onClick={() => updateTask(rowData.id)}
//             >
//               Edit
//             </a>
//           </td>
//           <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
//             <a
//               className="text-red-500 hover:text-red-700"
//               onClick={() => destroyTask(rowData.id)}
//             >
//               Delete
//             </a>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   );
// };

// TableRow.propTypes = {
//   data: PropTypes.array.isRequired,
//   destroyTask: PropTypes.func,
//   updateTask: PropTypes.func,
// };

// export default TableRow;

// import React from "react";
// import classnames from "classnames";
// import PropTypes from "prop-types";
// // import { classNames } from "react-select/src/utils";

// const TableRow = ({
//   type = "pending",
//   data,
//   destroyTask,
//   showTask,
//   handleProgressToggle,
// }) => {
//   const isCompleted = type === "completed";
//   const toggledProgress = isCompleted ? "pending" : "completed";

//   return (
//     <tbody className="bg-white divide-y divide-bb-gray-600">
//       {data.map((rowData) => (
//         <tr key={rowData.id}>
//           <td className="px-6 py-4 text-center">
//             <input
//               type="checkbox"
//               checked={isCompleted}
//               className="ml-6 w-4 h-4 text-bb-purple border-gray-300
//                rounded form-checkbox focus:ring-bb-purple cursor-pointer"
//               onChange={() =>
//                 handleProgressToggle({
//                   id: rowData.id,
//                   progress: toggledProgress,
//                 })
//               }
//             />
//           </td>
//           <td
//             className={classnames(
//               "px-6 py-4 text-sm font-medium leading-5 whitespace-no-wrap text-bb-purple",
//               {
//                 "cursor-pointer": !isCompleted,
//               },
//               { "text-opacity-50": isCompleted }
//             )}
//             // className={`"px-6 py-4 text-sm font-medium leading-5 whitespace-no-wrap text-bb-purple"`}
//             onClick={() => !isCompleted && showTask(rowData.id)}
//           >
//             {rowData.title}
//           </td>
//           {!isCompleted && (
//             <td
//               className="px-6 py-4 text-sm font-medium leading-5
//              text-bb-gray-600 whitespace-no-wrap"
//             >
//               {rowData.assigned_user?.name}
//             </td>
//           )}
//           {isCompleted && (
//             <>
//               <td style={{ width: "164px" }}></td>
//               <td className="px-6 py-4 text-center cursor-pointer">
//                 <i
//                   className="text-2xl text-center text-bb-border
//                   transition duration-300 ease-in-out
//                   ri-delete-bin-5-line hover:text-bb-red"
//                   onClick={() => destroyTask(rowData.id)}
//                 ></i>
//               </td>
//             </>
//           )}
//         </tr>
//       ))}
//     </tbody>
//   );
// };

// TableRow.propTypes = {
//   data: PropTypes.array.isRequired,
//   type: PropTypes.string,
//   destroyTask: PropTypes.func,
//   showTask: PropTypes.func,
//   handleProgressToggle: PropTypes.func,
// };

// export default TableRow;

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TableRow = ({
  type = "pending",
  data,
  destroyTask,
  showTask,
  handleProgressToggle,
  starTask,
}) => {
  const isCompleted = type === "completed";
  const toggledProgress = isCompleted ? "pending" : "completed";

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((rowData) => (
        <tr key={rowData.id}>
          <td className="text-center">
            <input
              type="checkbox"
              checked={isCompleted}
              className="ml-6 w-4 h-4 text-bb-purple border-gray-300
                  rounded focus:ring-bb-purple cursor-pointer"
              onChange={() =>
                handleProgressToggle({
                  id: rowData.id,
                  progress: toggledProgress,
                })
              }
            />
          </td>
          <td
            className={classnames(
              "px-6 py-4 text-sm font-medium leading-5 whitespace-no-wrap text-bb-purple",
              {
                "cursor-pointer": !isCompleted,
                "text-opacity-50": isCompleted,
              }
            )}
            onClick={() => !isCompleted && showTask(rowData.id)}
          >
            {rowData.title}
          </td>
          {!isCompleted && (
            <>
              <td
                className="px-6 py-4 text-sm font-medium leading-5
                            text-bb-gray-600 whitespace-no-wrap"
              >
                {rowData.user.name}
              </td>
              <td className="pl-6 py-4 text-center cursor-pointer">
                <i
                  className={classnames(
                    "transition duration-300 ease-in-out text-2xl hover:text-bb-yellow p-1",
                    {
                      "text-bb-border ri-star-line":
                        rowData.status !== "starred",
                    },
                    {
                      "text-white text-bb-yellow ri-star-fill":
                        rowData.status === "starred",
                    }
                  )}
                  onClick={() => starTask(rowData.id, rowData.status)}
                ></i>
              </td>
            </>
          )}
          {isCompleted && (
            <>
              <td style={{ width: "164px" }}></td>
              <td className="pl-6 py-4 text-center cursor-pointer">
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out
                  ri-delete-bin-5-line hover:text-bb-red"
                  onClick={() => destroyTask(rowData.id)}
                ></i>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  destroyTask: PropTypes.func,
  showTask: PropTypes.func,
  handleProgressToggle: PropTypes.func,
};

export default TableRow;
