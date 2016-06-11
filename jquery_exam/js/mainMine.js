/**
 * Created by Ksu on 23.04.2016.
 */
// доступ
function getE(a) {
    return document.getElementById(a);
}
var df = document.forms;

//панелі
var text = $("#text"); // блок з вхідним текстом
var editor = $("#editor"); // блок з текстареа
var editPannel = $("#editPannel"); // верхня панель редагування
var stylePannel = $("#stylePannel"); //верхня панель стилів
var toBlockBg = $("#toBlockBg"); //затемнити задній план при всплив.вікні
var colorTab = $("#colorTab"); // блок з кольорами
var imageTab = $("#imageTab"); // блок з зображеннями
var addBgImage = df.addBgImage; //кнопка дод.фонове зображення на вспливаючому вікні

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
    if ($(text).css('font-weight')=="normal") {
        $(text).css('font-weight',"bold");
    } else {
        $(text).css('font-weight',"normal");
    }
})
// Курсивний текст
$(".italic").on("click", function() {
    if ($("#text").css('font-style')== "italic") {
        $$("#text").css('font-style',"normal");
    } else {
        $$("#text").css('font-style',"italic");
    }
})
//Нижнє підкреслення
chooseFontStyle.underline.onclick = function() {
    for (var i = 0; i < text.children.length; i++) {
        if (text.children[i].style.textDecoration != "underline") {
            text.children[i].style.textDecoration = "underline";
        } else {
            text.children[i].style.textDecoration = "none";
        }
    }
}
// встановити розмір шрифту
var chooseFontSize = df.chooseFontSize;
chooseFontSize.onchange = function() {
    for (var i = 0; i < chooseFontSize.fontSize.length; i++) {
        if (chooseFontSize.fontSize.options[i].selected) {
            text.style.fontSize = chooseFontSize.fontSize.options[i].value;
        }
    }
}
// встановити font-family
var chooseFontFamily = df.chooseFontFamily;
chooseFontFamily.onchange = function() {
    for (var i = 0; i < chooseFontFamily.fontFamily.length; i++) {
        if (chooseFontFamily.fontFamily.options[i].selected) {
            text.style.fontFamily = chooseFontFamily.fontFamily.options[i].value;
        }
    }
}
//вирівнювання тексту
var chooseTextAlign = df.chooseTextAlign;
chooseTextAlign.onchange = function() {
    for (var i = 0; i < chooseTextAlign.length; i++) {
        if (chooseTextAlign[i].checked) {
            text.style.textAlign = chooseTextAlign[i].value;
        }
    }
}
//колір тексту
var chooseColor = df.chooseColor;
var cells = document.getElementsByTagName("td"); // клітинки з кольорами
chooseColor.color.addEventListener("click", function() {
    panelFunction("colorTab");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function() {
            text.style.color = this.style.backgroundColor;
        }
    }
});

//ФОН
// колір фону
function bgColor() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function() {
            text.style.backgroundColor = this.style.backgroundColor;
            text.style.backgroundImage = 'none';
        }
    }
}
chooseColor.bg.addEventListener("click", function() { //через панель стилів
    panelFunction("addBgImage");
    bgColor();

});
var addBgColor = df.addColor.bgColor; // через кнопку вспливаючого вікна
addBgColor.addEventListener("click", function() {
    panelFunction("addBgImage");
    bgColor();
});
//фонове зображення з таблиці
addBgImage.bgImage.addEventListener("click", function() {
    panelFunction("imageTab");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = function() {
            text.style.backgroundImage = this.style.backgroundImage;
        }
    }
});
// Загрузити фонове зображення
var uploadFile = df.uploadFile;
uploadFile.uploadImg.onchange = function() {
    var reader = new FileReader();
    file = this.files[0]
    reader.onloadend = function() {
        text.style.backgroundImage = 'url(' + this.result + ')';
    }
    reader.readAsDataURL(file);
}

//РЕДАКТОР
//включити панель редагування
var editorField = df.editForm.editorField; //textarea
var editBut = df.editBut.edit; // кнопкa "редагувати";
editBut.addEventListener("click", function() {
    panelFunction("editor");
    editorField.value = text.innerHTML; // передача тексту в поле редактора
});
// передача редагованого тексту на "екран"
var editPanBut = df.editPanBut; // кнопки панелі редагування
var saveBut = editPanBut.saveBut; // кнопка "зберегти"
saveBut.addEventListener("click", function() {
    panelFunction();
    text.innerHTML = editorField.value;
});

//ТАБЛИЦЯ
var createTabBut = editPanBut.createTabBut;
var createTabPannel = getE("createTabPannel");
var createTabForm = df.createTabForm;
//викликати вікно створення таблиці
createTabBut.addEventListener("click", function() {
    panelFunction("createTabPannel");
});
//створити таблицю
createTabForm.createTabB.addEventListener("click", function() {
    var tr = parseInt(createTabForm.elements.rows.value);
    var td = parseInt(createTabForm.elements.cols.value);
    var width = parseInt(createTabForm.elements.width.value);
    var height = parseInt(createTabForm.elements.height.value);
    var cellspacing = parseInt(createTabForm.elements.cellspacing.value);
    var borderWidth = parseInt(createTabForm.elements.borderWidth.value);
    var borderColor = createTabForm.elements.borderColor.value;
    editorField.value += "<table width=" + width + " height=" + height + " border=" + borderWidth + " bordercolor=" + borderColor + " cellspacing=" + cellspacing + ">";
    for (var i = 0; i < tr; i++) {
        editorField.value += "<tr>";
        for (var j = 0; j < td; j++) {
            editorField.value += "<td></td>"
        }
        editorField.value += "</tr>";
    }
    editorField.value += "</table>"
});

//СПИСОК
var createListBut = editPanBut.createListBut;
var createListPannel = getE("createListPannel");
var chooseList = df.chooseList;
//викликати вікно створення списку
createListBut.addEventListener("click", function() {
    panelFunction("createListPannel");
});
//створити список
chooseList.createListB.onclick = function() {
    var items = parseInt(chooseList.elements.items.value); //кількість елементів
    var mark = chooseList.elements.markType.value; //тип маркера
    editorField.value += "<ol style='list-style-type:" + mark + "'>";
    for (var i = 0; i < items; i++) {
        editorField.value += "<li>Текст</li>"
    }
    editorField.value += "</ol>";
}