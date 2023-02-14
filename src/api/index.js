import axios from "axios";

export const BASE_URL = "https://strangers-things.herokuapp.com";
export const COHORT_NAME = "2209-FTB-ET-WEB-PT";

export async function registerUser(username, password) {
  try {
    await fetch(`${BASE_URL}/api/${COHORT_NAME}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
  } catch (e) {
    throw ("err", e);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/${COHORT_NAME}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const results = await response.json();
    if (results.data.token) {
      localStorage.setItem("user-token", results.data.token);
      return localStorage.getItem("user-token");
    }
  } catch (e) {
    throw ("err", e);
  }
}

export async function loginValidate(token) {
  try {
    const response = await axios.get(`${BASE_URL}/api/${COHORT_NAME}/test/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response;
    return results;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchAllPosts(token) {
  try {
    const response = await axios.get(`${BASE_URL}/api/${COHORT_NAME}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response;
    return results;
  } catch (e) {
    console.error(e);
  }
}

export async function createPost(
  token,
  title,
  description,
  price,
  willDeliver,
  location
) {
  try {
    await fetch(`${BASE_URL}/api/${COHORT_NAME}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: `${title}`,
          description: `${description}`,
          price: `${price}`,
          willDeliver: `${willDeliver}`,
          location: `${location}`,
        },
      }),
    });
  } catch (e) {
    console.error(e);
  }
}

export async function fetchUserPosts(token) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/${COHORT_NAME}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const results = await response;
    return results;
  } catch (e) {
    console.error(e);
  }
}

export async function deletePost(token, postId) {
  try {
    await axios.delete(`${BASE_URL}/api/${COHORT_NAME}/posts/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function editPost(
  token,
  postId,
  title,
  description,
  price,
  location,
  willDeliver
) {
  try {
    console.log(location);
    const response = await fetch(
      `${BASE_URL}/api/${COHORT_NAME}/posts/${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          post: {
            title: `${title}`,
            description: `${description}`,
            location: `${location}`,
            price: `${price}`,
            willDeliver: `${willDeliver}`,
          },
        }),
      }
    );
    const results = await response;
    console.log(results);
  } catch (e) {
    console.error(e);
  }
}

export async function getUser(token) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/${COHORT_NAME}/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const results = await response;
    if (results.data.data.username) {
      localStorage.setItem("user-name", results.data.data.username);
      return localStorage.getItem("user-name");
    }
  } catch (e) {
    console.log(
      "User is not logged in, guest will experience limited functionality until login."
    );
  }
}

export async function getPost(token, postId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/${COHORT_NAME}/posts/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const results = await response;
    return results;
  } catch (e) {
    console.error(e);
  }
}

export async function postMessage(token, postId, messageText) {
  fetch(`${BASE_URL}/api/${COHORT_NAME}/posts/${postId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: {
        content: messageText,
      },
    }),
  })
    .then((response) => response.json())
    .catch(console.error);
}
