import client from "./axiosClient"

export const getTodos=async(token:string)=>{
    const res=await client.get('/todos',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data.todos;
}