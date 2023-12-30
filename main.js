function RefreshThePage(){
    axios.get(` https://crudcrud.com/api/1147c5cf2e254a65ba7953314655136d/candyStock `)
    .then((res) => {
        for(var i=0 ; i<res.data.length;i++){
            showcandy(res.data[i].candy, res.data[i].description, res.data[i].price, res.data[i].quantity, res.data[i]._id)
        }
    })
    .catch(err => console.log(err))
}

function clickedBuy(e,candy,description,price,quantity,id,quantityToDeduct){
    console.log('hi',candy,e.target,e,id)

    axios.put(`https://crudcrud.com/api/1147c5cf2e254a65ba7953314655136d/candyStock/${id}`,
    {
        candy:candy,
        description:description,
        price:price,
        quantity:quantity-quantityToDeduct
    }
    ).then(res => {
        console.log('update ho gaya hai')
        location.reload()
        //RefreshThePage()
    })
    .catch(err => console.log(err))
    
}

window.addEventListener('DOMContentLoaded', RefreshThePage );


function showcandy(candy,description,price,quantity,id){

    var candies = document.getElementById('candyList');
    var li = document.createElement('li');

    var btn1 =document.createElement('button');
    var btn2 = document.createElement('button');
    var btn3 = document.createElement('button');

    btn1.appendChild(document.createTextNode('Buy one'));
    btn2.appendChild(document.createTextNode('Buy two'));
    btn3.appendChild(document.createTextNode('Buy three'));


    li.appendChild(document.createTextNode(`${candy} ${description} ${price} ${quantity} `))
    li.appendChild(btn1);
    li.appendChild(btn2);
    li.appendChild(btn3);

    candies.appendChild(li)
    //console.log(candies)

    btn1.addEventListener('click',(e)=>{
        if(quantity-1<0){
            alert(`qauntity is 0 or less for ${candy}`)
        }
        else {
            clickedBuy(e,candy,description,price,quantity,id,1)
        }
    });

    btn2.addEventListener('click',(e)=>{
        if(quantity-2<0){
            alert(`qauntity is less for ${candy}`)
        }
        else {
            clickedBuy(e,candy,description,price,quantity,id,2)
        }
    });

    btn3.addEventListener('click',(e)=>{
        if(quantity-3<0){
            alert(`qauntity is less for ${candy}`)
        }
        else {
            clickedBuy(e,candy,description,price,quantity,id,3)
        }
    });
    
    
    
}


function submitPressed(e){


    e.preventDefault()

    var candy=document.getElementById('candy').value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;
    var add = document.getElementById('add').value;

    //console.log(candy)

    axios.post('https://crudcrud.com/api/1147c5cf2e254a65ba7953314655136d/candyStock',
    {   candy:candy,
        description:description,
        price:price,
        quantity:quantity
    }
    ).then((res) => {
        console.log(res.data);
        showcandy(candy,description,price,quantity,res.data._id);
    })


}