import { useState,useEffect , createContext,useContext} from "react";
export const ProductContext = createContext()

export function ProductProvider ({children}){
      const [products,setProducts] = useState([])
      const [loading,setLoading] = useState(true)
      const [error,setError] = useState(null)
    
         useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const res = await fetch('api/products');
        if(!res.ok) throw new Error('Failed to load Products.')
        const data= await res.json();
        setProducts(data)
      } catch (error) {
          setError(error.message)
      }finally{
        setLoading(false)
      }
    }
    fetchProducts()
  },[])

  return(
    <ProductContext.Provider value={{products,loading,error}}>
        {children}
    </ProductContext.Provider>
  )
}


export function useProducts(){
    return useContext(ProductContext)
}