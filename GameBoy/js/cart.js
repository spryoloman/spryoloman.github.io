var cart= {};
function loadCart(){
    //проверяю есть ли в localStorage запись cart
    if(localStorage.getItem('cart')){
        //если есть расшифровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart')); 

           showCart();  
 
    }
    else{
        $('.cart').html('Скоріш придбайте щось!)');
    }
}

function showCart(){
    $.getJSON('games.json', function(data) {
         var data = data;
         var outCart = '';
         for(var id in cart){
            outCart+= `<div class="cart-product">`
            outCart+= `<button data-id="${id}" class="del-data cart-text">X</button>`
            outCart+=`<img class="product_img-cart" src="img/${data[id].img}">`
            outCart+=`<p class="product_name-cart cart-text" >${data[id].name}</p>`;
            outCart+=`<p class="product_price-cart cart-text">${data[id].cost} грн</p>`;
            outCart+= `<div class="quantity">`
            outCart+= `<button data-id="${id}" class="minus-data cart-text">-</button>`;
            outCart+=`<p class="product_totquan-cart cart-text">${cart[id]}</p>`;
            outCart+= `<button data-id="${id}" class="plus-data cart-text">+</button>`;
            outCart+= `</div>`
            outCart+=`<p class="product_name-cart cart-text">${data[id].cost*cart[id]} грн</p>`;
            outCart+= `</div>`
            outCart+= "<br>";
        };
         $('.cart').html(outCart);
         $('.del-data').on('click', delGames);
         $('.plus-data').on('click', plusGames);
         $('.minus-data').on('click', minusGames);
    });
}

function delGames(){
    //удаляем товар из корзины
    var id =$(this).attr('data-id');
    delete cart[id];
    saveCart()
    showCart();
};

function plusGames(){
    //удаляем товар из корзины
    var id =$(this).attr('data-id');
    cart[id]++;
    saveCart()
    showCart();
};

function minusGames(){
    //удаляем товар из корзины
    var id =$(this).attr('data-id');
    if(cart[id]==1){
        delete cart[id];
    }
    else{
        cart[id]--;
    }
    saveCart()
    showCart();
};

function saveCart(){
    //сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // корзину в строку
};

function sendEmail(){
    var ename = $('#ename').val()
    var esurname = $('#esurname').val()
    var ephone = $('#ephone').val()
    var email = $('#email').val()
    var edelivery = $('#edelivery').val()
    if(ename!='' && esurname!='' && ephone!='' && email!='' && edelivery!=''){
            $.post(
                "php/mail.php",
                {
                    "Ім'я" : ename,
                    "Призвіще" : esurname,
                    "Телефон" : ephone,
                    "Email" : email,
                    "Доставка" : edelivery,
                    "Товар" : cart,
                },
                function(data){
                   if(data==1){
                       alert('Замовлення відправлено');
                   }
                   else{
                    alert('Замовлення не відправлено');
                   }
                }
                );
    }
    else{
        alert('Заповніть будь-ласка всі поля!)')
    }
}

$(document).ready(function(){
    loadCart();
    $('.send-email').on('click', sendEmail);//отправить письмо с заказом 
});