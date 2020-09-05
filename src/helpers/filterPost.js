import toSlug from './toSlug';

export default (posts=Array, pramFilter=Object) => {
    // Sap xep
    let postBy = [...posts];
    switch (pramFilter.sort) {
      case 1:
        // Theo moi nhat
        postBy.sort( (a, b) =>  a.createdAt - b.createdAt).reverse();
        // end
        break;
      
      case 2:
        // Theo cu nhat 
        postBy.sort( (a, b) =>  a.createdAt - b.createdAt);
        // end
        break;
      
      case 3:
        // Theo ten A-Z
        postBy.sort( (a, b) => {
          let x = toSlug(a.name);
          let y = toSlug(b.name);
          if(x < y) {
           return -1;
         }
         if(x > y) {
             return 1;
         }
         // name same same
         return 0;
        });
        // end
        break;
      
      case 4:
        // Theo ten Z-A
        postBy.sort( (a, b) => {
          let x = toSlug(a.name);
          let y = toSlug(b.name);
          if(x < y) {
           return -1;
         }
         if(x > y) {
             return 1;
         }
         // name same same
         return 0;
        }).reverse();
        // end
        break;

      case 5:
        // Theo danh gia cao nhat
        postBy.sort( (a, b) =>  a.rating - b.rating).reverse();
        // end
        break;

      case 6:
        // Theo danh gia thap nhat
        postBy.sort( (a, b) =>  a.rating - b.rating);
        // end
        break;

      default:
        break;
    }
    // 
    return postBy;
}
