function init() {
    
    $.post (
        "core.php",
        {
            "action" : "init"
        },
        showGames   
    );
}

function showGames(data) {
    data = JSON.parse(data);
    console.log(data);
    var out='<select>';
    out +='<option data-id="0">Новый товар</option>';
    for (var id in data) {
        out +=`<option data-id="${id}">${data[id].name}</option>`;
    }
    out +='</select>';
    $('.games-out').html(out);
    $('.games-out select').on('change', selectGames)
}

function selectGames(){
    var id = $('.games-out select option:selected').attr('data-id');
    console.log(id);
    $.post(
        "core.php",
        {
            "action" : "selectOneGames",
            "gid" :id
        },
        function(data){
            data=JSON.parse(data);
            $('#gtype').val(data.type);
            $('#gname').val(data.name);
            $('#gcost').val(data.cost);
            $('#gdesk1').val(data.description1);
            $('#gdesk2').val(data.description2);
            $('#ggenre').val(data.genre);
            $('#gage').val(data.age);
            $('#gplayers').val(data.players);
            $('#gvr').val(data.img);
        }
    )
}

function saveToDb(){
    var id = $('gid').val();
    if(id!=undefined){
        $.post(
            "core.php",
            {
                "action": "updateGames",
                "id" : id,
                "gtype" : $('#gtype').val(),
                "gname" : $('#gname').val(),
                "gcost" : $('#gcost').val(),
                "gdesk1" : $('#gdesk1').val(),
                "gdesk2" : $('#gdesk2').val(),
                "ggenre" : $('#ggenre').val(),
                "gage" : $('#gage').val(),
                "gplayers" : $('#gplayers').val(),
                "gvr" : $('#gvr').val(),
            },
            function(data){
               if (data==1){
                   init();
               }
               else{
                   console.log(data)
               }
            }
        );
    }
}

$(document).ready(function () {
    init();
    $('.add-to-db').on('click', saveToDb)
 });