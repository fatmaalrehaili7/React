 const Products = [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "location": "Saudi Arabia",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
   
    },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "location": "Saudi Arabia",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
   
  }];
const Product = () => {
    return  <> 
    <h1>Real Estat Website</h1>

  <article> 
    <h3> {Products[0].title}</h3>
    <p>Price:{Products[0].price} </p>
    <p> {Products[0].location}</p>
    <img src={Products[0].image} alt={Products[0].title}/>
  </article>
  <article> 
    <h3> {Products[1].title}</h3>
    <p>Price:{Products[1].price} </p>
    <p> {Products[1].location}</p>
    <img src={Products[1].image} alt={Products[1].title}/>
  </article>
   <article> 
    <h3> {Products[1].title}</h3>
    <p>Price:{Products[1].price} </p>
    <p> {Products[1].location}</p>
    <img src={Products[1].image} alt={Products[1].title}/>
  </article>
   <article> 
    <h3> {Products[1].title}</h3>
    <p>Price:{Products[1].price} </p>
    <p> {Products[1].location}</p>
    <img src={Products[1].image} alt={Products[1].title}/>
  </article>

  </>
}
  export default Product;