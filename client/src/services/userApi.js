import API from "./axios";

export const getProfile = () => {
  return API.get("/users/profile");
};

export const updateProfile = (data) => {
  return API.put("/users/profile", data);
};

export const uploadResume = (formData) => {
  return API.post("/users/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};