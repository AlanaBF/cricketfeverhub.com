const getCricbuzzImageUrl = (imageId) => {
  if (import.meta.env.DEV) {
    return `/api-images/img/v1/i1/c${imageId}/i.jpg?p=de`;
  }
  return `/api/image?id=${imageId}`;
};

export default getCricbuzzImageUrl;
