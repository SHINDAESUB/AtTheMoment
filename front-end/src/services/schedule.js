import axios from 'axios'

export default {
    async schedule(){
        try{
            const response = await axios.get('/schedule/')
            return response.data
        }catch (e) { 
            console.log(e)
            throw e 
        }
    },

    async add(reservation){
        try{
            const response = await axios.post('/schedule/reservation' , reservation)
            return response
        }catch (e) { 
            return e.message
        }
    },

    async update(index, reservation){
        try{
            const response = await axios.put(`/schedule/reservation` , {'reservation':reservation , 'index':index}  )
            return response
        }catch (e) { 
            return e.message
        }
    },

    async delete(index){
        try{
            const response = await axios.delete(`/schedule/reservation?index=${index} `)
            return response
        }catch (e) { 
            console.log(e)
            throw e 
        }
    },
}