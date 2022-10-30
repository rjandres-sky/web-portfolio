import { useEffect } from "react"

const ReducerDocuments = (state = [{}], action) => {
    console.log(action.type)

    switch (action.type){
        case 'LOAD' :
            
            

        default:
            return state;
    }
}

export default ReducerDocuments;