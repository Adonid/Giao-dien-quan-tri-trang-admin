import mockData from './data';
const dataProductsList = {
    productsList: mockData,
}


const ProductsListReducer = (state = dataProductsList, action) => {
    switch (action.type) {
        case 'DENIED':
            return state;

        default:
            return state
    }
}

export default ProductsListReducer;