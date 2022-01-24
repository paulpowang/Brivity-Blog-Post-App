export const getPostCommentsApi = async (postId, setComments) => {
  const hostUrl = "https://brivity-react-exercise.herokuapp.com/";
  const url = hostUrl + `posts/${postId}/comments?page=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    setComments(data.comments);
  } catch (error) {
    console.log(error);
  }
};
