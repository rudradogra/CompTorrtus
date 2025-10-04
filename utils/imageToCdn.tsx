export const getImagePath = (path: string) => {
  return process.env.NODE_ENV === "production"
    ? `https://menoob-images.b-cdn.net/${path}`
    : `/static${path}`;
};
