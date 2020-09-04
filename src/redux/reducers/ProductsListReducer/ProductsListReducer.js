import mockData from './data';
const dataProductsList = {
    productsList: mockData,
}


const ProductsListReducer = (state = dataProductsList, action) => {
    switch (action.type) {
        case 'DENIED':
            const productsTick = action.productsTick;
            console.log(productsTick);
            return state;

        default:
            return state
    }
}

export default ProductsListReducer;