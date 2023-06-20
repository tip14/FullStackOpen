import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (blog, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(baseUrl, blog, { headers });
  return response.data;
};

const updateBlog = async (blog, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.put(baseUrl + `/${blog.id}`, blog, { headers });
  return response.data;
};

const deleteBlog = async (blogId, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await axios.delete(baseUrl + `/${blogId}`, { headers });
};

export default { getAll, createBlog, updateBlog, deleteBlog };
