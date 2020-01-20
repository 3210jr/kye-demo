import moment from 'moment'

const getLocalDate=(dateString)=>{
    if(dateString){
        try{
            const localDate=moment.unix(dateString).format('YYYY-MM-DD')            
            return localDate
        }catch(e){
            return "Exception"
        }
    }else{
        return "Error"
    }
   
}

export {getLocalDate}