
const check = {


    checkIf(someMethod){


        return(async()=>{

            try{
                return await someMethod()
            }catch(err){return err}
        })()

    }
}

module.exports = check