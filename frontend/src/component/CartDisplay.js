import React from 'react'
import {TbPlus,TbMinus} from "react-icons/tb"
import {AiFillDelete} from "react-icons/ai"
import {useDispatch} from "react-redux";
import { deleteCartItem,increaseQty,decreaseQty} from '../redux/productSlide';


const CartDisplay = ({id,name,image,category,price,qty,total}) => {
  const dispatch =useDispatch()
  return (
    <div className='bg-slate-200 flex p-2 gap-4 rounded border border-slate-300'>
      <div className='p-3 bg-white rounded overflow-hidden'>
        <img src={image} className='h-28 w-40 object-cover'/>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className='flex justify-between'>
        <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
          {name}
        </h3>
        <div className='cursor-pointer text-slate-700 hover:text-red-500' onClick={()=>dispatch(deleteCartItem(id))}>
        <AiFillDelete/>
        </div>
        </div>
        <p className="text-slate-500 font-medium text-2xl">
          {category}
        </p>
        <p className="font-bold md:text-2xl">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>

        <div className='flex justify-between'>
        <div  className="items-center flex gap-3">
        <button onClick={()=>dispatch(increaseQty(id))} className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400'><TbPlus/></button>
        <p className='font-semibold p-1'>{qty}</p>
        <button onClick={()=>dispatch(decreaseQty(id))} className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400'><TbMinus/></button>
        </div>
        <div className='flex items-center gap-2 font-bold text-slate-700'>
          <p>Total :</p>
          <p><span className="text-red-500">₹</span>{total}</p>
        </div>
        </div>

        </div>

    </div>
  )
}

export default CartDisplay
