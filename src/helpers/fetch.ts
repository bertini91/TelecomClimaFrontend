import env from "react-dotenv";

const fetchBasic = async (endpoint: string, config: any = {}) => {
  let { method = "GET", body, headers, params, ...rest } = config || {};
  try {
    headers = { "content-type": "application/json", ...rest };
    if (params && method === "GET") {
      const paramsFromBody = new URLSearchParams(params);
      endpoint = `${env.API_BK}/${endpoint}?${paramsFromBody.toString()}`;
    } else {
      if (method === "GET") {
        endpoint = `${env.API_BK}/${endpoint}`;
      }
    }

    const response = await fetch(endpoint, {
      method,
      headers: headers,
      body: JSON.stringify(body),
      ...rest,
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { fetchBasic };
