const queryString = (params: any): string => {
  return Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
};

export default queryString;

