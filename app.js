const express = require ('express');
const axios = require('axios');


const serviceOne = express();
const servicePortOne = 5000;

const serviceTwo = express();
const servicePortTwo = 5001;

serviceOne.get('/', async ( req, res ) => {
    return res.status(200).json({ "message": "The Service One is Working Successfully!"});
})

serviceTwo.get('/', async ( req, res ) => {
    return res.status(200).json({ "message": "The Service Two is Working Successfully!"});
})

const database = [
    {
        "category" : 1,
        "product_one_of_category_1" : 10,
        "product_two_of_category_1" : 20,
        "product_three_of_category_1" : 30,
        "product_four_of_category_1" : 40,
        "product_five_of_category_1" : 50,

    },
    
    {
        "category" : 2,
        "product_one_of_category_2" : 10,
        "product_two_of_category_2" : 20,
        "product_three_of_category_2" : 30,
        "product_four_of_category_2" : 40,
        "product_five_of_category_2" : 50,

    },
    
    {
        "category" : 3,
        "product_one_of_category_3" : 10,
        "product_two_of_category_3" : 20,
        "product_three_of_category_3" : 30,
        "product_four_of_category_3" : 40,
        "product_five_of_category_3" : 50,

    },
    
    {
        "category" : 4,
        "product_one_of_category_4" : 10,
        "product_two_of_category_4" : 20,
        "product_three_of_category_4" : 30,
        "product_four_of_category_4" : 40,
        "product_five_of_category_4" : 50,

    },
    
    {
        "category" : 5,
        "product_one_of_category_5" : 10,
        "product_two_of_category_5" : 20,
        "product_three_of_category_5" : 30,
        "product_four_of_category_5" : 40,
        "product_five_of_category_5" : 50,

    },
    
]


serviceTwo.get('/:givenCategory', async ( req, res ) => {
    let id = req.params.givenCategory ;

    let answer ;

    database.forEach((document) => {
        if ( document.category == id )
            answer = document ;
    })

    return res.status(200).send({ "message": "Here are the Product Stocks for you", "data" : answer })
})

serviceOne.get('/stocks/:category', async ( req, res ) => {
    let id = req.params.category ;
    
    try {
      
        let url = `http://localhost:5001/${id}`;
        
        axios.get(url)
        .then(response => {
            
            let valueReturnedFromAnotherMicroservice = response.data ;
            
            res.status(200).json({ "message" : "The Message Was Fetched Successfully from the Other Microservice", "data" : valueReturnedFromAnotherMicroservice });
        })
        .catch(error => {
            console.log(error);
            res.status(501).json({ "message" : "Server Error" });
        });
      
    } catch (e) {
        console.log(e);
        res.status(501).json({ "message" : "Service Error"});
    }
})


serviceOne.listen(servicePortOne, () => {
    console.log(`Stock Microservice is successfully running on PORT ${servicePortOne}`);
})

serviceTwo.listen(servicePortTwo, () => {
    console.log(`Inventory Database Service Successfully RUNNING ON PORT ${servicePortTwo}`)
})
