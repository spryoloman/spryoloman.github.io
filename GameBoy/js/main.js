var cart = {};

function init(){
    //считываем JSON
    $.getJSON("games.json", outAll);
}
function outAll(data){
    
    var outPs= ''
    for (var key in data){
        if (data[key].type === 'ps') {
            outPs += '<div class="product">';
            outPs +=`<img class="product_image" src="img/${data[key].img}" alt="">`; 
            outPs +=`<p class="product_name">${data[key].name}</p>`;
            outPs +=`<p class="add-to-cart" data-id="${key}">Купити</p>`;
            outPs +='</div>';
        }
    }
    var outPc= ''
    for (var key in data){
        if (data[key].type === 'pc') {
            outPc += '<div class="product">';
            outPc +=`<img class="product_image-pc" src="img/${data[key].img}" alt="">`; 
            outPc +=`<p class="product_name">${data[key].name}</p>`;
            outPc +=`<p class="add-to-cart" data-id="${key}">Купити</p>`;
            outPc +='</div>';
        }
    }
    var outOld= ''
    for (var key in data){
        if (data[key].type === 'old') {
            outOld += '<div class="product">';
            outOld +=`<img class="product_image-old" src="img/${data[key].img}" alt="">`; 
            outOld +=`<p class="product_name">${data[key].name}</p>`;
            outOld +=`<p class="add-to-cart" data-id="${key}">Купити</p>`;
            outOld +='</div>';
        }
    }
    var outTable= ''
    for (var key in data){
        if (data[key].type === 'table') {
            outTable += '<div class="product">';
            outTable +=`<img class="product_image-table" src="img/${data[key].img}" alt="">`; 
            outTable +=`<p class="product_name">${data[key].name}</p>`;
            outTable +=`<p class="add-to-cart" data-id="${key}">Купити</p>`;
            outTable +='</div>';
        }
    }
    $('.ps-out').html(outPs);
    $('.pc-out').html(outPc);
    $('.old-out').html(outOld);
    $('.table-out').html(outTable);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart(){
    var id =$(this).attr('data-id');
    if(cart[id]==undefined){
        cart[id] = 1;// если нет такого товара то равный единице
    }
    else{
        cart[id]++; // если такой товар есть то + 1
    }
    saveCart()
    console.log(cart)
}

function saveCart(){
    //сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // корзину в строку
}

function loadCart(){
    //проверяю есть ли в localStorage запись cart
    if(localStorage.getItem('cart')){
        //если есть расшифровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart')); 
    }
}

$(document).ready(function(){
    init();
    loadCart();
});