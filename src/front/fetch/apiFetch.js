const apiUrl = import.meta.env.VITE_BACKEND_URL;



export const publicFetch = async (endpoint, method = "GET", body = null) => {
  let params = { method, headers: { "Access-Control-Allow-Origin": "*" } };
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

export const privateFetch = async () => {};
