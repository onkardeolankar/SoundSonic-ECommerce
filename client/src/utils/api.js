import axios from "axios";

const params = {
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
  },
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_STRAPI_DEV_APP_URL + url,
      params
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// function to make payment request
export const makePaymentRequest = axios.create({
  baseURL: process.env.REACT_APP_STRAPI_DEV_APP_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
  },
});
