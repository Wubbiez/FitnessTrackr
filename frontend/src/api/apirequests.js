export async function createaUser(username, password) {
  console.log(username, password);
  try {
    await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    alert(password);
  } catch (e) {
    throw ("err", e);
  }
}

export async function getUser(token) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    return results;
  } catch (e) {
    throw ("err", e);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const results = await response.json();
    if (results.token) {
      localStorage.setItem("user-token", results.token);
      return localStorage.getItem("user-token");
    }
  } catch (e) {
    throw ("err", e);
  }
}
