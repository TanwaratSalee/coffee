const fetchAPI = async (path: string, options?: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    options
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export default fetchAPI;
