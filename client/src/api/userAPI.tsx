import Auth from '../utils/auth';

const retrieveUsers = async () => {
  const token = Auth.getToken();

  if (!token) {
    console.error("No token found, user is not authenticated");
    return [];
  }

  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };

