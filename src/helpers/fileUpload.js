export const fileUpload = async (file) => {
  const cloudApi = "https://api.cloudinary.com/v1_1/djiflv5jq/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal-demo");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudApi, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const parsedResp = await resp.json();
      return parsedResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {}
};
