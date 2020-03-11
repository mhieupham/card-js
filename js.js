var shoppingCart = (function(){
    
    cart=[];
    
    //constructor
    function Item(name,price,count){
        this.name = name;
        this.price = price;
        this.count = count;
    }
    //save cart 
    function saveCart(){
        sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
    }
    //get cart 
    function getCart(){
        sessionStorage.getItem('shoppingCart');
    }
    if(sessionStorage.getItem('shoppingCart') != null){
        getCart();
    }
    var obj =[];
    //add item to cart
    obj.addItemToCart = function(name,price,count){
        for(var item in cart){
            if(cart[item].name == name){
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name,price,count);
        cart.push(item);
        saveCart();
    }
    // add count item to cart
    
    //count cart
//    obj.countCart = function(name,count){
//        
//    }
    
    //remove item to cart 
    obj.removeItemFromCart = function(name){
        for(item in cart){
            if(cart[item].name === name){
                cart[item].count --;
                if(cart[item].count === 0){
                    cart.splice(item,1);
                }
            }
        }
        saveCart();
    }
    //remove item from cart all
    obj.removeItemFromCartAll = function(name){
        for (item in cart){
            if(cart[item].name == name){
                cart.splice(item,1);
            }
        }
        saveCart();
    }
    //clear cart
    obj.clearCart = function(){
        cart =[];
        saveCart();
    }
    //show list cart
    obj.listCart = function(){
        cartCopy =[];
        for(var i=0;i<cart.length;i++){
            item = cart[i];
            itemCopy ={};
            for (p in item){
                itemCopy[p]=item[p];
            }
            itemCopy.total = itemCopy.price * itemCopy.count;
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    }
    //input change count
    obj.inputChangeCount = function(name,count){
        console.log(cart);
        for(var item in cart){
            if(cart[item].name == name){
                cart[item].count = count;
            }
        }
        saveCart();
    }
    return obj;
    
    
})();

//event 
//add item to cart
$('.add-to-cart').click(function(event){
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name,price,1);
    DisplayCart();
})
//clear cart
$('.clear-cart').click(function(event){
    event.preventDefault();
    shoppingCart.clearCart();
    DisplayCart();
})
//delete item
$('.show-cart').on('click','.delete-item',function(e){
    e.preventDefault();
    var name = $(this).data('name');
    shoppingCart.removeItemFromCartAll(name);
    DisplayCart();
})
//-1 item
$('.show-cart').on('click','.minus-item',function(e){
    e.preventDefault();
    var name = $(this).data('name');
    shoppingCart.removeItemFromCart(name);
    DisplayCart();
})
//+1 item
$('.show-cart').on('click','.plus-item',function(e){
//    e.preventDefault();
    var name = $(this).data('name');
    shoppingCart.addItemToCart(name);
    DisplayCart();
});
//
$('.show-cart').on('change','.item-count',function(e){
    var count = Number($(this).val());
    var name = $(this).data('name');
    shoppingCart.inputChangeCount(name,count);
    DisplayCart();
})
//show item html
function DisplayCart(){
    var total=0;
    var cartArray = shoppingCart.listCart();
//    var cartArray = 
    console.log(cartArray);
    var html ='';
    for(var i =0;i<cartArray.length;i++){
        html += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
        total+=cartArray[i].total;
    }
    $('.show-cart').html(html);
    $('.total-count').html(cartArray.length);
    $('.total-cart').html(total);
//    console.log(total);
}
DisplayCart();