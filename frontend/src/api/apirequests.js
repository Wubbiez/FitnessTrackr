export async function createaUser(username, password) {
  console.log(username, password);
  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
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

export async function createActivity(token, { name, description }) {
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activity: {
            name,
            description,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });

    console.log(response);
  } catch (err) {
    console.log("failed to make an Activity");
    console.error(err);
  }
}

export async function getAllActivities() {
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.log("failed to get all activities");
    console.error(err);
  }
}

export async function getUsersRoutines(user) {
  try {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/${user}/routines`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.log("failed to get users routines");
    console.error(err);
  }
}

export async function getRoutinesByActivity(activity) {
  try {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities/${activity}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.log("failed to get routines by activity");
    console.error(err);
  }
}

export async function getPublicRoutines() {
  try {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.log("failed to get public routines");
    console.error(err);
  }
}

export async function createRoutine(token, { name, goal, isPublic }) {
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          routine: {
            name,
            goal,
            isPublic,
          },
        }),
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.log("failed to make a Routine");
    console.error(err);
  }
}

export async function createRoutineActivity(
  token,
  { routineId, activityId, count, duration }
) {
  try {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          routineActivity: {
            routineId,
            activityId,
            count,
            duration,
          },
        }),
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.log("failed to make a Routine Activity");
    console.error(err);
  }
}
