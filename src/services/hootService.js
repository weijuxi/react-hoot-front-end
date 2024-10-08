  const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;


  const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error, '<--------------------error in');
    }
  };

  const show = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error, '<--------------------error in');
    }
  }


  const create = async (formData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error, '<--------------------error in create hoot services');
    }
  }

  const createComment = async (formData, hootId) => {
    try {
      const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error, '<--------------------error in create comment services');
    }
  }
  
  export { index, show , create, createComment };