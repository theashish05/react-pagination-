import React,{ useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`)
    const data = await res.json()

    console.log(data);

    if (data && data.products) {
      setProducts(data.products)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  const handleChange = e => {
    setSearch(e.target.value);
  }
  const filteredProducts = products.filter(products =>
    products.title.toLowerCase().includes(search.toLowerCase())
  )

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
      setPage(selectedPage)
    }
  }
  return (
    <div>
      <div className='product-search'>
        <h1>Search the product</h1><br />
      </div>
      <div className='product-input'>
        <input
          type='text'
          onChange={handleChange}
          placeholder='Search'
        />
      </div>

      {products.length > 0 && <div className="products">
        {filteredProducts.slice(page * 10 - 10, page * 10).map((prod) => {
          return <span className="products__single" key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} />
            <span>
              {prod.title}
            </span>
          </span>
        })}
      </div>}

      {products.length > 0 && <div className="pagination">
        <span onClick={() => selectPageHandler(page - 1)} >prev</span>

        {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}

        <span onClick={() => selectPageHandler(page + 1)} >next</span>
      </div>}
    </div>
  );
}

export default App;
