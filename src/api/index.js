import { create } from 'apisauce'

const api = create({
  baseURL: 'https://192.168.100.135:3000/',
  headers: { 
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


export const getData = async () => {
  await api.get('/').then((res) => console.log(res));

}