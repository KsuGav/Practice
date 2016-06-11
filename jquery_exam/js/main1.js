/**
 * Created by Ksu on 23.04.2016.
 */
//панелі
var text = $("#text"); // блок з вхідним текстом
var editor = $("#editor"); // блок з текстареа
var editPannel = $("#editPannel"); // верхня панель редагування
var stylePannel = $("#stylePannel"); //верхня панель стилів
var toBlockBg = $("#toBlockBg"); //затемнити задній план при всплив.вікні
var colorTab = $("#colorTab"); // блок з кольорами
var imageTab = $("#imageTab"); // блок з зображеннями
var addBgImage = $("#bgImage"); //кнопка дод.фонове зображення на вспливаючому вікні
var createTabPannel = $("#createTabPannel")
var createListPannel = $("#createListPannel")

// сховати/показати панелі
function panelFunction(panel) {
    text.show();
    stylePannel.show();
    editPannel.hide();
    editor.hide();
    toBlockBg.hide();
    colorTab.hide();
    imageTab.hide();
    addBgImage.hide();
    createTabPannel.hide();
    createListPannel.hide();
    if (panel == "colorTab") { //показати таблицю кольорів тексту
        toBlockBg.show();
        colorTab.show();
    } else if (panel == "addBgImage") {
        toBlockBg.show();
        colorTab.show();
        addBgImage.show();
    } else if (panel == "imageTab") { //показати таблицю колір фону
        toBlockBg.show();
        imageTab.show();
    } else if (panel == "editor") { // переключити на редактор
        editor.show();
        editPannel.show();
        stylePannel.hide();
        text.hide();
    } else if (panel == "createTabPannel") { // показати вікно створення таблиці
        createTabPannel.show();
        toBlockBg.show();
        editor.show();
        editPannel.show();
        stylePannel.hide();
        text.hide();
    } else if (panel == "createListPannel") { //показати вікно створення списку
        createListPannel.show();
        toBlockBg.show();
        editor.show();
        editPannel.show();
        stylePannel.hide();
        text.hide();
    }
}

//сховати вспливаюче вікно
toBlockBg.on("click", function() {
    toBlockBg.hide();
    colorTab.hide();
    imageTab.hide();
    addBgImage.hide();
    createTabPannel.hide();
    createListPannel.hide();
})

//СТИЛЬ ТЕКСТУ
// Жирний текст
$(".bold").on("click", function() {
    if ($(text).css('font-weight')=="bold") {
        $(text).css('font-weight',"normal");
    } else {
        $(text).css('font-weight',"bold");
    }
})
// Курсивний текст
$(".italic").on("click", function() {
    if ($("#text").css('font-style')== "italic") {
        $("#text").css('font-style',"normal");
    } else {
        $("#text").css('font-style',"italic");
    }
})
////Нижнє підкреслення
$(".underline").on("click", function() {
    if ($("#text").children().css('text-decoration')== "none") {
        $("#text").children().css('text-decoration',"underline");
    } else {
        $("#text").children().css('text-decoration',"none");
    }
})

//Стилизация текста
function setStyle(clicked_el) {
    var el = $(clicked_el);
    var style_attr;
    var style_value;
    if (el.attr('id') == 'chooseTextAlign') {
        style_attr = $(el).find('input:checked').attr('name');
        style_value = $(el).find('input:checked').parent()[0].textContent.trim();
    } else if (el.attr('id') == 'chooseFontFamily') {
        style_attr = $(el).attr('name');
        style_value = $(el).find('option:selected').val();
    }else if (el.attr('id') == 'chooseFontSize') {
        style_attr = $(el).attr('name');
        style_value = $(el).find('option:selected').val();
    }
    $(text).css(style_attr, style_value);
}

////колір тексту
var cells = $("td");
//var chooseColor = df.chooseColor; кнопки по айдишкам
$("#color").on("click",function(){
    panelFunction("colorTab");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function() {
            var colorT = $( this ).css( "background-color" );
            text.css("color",colorT);
        }
    }
})
////ФОН
//// колір фону
function bgColor() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function() {
            var colorB = $(this).css("background-color");
            text.css("background-color",colorB);
            text.css("background-image","");
        }
    }
}
$("#bg").on("click", function() {
    panelFunction("addBgImage");
    bgColor();
});

////фонове зображення з таблиці
$("#bgImage").on("click", function() {
    panelFunction("imageTab");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function() {
            var imgBg = $(this).css("background-image");
            text.css("background-image",imgBg);
        }
    }
});
//// Загрузити фонове зображення
$('#uploadImg').change(function() {
    var reader = new FileReader(),
        file = this.files[0];
        //bgBody = $('body');
    reader.onloadend = function() {
        text.css('background', 'url(' + this.result + ')');
    };
    file ? reader.readAsDataURL(file) : text.css('background', 'none');
});

//
////РЕДАКТОР
////включити панель редагування
$("#editBut").on("click", function() {
   panelFunction("editor");
    var t = text.html();
   $("#editorField").val(t) ; // передача тексту в поле редактора
});
//// передача редагованого тексту на "екран"
$("#saveBut").on("click", function() {
    panelFunction();
    var v = $("#editorField").val();
    text.html(v);
});
//
////ТАБЛИЦЯ
var createTabPannel = $("#createTabPannel");
////викликати вікно створення таблиці
$("#createTabBut").on("click", function() {
    panelFunction("createTabPannel");
});
////створити таблицю
$("#createTabB").on("click", function() {
    var tr = parseInt($("#rows").val());
    var td = parseInt($("#cols").val());
    var width = parseInt($("#width").val());
    var height = parseInt($("#height").val());
    var cellspacing = parseInt($("#cellspacing").val());
    var borderWidth = parseInt($("#borderWidth").val());
    var borderColor = $("#borderColor").val();
    var newTab = "<table border=" + borderWidth + " bordercolor=" + borderColor + " cellspacing=" + cellspacing + ">";
    for (var i = 0; i < tr; i++) {
       newTab += "<tr>";
        for (var j = 0; j < td; j++) {
            newTab += "<td width='" + width + "px' height='" + height + "px'></td>";
        }
       newTab += "</tr>";
    }
    newTab += "</table>";
    $("#editorField").val(text.html()+newTab);
});


////СПИСОК
var createListPannel = $("#createListPannel");
////викликати вікно створення списку
$("#createListBut").on("click", function() {
    panelFunction("createListPannel");
});
////створити список
$("#createListB").on("click", function() {
    var items = parseInt($("#items").val()); //кількість елементів
    var mark = $( "#markType option:selected" ).text();//тип маркера
    var newList = "<ol style='list-style-type:" + mark + "'>";
    for (var i = 0; i < items; i++) {
        newList += "<li>Текст</li>"
    }
    newList += "</ol>";
    $("#editorField").val(text.html()+newList);
})
