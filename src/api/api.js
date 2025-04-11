import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export const fetchCommentById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}/comments`);
    console.log("fetchCommentById", response.data?.[0]);
    return response.data?.[0];
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
}

// export const updatePost = async (id, post) => {
//   try {
//     const response = await api.put(`/comments/${commentId}`, post);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating post with id ${id}:`, error);
//     throw error;
//   }
// }

export const updateComment = async (commentId, post) => {
  try {
    const response = await api.put(`/comments/${commentId}`, post);
    return response?.data;
  } catch (error) {
    console.error(`Error updating post with id ${commentId}:`, error);
    throw error;
  }
}
