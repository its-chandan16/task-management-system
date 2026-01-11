import axios from "axios";
import { getBasicAuth } from "./AuthApiService";

const API_BASE_URL = "http://localhost:8080/api/v1/tasks";

// Global response error logger
axios.interceptors.response.use(
  response => response,
  error => {
    console.error("API request error:", error);
    return Promise.reject(error);
  }
);

// 🔒 Utility: validate userId
const validateUserId = (userId) => {
  if (!userId) {
    throw new Error("User ID is missing. User is not logged in.");
  }
};

// ✅ Get all tasks
export const retrieveAllTasks = (userId) => {
  validateUserId(userId);
  return axios.get(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: getBasicAuth(),
    },
  });
};

// ✅ Create task
export const createTask = (task, userId) => {
  validateUserId(userId);
  return axios.post(`${API_BASE_URL}/user/${userId}`, task, {
    headers: {
      Authorization: getBasicAuth(),
    },
  });
};

// ✅ Get task by ID
export const retrieveTaskById = (taskId) =>
  axios.get(`${API_BASE_URL}/${taskId}`, {
    headers: {
      Authorization: getBasicAuth(),
    },
  });

// ✅ Update task
export const updateTask = (task, id) =>
  axios.put(`${API_BASE_URL}/${id}`, task, {
    headers: {
      Authorization: getBasicAuth(),
    },
  });

// ✅ Delete task
export const deleteTask = (id) =>
  axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: getBasicAuth(),
    },
  });

// ✅ Mark task done
export const markDone = (id) =>
  axios.patch(`${API_BASE_URL}/${id}/task-done`, null, {
    headers: {
      Authorization: getBasicAuth(),
    },
  });

// ✅ Mark task pending
export const markPending = (id) =>
  axios.patch(`${API_BASE_URL}/${id}/task-pending`, null, {
    headers: {
      Authorization: getBasicAuth(),
    },
  });
