import axios from 'axios'

export default {
    async list(){
        try{
            const response = await axios.get('/schedule/list')
            return response.data
        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async add(schedule){
        try{
            const response = await axios.post('/schedule/add' , schedule)
            return response.data
        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async delete(index){
        try{
            const response = await axios.delete(`/schedule/delete?index=${index} `)
            return response.data
        }catch (e) { 
            console.log(e)
            throw e 
        }
    },
}