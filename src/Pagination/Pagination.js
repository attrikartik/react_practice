import React, { useEffect, useState } from 'react'
import './pagination.css'
const Pagination = () => {
  
  const [products,setProducts] = useState([])
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)

  const fetchData = async() =>{
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`)
    const data = await res.json()
    console.log(data)
    setProducts(data.products || [])
    setTotalPages(data.total / 10|| 0) // diving by 10 because we want 10 prod per page
  }

    useEffect(()=>{
      fetchData()
    },[page])

  const selectPagehandler =(pageIndex)=>{
    pageIndex >=1 && pageIndex <= totalPages && pageIndex !==page&& setPage(pageIndex)
  }
  return (
    <div>
        {
            products?.length > 0&&(
            <div className='products'>
                {
                    products.map(prod=>{
                      return(
                        <span key={prod.id} className='products__single'>
                            <img src={prod.thumbnail} alt={prod.title}/>
                            <span>{prod.title}</span>
                        </span>  
                       )
                    })
                }
                {
                    products?.length > 0 && 
                    <div className='pagination'>
                        <span className={page > 1?'':'pagination__disable'} onClick={()=>selectPagehandler(page-1)}>◀️</span>
                        {
                            [...Array(totalPages)].map((_,indx)=>{
                                console.log(totalPages)
                                return <span className={page===indx+1?'pagination__selected':''} onClick={()=>selectPagehandler(indx+1)} key={indx}>{indx+1}</span>
                            })
                        }
                        <span className={page < totalPages?'':'pagination__disable'} onClick={()=>selectPagehandler(page+1)}>▶️</span>
                    </div>
                }
            </div>)
        }
    </div>
  )
}

export default Pagination