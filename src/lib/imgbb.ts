export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiUrl =
    process.env.NEXT_PUBLIC_IMGBB_API_URL || "https://api.imgbb.com/1/upload";
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing in environment variables.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${apiUrl}?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result?.success) {
    throw new Error(result?.error?.message || "Failed to upload image.");
  }

  return result.data.display_url || result.data.url;
}