const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const Stripe=require('stripe')

 const app = express()
 app.use(cors())
 app.use(express.json({limit : "10mb"}))

 const PORT = process.env.PORT || 5000


mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connect to Database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type:String,
        unique:true
    },
    password : String,
    confirmPassword : String,
    image:String
})

const userModel=mongoose.model("user",userSchema)

//api
 app.get("/",(req,res)=>{
res.send("Server is running")
 })
 app.post("/signup",async(req,res)=>{
 console.log(req.body)
 const {email}=req.body

userModel.findOne({email:email},(err,result)=>{
  
    console.log(result)
    console.log(err)
    if(result)
    {
        console.log(result)
        res.send({message:"Email is already regsitered",alert : false})
    }
    else{
        const data=userModel(req.body)
        const save=data.save()
        res.send({message:"Successfully signed up",alert : true})
    }
    
})
})

//Login api
app.post("/login",(req,res)=>{
    console.log(req.body)
    const {email}=req.body
    userModel.findOne({email:email},(err,result)=>{
        if(result){
            const dataSend={
                _id:result._id,
               firstName : result.firstName,
    lastName : result.lastName,
    email : result.email,
    image:result.image,
            };
            console.log(dataSend)
            res.send({message:"Login successfull",alert:true,data:dataSend})
        }
        else
        {
            res.send({message:"Email not registered",alert:false})
        }
    })
})

//Product Section

const schemaProduct=mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String
});

const productModel=mongoose.model("product",schemaProduct)

//save product in database

app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data=await productModel(req.body)
    const datasave=await data.save()
    console.log(datasave)
    res.send({message : "Upload Successfull"})
})

//Get data

app.get("/product",async(req,res)=>{
    const data=await productModel.find({})
    res.send(JSON.stringify(data))
})
/******payment gateway */

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/checkout-payment",async(req,res)=>{
    console.log(req.body)

    try{
    const params ={
            submit_type:'pay',
            mode:"payment",
            payment_method_types : ['card'],
            billing_address_collection : "auto",
            shipping_options : [{shipping_rate : "shr_1NpDCRSHc3Zr8gxsZK5Gx60U"}],
            line_items : req.body.map((item)=>{
                return{
                    price_data:{
                        currency : "Inr",
                        product_data : {
                            name :item.name,
                           //images: [item.image]
                        },
                        unit_amount:item.price*100,
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1,
                    },
                    quantity : item.qty
                    }
            }),
                success_url : `${process.env.FRONTEND_URL}/success`,
                cancel_url : `${process.env.FRONTEND_URL}/cancel`,
    }
    const session = await stripe.checkout.sessions.create(params)
    console.log(session)
    res.status(200).json(session.id)
    }
    catch(err){
res.status(err.statusCode || 500).json(err.message)
    }
    })


//server is running
 app.listen(PORT,()=>console.log("server is running at port "+PORT))

