import http, { baseUrl } from "./http";

const getLinks = async (category) => {
  const response = await http.get(`${baseUrl}/external-links/${category}`);
  if (response.ok) return await response.json();
  return null;
};

const externalLink = {
  getLinks,
};

export default externalLink;
