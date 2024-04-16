const reducer = ( state , action )=>{
    switch (action.type) {
        case 'FETCH_ARTICLES':
            return {
            ...state,
            articles: action.payload
            };
        case 'FETCH_ARTICLE':     
            return {
            ...state,
            article: action.payload
            };
        case 'FETCH_BUDGETS':
            return {
            ...state,
            budgets: action.payload
            };
        case 'FETCH_BUDGET':  
            return {
            ...state,
            budget: action.payload
            };
        case 'EDIT_BUDGET':
            return {
            ...state,
             budget: action.payload
            };
        default:
            return state;
    }
} 

const initialState = {
    articles: [],
    article: [],
    budgets: [],
    budget:[]
}

export { reducer, initialState };