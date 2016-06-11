function getId(a) {
    return document.getElementById(a);
}
var main_window = getId('dvtext');
var text_window = getId('textCode');
//Добавление дивов Редактирования и стилизации и хтмл код в редактор
$("#redact").on("click", function () {
    $("#dvredact").show();
    $("#dvstyle").hide();
    text_window.value = main_window.innerHTML;
});
$("#styling").on("click", function () {
    $("#dvredact").hide();
    $("#dvstyle").show();
});

//Сохранение кода в тексареа
getId("save").onclick = function () {
    main_window.innerHTML = text_window.value;
}

//Стилизация текста
function setStyle(clicked_el) {
    var el = $(clicked_el);
    var style_attr;
    var style_value;
    if (el.attr('id') == 'radioBtn') {
        style_attr = $(el).find('input:checked').attr('name');
        style_value = $(el).find('input:checked').parent()[0].textContent.trim()
    } else if (el.attr('id') == 'formFont') {
        style_attr = $(el).attr('name');
        style_value = $(el).find('option:selected').val()
    }
    $(main_window).css(style_attr, style_value);
}

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

//изменение цвета текста
function changeColText() {
    var elem = document.getElementsByClassName("cellC");
    for (var j = 0; j < elem.length; j++) {
        elem[j].onclick = function () {
            var color = this.style.background;
            main_window.style.color = color;
        }
    }
}
//изменение фона текстового поля
function changeBgText() {
    var elem = document.getElementsByClassName("cell");
    for (var i = 0; i < elem.length; i++) {
        elem[i].onclick = function () {
            var colorBg = this.style.backgroundImage;
            main_window.style.background = colorBg;
            main_window.style.opacity = "1";
        }
    }
}
//Добавление таблицы цветов текста
$("#colorText").on("click", function () {
    if ($("#tabColor").css('display') == 'none') {
        $("#tabColor").show();
        $("#tabImg").hide();
        return
    }
    $("#tabColor").hide();
});
changeColText();

//Добавление таблицы картинок
$("#colorFon").on("click", function () {
    if ($("#tabImg").css('display') == 'none') {
        $("#tabImg").show();
        $("#tabColor").hide();
        return
    }
    $("#tabImg").hide();
});
changeBgText();

//скрыть таблицу с цветом или фоном
$(document).mouseup(function (e) {
    var container = $(".forHide");
    if (!container.is(e.target)
        && container.has(e.target).length === 0)
    {
        container.hide();
    }
});

//Открыть окно добавления
$("#add").on("click", function () {
    $("#adding").show();
    $("#main").hide()
});

//Выбор таблицу или список
$("#addTab").on("click", function () {
    $("#forTab").show();
    $("#forList").hide()
});
$("#addList").on("click", function () {
    $("#forTab").hide();
    $("#forList").show();
});

getId("radioList").onclick = function() {
    getId("radioList2").style.display = "block";
    if (getId("checkForNum").checked) {
        getId("typeMMark").style.display = "none";
        getId("typeNMark").style.display = "block";
    } else if (getId("checkForMark").checked) {
        getId("typeMMark").style.display = "block";
        getId("typeNMark").style.display = "none";
    }
}

getId("radioList2").onclick = function(){
    getId("radioList3").style.display = "block";
};

//Создать таблицу
getId("butSaveTab").onclick = function () {
    var numbRow = parseInt(getId("numRows").value);
    var numbCol = parseInt(getId("numCol").value);
    var widthColm = parseInt(getId("widthCol").value);
    var heightColm = parseInt(getId("heightCol").value);
    var brdTab = parseInt(getId("borderTab").value);
    var selectType = getId("formTypeLine").elements.typeLine;
    for (var g = 0; g < selectType.options.length; g++) {
        var optionType = selectType.options[g];
        if (optionType.selected) {
            typeBrdLine = optionType.value
        }
    }
    var selectColor = getId("formColLine").elements.colLine;
    for (var k = 0; k < selectColor.options.length; k++) {
        var optionColor = selectColor.options[k];
        if (optionColor.selected) {
            colorBrdLine = optionColor.value
        }
    }
    var newTab = "<table style ='border:" + brdTab + "px " + typeBrdLine + " " + colorBrdLine + "'>";
    for (var i=0; i<numbRow;i++){
        newTab += "<tr>";
        for (var j=0; j<numbCol;j++){
            newTab += "<td width='" + widthColm + "px' height='" + heightColm + "px'></td>";
        }
        newTab += "</tr>";
    }
    newTab += "</table>";
    text_window.value = main_window.innerHTML + newTab;
    $("#adding").hide();
    $("#main").show();
    $("#dvredact").show();
};

//Создать список
getId("butSaveList").onclick = function () {
    var numbLi = parseInt(getId("numList").value);
    if (getId("checkForMark").checked){
        var selectMMark = getId("formTypeMark").elements.typeMMark;
        for (var z = 0; z < selectMMark.options.length; z++) {
            var optionMMark = selectMMark.options[z];
            if (optionMMark.selected) {
                var typesMMark = optionMMark.value
            }
        }
        var newMList = "<ul type='"+ typesMMark +"'>";
        for (var i=0;i<numbLi;i++){
            newMList += "<li></li>"}
        newMList+="</ul>";
        text_window.value = main_window.innerHTML + newMList;
    } else if (getId("checkForNum").checked) {
        var selectNMark = getId("formTypeMark").elements.typeNMark;
        for (var z = 0; z < selectNMark.options.length; z++) {
            var optionNMark = selectNMark.options[z];
            if (optionNMark.selected) {
                var typesNMark = optionNMark.value
            }
        }
        var newNList = "<ol type='" + typesNMark + "'>";
        for (var i = 0; i < numbLi; i++) {
            newNList += "<li></li>"
        }
        newNList += "</ul>";
        text_window.value = main_window.innerHTML + newNList;
    }
    $("#adding").hide();
    $("#main").show();
    $("#dvredact").show();
};

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
        $('.warn').remove()
        $('#butSaveTab').disabled=false;
    }
})


