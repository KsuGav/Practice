/**
 * Created by Ksena on 4/10/2016.
 */
function getId(a) {
    return document.getElementById(a);
}
var main_window = getId('dvtext');
var text_window = getId('textCode');

//Редактирование на жирний
getId("fontWeight").onclick = function(){
    if(main_window.style.fontWeight =="bold"){
        main_window.style.fontWeight = "normal"
    }else{main_window.style.fontWeight ="bold"}
};
//Редактирование на курсив
getId("fontStyle").onclick = function(){
    if(main_window.style.fontStyle =="italic"){
        main_window.style.fontStyle = "normal"
    }else{main_window.style.fontStyle ="italic"}
};
//Underline
getId("textDecoration").onclick = function(){
    if(main_window.style.textDecoration =="underline"){
        main_window.style.textDecoration = "none"
    }else{main_window.style.textDecoration ="underline"}
};
//Стилизация текста
function setStyle(clicked_el) {
    var el = $(clicked_el);
    var style_attr;
    var style_value;
    if (el.attr('id') === 'radioBtn2') {
        style_attr = $(el).find('input:checked').attr('name');
        style_value = $(el).find('input:checked').parent()[0].textContent.trim()
    } else if (el.attr('id') === 'formFont') {
        style_attr = $(el).attr('name');
        style_value = $(el).find('option:selected').val();
    }else if (el.attr('id') === 'radioBtn') {
        style_attr = $(el).attr('name');
        style_value = $(el).find('option:selected').val();
    }
    $(main_window).css(style_attr, style_value);
}

//изменение цвета текста
function changeColText() {
    var elem = document.getElementsByClassName("cellC");
    for (var j = 0; j < elem.length; j++) {
        elem[j].onclick = function () {
            main_window.style.color = this.style.background;
        }
    }
}

//изменение фона на цвет
function changeBgCol() {
    var elemE = document.getElementsByClassName("cellC");
    for (var c = 0; c < elemE.length; c++) {
        elemE[c].onclick = function () {
            document.body.style.backgroundColor = this.style.background;
        }
    }
}

//изменение фона на картинку
function changeBgImg() {
    var elemB = document.getElementsByClassName("cell");
    for (var i = 0; i < elemB.length; i++) {
        elemB[i].onclick = function () {
            document.body.style.background = this.style.backgroundImage;
            document.body.style.opacity = "1";
        }
    }
}

//Добавление таблицы цветов текста
$("#colorText").on("click", function () {
    if ($("#tabColor").css('display') == 'none') {
        $("#tabColor").show();
        $("#changeBGImg").hide();
        $("#parent_popup").show();
        $("#popup").show();
        $("#tabImg").hide();
        changeColText();
        return
    }
    $("#tabColor").hide();
    $("#popup").hide();
});

//Добавление таблицы цвета фона
$("#colorFon").on("click", function () {
    if ($("#tabColor").css('display') == 'none') {
        $("#tabColor").show();
        $("#changeBGImg").show();
        $("#parent_popup").show();
        $("#popup").show();
        $("#tabImg").hide();
        changeBgCol();
        return
    }
    $("#tabColor").hide();
    $("#popup").hide();
    $("#changeBGImg").hide();
});

//Добавление таблицы картинок фона
$("#changeBGImg").on("click", function () {
    if ($("#tabImg").css('display') == 'none') {
        $("#tabImg").show();
        $("#parent_popup").show();
        $("#popup2").show();
        $("#tabColor").hide();
        changeBgImg();
        return
    }
    $("#tabImg").hide();
    $("#popup2").hide();
});

//вернуть таблицу с цветом фона
$("#changeBGCol").on("click",function(){
    if ($("#tabColor").css('display') == 'none') {
        $("#tabColor").show();
        $("#changeBGImg").show();
        $("#parent_popup").show();
        $("#popup").show();
        $("#tabImg").hide();
        return
    }
    $("#tabColor").hide();
    $("#popup").hide();
    $("#changeBGImg").hide();
});
changeBgCol();

//скрывать контейнер, если не на нем нажали
$(document).mouseup(function (e) {
    var container = $(".forHide");
    if (!container.is(e.target)
        && container.has(e.target).length === 0)
    {
        container.hide();
        $("#parent_popup").hide();
        $("#popup").hide();
        $("#popup2").hide();
        $("#popupTab").hide();
        $("#popupList").hide();
    }
});

//Добавление дива с таблицей и списком
$("#redact").on("click", function () {
    $("#dvredact").show();
    $("#forEditButtons").show();
    $("#dvtext").hide();
    $("#forButtons").hide();
    text_window.value = main_window.innerHTML;
});

