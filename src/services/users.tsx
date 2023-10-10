async function loginUser(email: string, password: string): Promise<Response> {
  return fetch("https://queen-api-mock.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: email, password: password})
  })
}

async function getUsers() {
  return fetch("https://queen-api-mock.onrender.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
}

async function getUser(id: string): Promise<Response> {
  return fetch(`https://queen-api-mock.onrender.com/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
  })
}

async function createUser(email: string, password: string, role: string): Promise<Response> {
  return fetch("https://queen-api-mock.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: email, password: password, role: role})
  })
}

async function updateUser(id: string, password: string, role: string): Promise<Response> {
  return fetch(`https://queen-api-mock.onrender.com/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({password, role}, (_key, value) => {
      if (value === "" || value === null || value === undefined) return undefined;
      return value;
    })
  })
}

async function deleteUser(id: string): Promise<Response> {
  return fetch(`https://queen-api-mock.onrender.com/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    },
  })
}

export { 
  loginUser, 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser,
}
