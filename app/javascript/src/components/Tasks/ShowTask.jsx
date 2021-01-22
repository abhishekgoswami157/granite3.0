// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import Container from "components/Container";
// import PageLoader from "components/PageLoader";
// import tasksApi from "apis/tasks";

// const ShowTask = () => {
//   const { id } = useParams();
//   const [taskDetails, setTaskDetails] = useState([]);
//   const [assignedUser, setAssignedUser] = useState([]);
//   const [pageLoader, setPageLoader] = useState(true);

//   const fetchTaskDetails = async () => {
//     try {
//       const response = await tasksApi.show(id);
//       console.log("TASKS", response);

//       setTaskDetails(response.data.task);
//       setAssignedUser(response.data.assigned_user);
//     } catch (error) {
//       logger.error(error);
//     } finally {
//       setPageLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchTaskDetails();
//   }, []);

//   if (pageLoader) {
//     return <PageLoader />;
//   }

//   return (
//     <Container>
//       {console.log(assignedUser)}
//       <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
//         <span className="text-gray-600">Task Title : </span>{" "}
//         {taskDetails?.title}
//       </h1>
//       <h2 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
//         <span className="text-gray-600">Assigned To : </span>
//         {assignedUser?.name}
//       </h2>
//     </Container>
//   );
// };

// export default ShowTask;

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import tasksApi from "apis/tasks";
import commentsApi from "apis/comments";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Comments from "components/Comments";
import Toastr from "components/Common/Toastr";
import { getFromLocalStorage } from "helpers/storage";

const ShowTask = () => {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const destroyTask = async () => {
    try {
      await tasksApi.destroy(taskDetails.id);
      Toastr.success("Successfully deleted task.");
    } catch (error) {
      logger.error(error);
    } finally {
      history.push("/");
    }
  };

  const updateTask = () => {
    const currentUserId = getFromLocalStorage("authUserId");
    if (parseInt(currentUserId) === taskDetails?.creator_id) {
      history.push(`/tasks/${taskDetails.id}/edit`);
    } else {
      Toastr.error(
        "You are not authorized to edit this task. Only owner of task can perform this action."
      );
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(id);
      setTaskDetails(response.data.task);
      setAssignedUser(response.data.assigned_user);
      setComments(response.data.comments);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("entered create comment handle submit");
    try {
      await commentsApi.create({
        comment: { content: newComment, task_id: id },
      });
      fetchTaskDetails();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between text-bb-gray-600 mt-10">
        <h1 className="pb-3 mt-5 mb-3 text-lg leading-5 font-bold">
          {taskDetails?.title}
        </h1>
        <div className="bg-bb-env px-2 mt-2 mb-4 rounded">
          <i
            className="text-2xl text-center transition duration-300
             ease-in-out ri-delete-bin-5-line hover:text-bb-red mr-2"
            onClick={destroyTask}
          ></i>
          <i
            className="text-2xl text-center transition duration-300
             ease-in-out ri-edit-line hover:text-bb-yellow"
            onClick={updateTask}
          ></i>
        </div>
      </div>
      <h2
        className="pb-3 mb-3 text-md leading-5 text-bb-gray-600
       text-opacity-50"
      >
        <span>Assigned To : </span>
        {assignedUser?.name}
      </h2>
      <Comments
        comments={comments}
        setNewComment={setNewComment}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default ShowTask;
