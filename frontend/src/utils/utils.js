const url = "http://localhost:3000/";
const token = `Bearer ${localStorage.getItem('jwt')}`;
export { url, token };
