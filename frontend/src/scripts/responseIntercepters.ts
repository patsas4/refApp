import axios, { type AxiosResponse } from "axios";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

export function dateInterceptor (response: AxiosResponse) {
  function reviveDates(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === "string" && isoDateRegex.test(obj)) {
      return new Date(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map(reviveDates);
    }

    if (typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, reviveDates(v)])
      );
    }

    return obj;
  }

  response.data = reviveDates(response.data);
  return response;
}

export function unauthorizedInterceptor (error: any) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
}
