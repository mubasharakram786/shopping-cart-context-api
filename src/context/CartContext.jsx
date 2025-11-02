import { useState,useContext,useEffect,createContext } from "react";

export const CartContext = createContext()

export function CartProvider({children}){
    const [cart, setCart] = useState(()=>{
      let cartItems = window.localStorage.getItem('cart')
       return cartItems ? JSON.parse(cartItems) : []
    })

    const addToCart = (product) =>{
        setCart((prev)=>{
            const existing = prev?.find((item)=>item.id === product.id)

            if(existing){
                return prev.map((item)=> item.id === product.id ? {...item, qty: item.qty + 1 }: item)
            }
               return [...prev , {...product, qty:1}]
            
        } )
    }
    const removeFromCart = (id) =>{
        setCart((prev)=> prev.filter((item)=> item.id !== id))
    }
    const clearCart = () => setCart([])

    useEffect(()=>{
        window.localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    return(
        <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}