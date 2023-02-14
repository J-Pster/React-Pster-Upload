import axios from "axios";

export const axiosPost = (file: File, endpoint: string): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const responseNormalizer = (
  response: any,
  error: any,
  file: File
): any => ({
  file,
  error,
  response,
});
