const fetchResults = async(url: string): Promise<any> => {
  try {
    const response = await fetch(url);

    return response.json();
  } catch(error) {
    throw new Error(error);
  }
};

export default fetchResults;
