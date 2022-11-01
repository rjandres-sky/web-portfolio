const initial = () => {

}
const ReducerDocuments = (state = [], action) => {
    

    switch (action.type) {
        case 'LOAD':
            fetch("http://localhost:4000/documents")
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    return {...state, result}
                })
                .catch([])

        default:
            return state;
    }
}

export default ReducerDocuments;