//Сохранение кода в тексареа
getId("save").onclick = function () {
    main_window.innerHTML = text_window.value;
    $("#dvredact").hide();
    $("#forEditButtons").hide();
    $("#dvtext").show();
    $("#forButtons").show();
};

//добавить див с созданием таблицы
$("#addTab").on("click", function () {
    if ($("#popupTab").css('display') == 'none') {
        $("#parent_popup").show();
        $("#popupTab").show();
        $("#popupList").hide();
        return
    }
    $("#popupTab").hide();
});

//добавить див с созданием списка
$("#addList").on("click", function () {
    if ($("#popupList").css('display') == 'none') {
        $("#parent_popup").show();
        $("#popupList").show();
        $("#popupTab").hide();
        return
    }
    $("#popupList").hide();
});

//Создать таблицу
getId("butSaveTab").onclick = function () {
    var numbRow = parseInt(getId("numRows").value);
    var numbCol = parseInt(getId("numCol").value);
    var widthColm = parseInt(getId("widthCol").value);
    var heightColm = parseInt(getId("heightCol").value);
    var cellsp = parseInt(getId("cellspas").value);
    var brdTab = parseInt(getId("borderTab").value);
    var color = getId("BGCol").value;
    var newTab = '<table style ="border-spacing:'+cellsp+'px; border:' + brdTab + 'px solid ' + color + '">';
    for (var i=0; i<numbRow;i++){
        newTab += "<tr>";
        for (var j=0; j<numbCol;j++){
            newTab += "<td width='" + widthColm + "px' height='" + heightColm + "px'></td>";
        }
        newTab += "</tr>";
    }
    newTab += "</table>";
    text_window.value = main_window.innerHTML + newTab;
    $("#parent_popup").hide();
    $("#popupTab").hide();
    $("#dvredact").show();
    $("#forEditButtons").show()
};
//Создать список
getId("butSaveList").onclick = function () {
    var numbLi = parseInt(getId("numList").value);
    if (getId("checkForNum").checked) {
        var selectNMark = getId("formTypeMark").elements.typeNMark;
        for (var z = 0; z < selectNMark.options.length; z++) {
            var optionNMark = selectNMark.options[z];
            if (optionNMark.selected) {
                var typesNMark = optionNMark.value
            }
        }
        var newNList = "<ol type='" + typesNMark + "'>";
        for (var i = 0; i < numbLi; i++) {
            newNList += "<li>item"+(i+1)+"</li>"
        }
        newNList += "</ul>";
        text_window.value = main_window.innerHTML + newNList;
    }
    $("#parent_popup").hide();
    $("#popupList").hide();
    $("#dvredact").show();
    $("#forEditButtons").show()
};

//Отмена таблицы или списка
getId("butBrakeTab").onclick = function () {
    $("#parent_popup").hide();
    $("#popupTab").hide();
    $("#dvredact").show();
    $("#forEditButtons").show()
};

getId("butBrakeList").onclick = function () {
    $("#parent_popup").hide();
    $("#popupList").hide();
    $("#dvredact").show();
    $("#forEditButtons").show()
};

//загрузка файла и на фон
$('.file').change(function() {
    var reader = new FileReader(),
    file = this.files[0],
    bgBody = $('body');
    reader.onloadend = function() {
        bgBody.css('background', 'url(' + this.result + ')');
    };
    file ? reader.readAsDataURL(file) : bgBody.css('background', 'none');
});

//подсветка кнопок и селектов
var btColor = document.getElementsByTagName("button");
for(var i=0;i<btColor.length;i++){
    btColor[i].onmouseover = function(){
        this.style.background = "cornflowerblue"
    };
    btColor[i].onmouseout = function(){
        this.style.background = ""
    }
}

var selectColor = document.getElementsByTagName("select");
for(var k=0;k<selectColor.length;k++){
    selectColor[k].onmouseover = function(){
        this.style.background = "cornflowerblue"
    };
    selectColor[k].onmouseout = function(){
        this.style.background = ""
    }
}
//Валидатор полей
$('.validation').on('keyup',function(e){
    if(isNaN(e.target.value)){
        document.getElementsByClassName("saveButton").disabled = true;
        e.target.style.border = "2px solid red";
        if($('.warn').length==0){
            var error = document.createElement("div");
            $(error).addClass('warn');
            error.textContent = 'Ошибка! Введите число!';
            $(error).insertAfter(e.target);
        }
    }else{
        e.target.style.border = "";
        $('.warn').remove();
        $('#butSaveTab').disabled=false;
    }
});



