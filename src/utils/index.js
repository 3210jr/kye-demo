const getLocalDate=(dateString)=>{
    if(dateString){
        try{
            var date = new Date(0); 
            date.setUTCSeconds(dateString);
            const year=date.getFullYear()
            const month=date.getMonth()
            const day=date.getDate()                
            return year+"-"+month+"-"+day;
        }catch(e){
            return "Exception"
        }
    }else{
        return "Error"
    }
   
}

export {getLocalDate}