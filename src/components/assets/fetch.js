import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.REACT_APP_TOKEN;
const MY_ID = process.env.REACT_APP_MY_ID;
// const ENDPOINT =process.env.REACT_APP_API_URL;
// const TOKEN =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM1MzExZDcwNDBkZjAwMTU4NWM4MDIiLCJpYXQiOjE2MjY3NzE4OTQsImV4cCI6MTYyNzk4MTQ5NH0.qQBwLrP9YhLV6i04gO7-VYpUyY0fHe9U1J9cfptWNi4";
// const MY_ID = "60c73bf1291930001560aba3";

const endpoint = "https://striveschool-api.herokuapp.com/api/";

// const headers = {  headers: {
//   Authorization: `Bearer ${TOKEN}`,
// },}

// Profiles functions
export const getProfiles = async (callback) => {
  try {
    const response = await fetch(`${endpoint}/profile/`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProfileById = async (id, callback) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (payload, pictureFile = null) => {
  try {
    await fetch(`https://striveschool-api.herokuapp.com/api/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    if (pictureFile) {
      const imgResponse = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${MY_ID}/picture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: pictureFile,
        }
      );
      console.log(imgResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

// Experiences functions
export const addExperience = async (payload) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${MY_ID}/experiences`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const addEditExperience = async (
  experienceId = "",
  payload,
  pictureFile = null
) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${MY_ID}/experiences/${experienceId}`,
      {
        method: experienceId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    if (pictureFile) {
      const imgResponse = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${MY_ID}/experiences/${data._id}/picture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: pictureFile,
        }
      );
      console.log(imgResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExperiencesById = async (id, callback) => {
  const userId = id === "me" ? MY_ID : id;
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteExperience = async (experienceId) => {
  try {
    await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${MY_ID}/experiences/${experienceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Posts functions
export const addPost = async (textPayload, imgPayload = null) => {
  try {
    const textResponse = await fetch(
      `https://striveschool-api.herokuapp.com/api/posts/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(textPayload),
      }
    );
    const data = await textResponse.json();
    console.log(data);
    if (imgPayload) {
      const imgResponse = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${data._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: imgPayload,
        }
      );
      console.log(imgResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (callback) => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/posts/",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId, callback) => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};
export const editPost = async (postId, payload, imgFile = null) => {
  try {
    await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    if (imgFile) {
      const imgResponse = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: imgFile,
        }
      );
      console.log(imgResponse);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId) => {
  try {
    await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Comments
// FETCH ALL COMMENTS OF POST
// GET
// export const getComments = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// POST - only current user
// export const postComments = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// DELETE -only author

// export const deleteComment = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments/${comment_id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
// if(response.ok){
//   alert("Post Deleted")
// } else{
//   alert("Could Not Delete")
// }
//   } catch (error) {
//     console.log(error);
//   }
// };

// UPDATE - only author

// export const updateComment = async (postID) => {
//   try {
//     await fetch(`${endpoint}/posts/${post_id}/comments/${comment_id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// LIKES GET

// export const getLikes = async (postId) => {
//   try {
//     const res = await fetch(`${endpoint}/posts/${postId}/likes`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log("get all likes", data.likes);
//       const totalLikes = data.likes.length;
//       console.log(totalLikes);
//     }
//   } catch (error) {}
// };

export const postLikes = async (postId) => {
  try {
    const res = await fetch(`${endpoint}/posts/${postId}/likes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
