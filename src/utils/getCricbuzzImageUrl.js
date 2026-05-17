const isDevelopment = import.meta.env.DEV;

const getCricbuzzImageUrl = (imageId) => {
  if (isDevelopment) {
    return `/api-images/img/v1/i1/c${imageId}/i.jpg?p=de`;
  }
  return `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg?p=de`;
};

export default getCricbuzzImageUrl;
