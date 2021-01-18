// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import tasksApi from "apis/tasks";
// import PageLoader from "components/PageLoader";
// import Container from "components/Container";

// const ShowTask = () => {
//   const { id } = useParams();
//   let [taskDetails, setTaskDetails] = useState([]);
//   let [pageLoading, setPageLoading] = useState(true);
//   const fetchTaskDetails = async () => {
//     try {
//       const response = await tasksApi.show(id);
//       setTaskDetails(response.data.task);
//     } catch (error) {
//       logger.error(error);
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTaskDetails();
//   });

//   if (pageLoading) {
//     return <PageLoader />;
//   }

//   return (
//     <Container>
//       <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
//         <span className="text-gray-600">Task Title : </span>{" "}
//         {taskDetails?.title}
//       </h1>
//     </Container>
//   );
// };

// export default ShowTask;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import tasksApi from "apis/tasks";

const ShowTask = () => {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(id);
      console.log("TASKS", response);
      setTaskDetails(response.data.task);
      setAssignedUser(response.data.assigned_user);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoader(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoader) {
    return <PageLoader />;
  }

  return (
    <Container>
      {console.log(assignedUser)}
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        <span className="text-gray-600">Task Title : </span>{" "}
        {taskDetails?.title}
      </h1>
      <h2 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        <span className="text-gray-600">Assigned To : </span>
        {assignedUser?.name}
      </h2>
    </Container>
  );
};

export default ShowTask;
