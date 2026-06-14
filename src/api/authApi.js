import axios from "axios";

console.log(
  "API URL:",
  import.meta.env.VITE_API_URL
);

export const loginUser = async (
  email,
  password
) => {
  const response = await axios.post(
    "https://api.webcodshop.chtechgiant.com/api/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};