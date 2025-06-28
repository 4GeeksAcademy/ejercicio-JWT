const apiUrl = import.meta.env.VITE_BACKEND_URL;



export const publicFetch = async (endpoint, method = "GET", body = null) => {
  let params = { method, headers: {} };
  if (body) {
    params.body = JSON.stringify(body);
    params.headers["Content-Type"] = "application/json";
  }
  try {
    let response = await fetch(apiUrl + endpoint, params);
    if (response.status >= 500) {
      console.error(response.status, response.statusText);
      return null;
    }
    if (response.status >= 400) {
      let { msg } = await response.json();
      console.error(response.status, response.statusText);
      return msg;
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const privateFetch = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token")
  const headers = {
    "Content-Type": "application/json",
    Authorization: Bearer  `${token}`,
  };
  const config = {
method,
headers,
body: body ? JSON.stringify(body) : null,
};

try {
const res = await fetch(apiUrl + endpoint, config);
return await res.json();
} catch (err) {
console.error(err);
return null;
}
};
