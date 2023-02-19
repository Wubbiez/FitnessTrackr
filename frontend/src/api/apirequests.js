export async function createaUser(username, password) {
  console.log(username, password);
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
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
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const results = await response.json();
    return results;
  } catch (e) {
    throw ("err", e);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const results = await response.json();
    console.log(results);
    if (results.token) {
      const data = {
        token: results.token,
        username: results.username,
      };
      localStorage.setItem("user-token", results.token);
      localStorage.setItem("user-username", results.user.username);
      console.log(data);
      return data;
    }
  } catch (e) {
    throw ("err", e);
  }
}

export async function createActivity(token, name, description) {
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
          name: name,
          description: description,
        }),
      }
    );
    const results = await response.json();
    console.log("Activity Created!")
    return results;
  } catch (err) {
    console.log("failed to make a activity");
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

export async function createRoutine(token, name, goal, isPublic) {
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
          name: name,
          goal: goal,
          isPublic: isPublic,
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
