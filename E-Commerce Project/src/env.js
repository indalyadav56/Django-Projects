export const domain = "https://radiant-sands-47079.herokuapp.com";
export const API = "https://radiant-sands-47079.herokuapp.com/api";

// import Cookies from "js-cookie";

/*
    window.localStorage.setItem('myCat', 'Tom');
    window.localStorage.removeItem('myCat');
    window.localStorage.clear();
    window.localStorage.getItem("token");
    */
const token = window.localStorage.getItem("token");
// const csrftoken = Cookies.get("csrftoken");

export const getheader = {
  Authorization: `Bearer ${token}`,
};

// export const postheader = {
//   "X-CSRFToken": csrftoken,
// };

// export const posttokenheader = {
//   Authorization: `token ${token}`,
//   "X-CSRFToken": csrftoken,
// };
