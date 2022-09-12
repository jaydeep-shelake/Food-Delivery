import React ,{useState,useEffect,useRef} from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import LeftSide from '../components/LeftSide';
import pizzaBase from '../assests/pizza-base.png'
import html2canvas from "html2canvas";
import { addToCart } from '../actions/cart';
import { useDispatch } from 'react-redux';
import '../styles/pizzbuilder.css'
const CustomPizza = () => {
    const [showVeg,setShowVeg]=useState(true)
    const [showNonVeg,setShowNonVeg]=useState(false)
    const [addedCrust,setAddedCrust]=useState([])
    const [addedToppings,setAddedToppings]=useState([])
    const [activeCrust,setActiveCrust]=useState([])
    const imageRef=useRef()

    const topping =[
        {
            name:'ONION',
            price:30,
            type:"veg",
            img:"/images/onion.png",
            isSelected:false
        },
        {
            name:'MUSHROOM',
            price:55,
            type:"veg",
            img:"/images/mushroom.png",
            isSelected:false

        },
        {
            name:'PANEER',
            price:45,
            type:"veg",
            img:"/images/paneer.png",
            isSelected:false

        },
        {
            name:'GREEN OLIVES',
            price:50,
            type:"veg",
            img:"/images/greenOlives.png",
            isSelected:false

        },
        {
            name:'GOLDEN CORN',
            price:50,
            type:"veg",
            img:"/images/goldenCorn.png",
            isSelected:false
        },
        {
            name:'CAPSICUM',
            price:55,
            type:"veg",
            img:"/images/capsicum.png",
            isSelected:false

        },
        {
            name:"PERI PERI CHICKEN",
            price:50,
            type:"non-veg",
            img:"/images/peri-peri-chiken.png",
            isSelected:false

        },
        {
            name:"BARBEQUE",
            price:55,
            type:"non-veg",
            img:"/images/barbeque.png",
            isSelected:false

        },
        {
            name:"SAUSAGE",
            price:60,
            type:"non-veg",
            img:"/images/chicken-sausage.png",
            isSelected:false
        },
        {
            name:"CHICKEN TIKKA",
            price:65,
            type:"non-veg",
            img:"/images/chiken-tikka.png",
            isSelected:false
        },
        {
            name:"GRILLED CHICKEN RASHER",
            price:70,
            type:"non-veg",
            img:"/images/grilled-chicken-rasher.png",
            isSelected:false
        },
    ]

    const crust=[
        {
            name:'CLASSIC HAND TOSSED',
            price:50,
        },  
        {
            name:'CHEESE BURST',
            price:50,
        },  
        {
            name:'WHEAT THIN CRUST',
            price:50,
        },  
        {
            name:'FRESH PAN',
            price:50,
        },  
    ]

    const [allTopping,setAllTopping]=useState([]) 
    const [toopingPrice,setToppingPrice]=useState(0)
    const [cheesPrice,setCheesPrice]=useState(0)
    const [qty,setQty]=useState(1)
    const dispatch=useDispatch()
    useEffect(()=>{
        setAllTopping(topping.filter((item)=>item.type==="veg"))
    },[])

    const vegTopping=()=>{
      setAllTopping(topping.filter((item)=>item.type==="veg"))
      setShowVeg(true)
      setShowNonVeg(false)
    }

    const nonvegTopping=()=>{
        setAllTopping(topping.filter((item)=>item.type==="non-veg"))
        setShowNonVeg(true)
        setShowVeg(false)
    }

    const handleTopping=(item)=>{
        if(addedToppings.find((itm)=>itm.name===item.name)){
            return setAddedToppings(addedToppings.filter((itm)=>itm.name!==item.name))
        }
      setAddedToppings([...addedToppings,item])
    }

    const handleCrust=(item)=>{
        setActiveCrust(item.name)
        if(addedCrust.find((itm)=>itm.name===item.name)&&activeCrust===item.name){
            return setAddedCrust(addedCrust.filter((itm)=>itm.name!==item.name))
        }
        setAddedCrust([item])
    }

    useEffect(()=>{
      setToppingPrice(addedToppings.reduce((a,b)=>a+b.price,0))
      setCheesPrice(addedCrust.reduce((a,b)=>a+b.price,0))
    },[addedToppings,addedCrust])

    const totalPrice= (50+toopingPrice+cheesPrice)*qty
 
    const handleAadToCart=async()=>{
        const element = imageRef.current
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    

      dispatch(addToCart({name:"custom pizza",price:totalPrice,image:data,description:" custom pizza made by you!",_id:"61e3cbffaba4686f0942e2f2",customItem:[...addedToppings,...addedCrust],isCustom:true}))
    }

  return (
    <>
    <SideBar/>
    
    <div className='mainarea'>
    <Header/>
         <h2>Pizza Builder</h2>
         <div className="pizz-builder-section">
            <div className="upper-section">
              <div className="your-pizza">
                  <h3>Your Pizza</h3>
                  <div className="pizza-card" ref={imageRef}>
                     <img src={pizzaBase} alt="custom-pizza" />
                     {
                        addedToppings.map((item)=>(
                            <img className='all-tooping' src={item.img} alt={item.name}/>
                        ))
                     }
                    
                  </div>
               </div>
               <div className="topping">
                <div className="add">
                    ADD TOPPINGS
                </div>
                <div className="type-section">
                    <div className={`type ${showVeg&&"active"}`} onClick={vegTopping}>VEG</div>
                    <div className={`type ${showNonVeg&&"active"}`}  onClick={nonvegTopping}>NON-VEG</div>
                 </div>
                {
                    allTopping.map((item)=>(
                        <div onClick={()=>handleTopping(item)} className={`topping-item ${addedToppings.find((itm)=>itm.name===item.name)&&'active'}`} key={item.name}>
                            <p>{item.name}</p>
                            <p>₹{item.price}</p>
                        </div>
                    ))
                }
               </div>
            </div>

           <div className="lower-section">
           <div className="checkout-area">
                        
                        <div className="billing">
                          <h4>PRICE DETAILS</h4>
                          <div className="details">
                              <div className="item">
                                  <p>Price</p>
                                  <p><span>₹</span>{50}</p>
                              </div>
                              <div className="item">
                                  <p>Extra Toppings</p>
                                  <p>-<span>₹</span>{toopingPrice}</p>
                              </div>
                              <div className="item">
                                  <p>Extra Chees</p>
                                  <p>-<span>₹</span>{cheesPrice}</p>
                              </div>
                             
                          </div>
                          <div className="total">
                              <h3>Total</h3>
                              <h3><span>₹</span>{totalPrice}</h3>
                          </div>
                        </div>
                        <button onClick={handleAadToCart} disabled={totalPrice===0?true:false}>ADD TO CART</button>
                        </div>


                        <div className="topping">
                <div className="add">
                    CHOOSE YOUR CRUST
                </div>
                
                {
                    crust.map((item)=>(
                        <div onClick={()=>handleCrust(item)} className={`topping-item ${(addedCrust.find((itm)=>itm.name===item.name)&&activeCrust===item.name)&&'active'}`} key={item.name}>
                            <p>{item.name}</p>
                            <p>₹{item.price}</p>
                        </div>
                    ))
                }
               </div>

           </div>
            
         </div>
    </div>
    <LeftSide/>
    </>
  )
}

export default CustomPizza