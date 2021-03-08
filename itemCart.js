const { json } = require('body-parser');
const express = require('express');
const items = express.Router();
const pool = require("./connection");

//logic for endpoints
/*const itemsList = [
    {id:'1',product:"Tide",price:7.50,quantity:1},
    {id:'2',product:"Dawn Dish Soap",price:3.50,quantity:1},
    {id:'3',product:"Bananas",price:6.00,quantity:6},
    {id:'4',product:"Blueberry",price:2.10,quantity:1},
    {id:'5',product:"Strawberry",price:2.50,quantity:1},
    {id:'6',product:"Yogurt",price:4.00,quantity:1},
    {id:'7',product:"Cheese",price:5.00,quantity:2},
    {id:'8',product:"Eggs",price:8.00,quantity:1},
    {id:'9',product:"Milk",price:5.00,quantity:2},
    {id:'10',product:"Sugar",price:5.00,quantity:1}
];*/

    items.get("/", (req, res) => {
        const maxPrice = req.query.price;
        const srchStr  = req.query.product;
        const pageSize = req.query.pgSize;
        //let rtnItems = itemsList;
        //pool.query("SELECT * FROM shopping_cart where product = $1",[srchStr])
        pool.query("SELECT * FROM shopping_cart")
        .then((results) => { // do this when we get the result
    // make the DB data match the front end format
       let rtnItems = results.rows;
     /*.map((result) => {
      const newResult = result;

      // transforming the data
      // database doesn't always exactly match
      // what we want on the front end
      newResult["product"] = result.product;
      newResult["price"] = result.price;

      return newResult;
    });*/
        
        if (maxPrice){
        //search itemlist
        rtnItems = itemsList.filter( (rtnItem) => {
          console.log(rtnItems);
          return rtnItem.price < maxPrice;
        });
        }
        if (srchStr){

            rtnItems = rtnItems.filter((rtnItem) => {
             
               return rtnItem.product.toLowerCase().includes(srchStr.toLowerCase());
    
            })
    
        }

        if (pageSize){

            rtnItems = rtnItems.slice(0,pageSize); 
    
        }
        //else{
        // return whole list
        //res.json(itemsList);
        //}
      if (!rtnItems){
        res.status(404).send('Empty search list!!');
      }
      else{
        res.status(200).json(rtnItems);
      }
      
    });
  });
    // accept POST request at URI: /items
  
    items.post("/", (req, res) => {
      
      //let rtnItems = itemsList;
      //const newItem = req.body;
      /*let postId = itemsList.length+1;
      let postProd = newObj.product;
      let postPrice = newObj.price;
      let postQty = newObj.quantity;
      const newItem = {
        product: req.body.product,
        price:req.body.price,
        quantity:req.body.quantity
      };*/
      let product = req.body.product;
      let price = req.body.price;
      let quantity= req.body.quantity;
      console.log('req:',req.body);
    pool
    .query(
      `
    INSERT INTO 
        shopping_cart(product, price, quantity) 
        VALUES ($1, $2, $3) returning *
  `,
      [
        product,
        price,
        quantity
      ]
    )
    .then((results) => {
      res.status(201); // created
      res.json(results.rows); // return the item we created
    });
      //rtnItems.push(newItem);
      //console.log('test:',newItem);
      //res.status(201).json(rtnItems);
      //res.json(rtnItems);
       
    });
    
    // accept PUT request at URI: /students
    items.put("/:id", (req, res) => {
      const idInp = (req.params.id);
      console.log("id:",idInp);
      //find the item to update from itemsList array
      //const index = itemsList.findIndex( (i)=> { return i.id === idInp});
      //console.log("index:",index);
      //const item = itemsList[index];
      //console.log("item:",item);
      //get item from body
      let product = req.body.product;
      let price = req.body.price;
      let quantity= req.body.quantity;
      console.log('req:',req.body);
      //const newItem = req.body;
      //console.log('newItem:',newItem);
      pool
    .query(
      `
    update 
        shopping_cart set product = $1, price = $2, quantity = $3 
        where id = $4 returning *
        
  `,
      [
        product,
        price,
        quantity,
        idInp
      ] 
    )
    .then((results) => {
      res.status(201); // created
      res.json(results.rows); // return the item we created
    });
    //console.log("PUT Results:",newItem);
      //removes 1 item from the array, starting at the index provided,
      // then adds newItem in its place
      //itemsList.splice(index,1,newItem);
      // res.json(itemsList);
      //res.status(200).send('PUT Successful');
      //res.json(itemsList);
    });
    
    // accept DELETE request at URI: /items
    items.delete("/:id", (req, res) => {
      console.log("hello");
      const idDel = (req.params.id);
      console.log("id:",idDel);
      //find the item to update from itemsList array
      /*const index = itemsList.findIndex( (i)=> { return i.id === idDel});
      console.log("index:",index);
      itemsList.splice(index, 1);
      res.status(204);
      res.json("Delete Successful..");*/
      pool
      .query(
        `
      delete from 
          shopping_cart where id = $1
    `,
        [
          idDel
        ] 
      )
      .then((results) => {
        res.status(201); // created
        res.json(results); // return the item we created
      });


    });
    
    
    //export module so it can be used in other files
    module.exports = items;