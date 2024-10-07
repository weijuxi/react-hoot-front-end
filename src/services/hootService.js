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
  
  export { index, show };