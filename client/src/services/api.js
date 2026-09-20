const API_BASE_URL = "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

export const api = {
  baseURL: API_BASE_URL,

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.errors?.[0]?.msg ||
          "Registration failed."
      );
    }

    return data;
  },

  login: async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  console.log("API LOGIN RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.errors?.[0]?.msg ||
        "Login failed."
    );
  }

  return data;
},

  getMe: async () => {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Unable to fetch user.");
    }

    return data;
  },

  generateTrip: async (tripData) => {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/trips/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tripData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.errors?.[0]?.msg ||
          "Failed to generate trip."
      );
    }

    return data;
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
    });

    const data = await response.json();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return data;
  },
};

export default api;