writeValue = function (ctx, value, pos) {
    var scale = getScalingFactor(getCanvas(), getBackgroundImage());
    pos = { x: pos.x / scale.x, y: pos.y / scale.y };

    ctx.save();
    ctx.scale(scale.x, scale.y);
    ctx.fillText(value, pos.x, pos.y);
    ctx.restore();
}

getScalingFactor = function (canvas, warcryCardOne) {
    return {
        x: canvas.width / warcryCardOne.width,
        y: canvas.height / warcryCardOne.height
    };
}

getCanvas = function () {
    return document.getElementById("canvas");
}

getContext = function () {
    return getCanvas().getContext("2d");
}

getBackgroundImage = function () {
    if (document.getElementById('bg-01').checked) {
        return document.getElementById('bg-dark-102');

    } else if (document.getElementById('bg-02').checked) {
        return document.getElementById('bg-dark-302');

    } else if (document.getElementById('bg-03').checked) {
        return document.getElementById('bg-fire-102');

    } else if (document.getElementById('bg-04').checked) {
        return document.getElementById('bg-ghur-401');

    } else if (document.getElementById('bg-05').checked) {
        return document.getElementById('bg-dark-103');

    } else if (document.getElementById('bg-06').checked) {
        return document.getElementById('bg-dark-303');

    } else if (document.getElementById('bg-07').checked) {
        return document.getElementById('bg-fire-103');

    } else if (document.getElementById('bg-08').checked) {
        return document.getElementById('bg-ghur-402');
    }
}

drawBackground = function () {
    getContext().drawImage(
        getBackgroundImage(), 0, 0, getCanvas().width, getCanvas().height);
}

scalePixelPosition = function (pixelPosition) {
    var scalingFactor = getScalingFactor(getCanvas(), getBackgroundImage());
    var scaledPosition = { x: pixelPosition.x * scalingFactor.x, y: pixelPosition.y * scalingFactor.y };
    return scaledPosition;
}

writeScaled = function (value, pixelPos) {
    var scaledPos = scalePixelPosition(pixelPos);
    writeValue(getContext(), value, scaledPos);
}

drawCardElementFromInput = function (inputElement, pixelPosition) {
    var value = inputElement.value;
    writeScaled(value, pixelPosition);
}

drawCardElementFromInputId = function (inputId, pixelPosition) {
    drawCardElementFromInput(document.getElementById(inputId), pixelPosition);
}

drawAbility = function (id, pixelPosition) {
    getContext().font = '28px Georgia, serif';
    getContext().fillStyle = 'black';
    getContext().textAlign = 'left';

    var reaction = document.getElementById('ability' + id + '-reaction'),
        double = document.getElementById('ability' + id + '-double'),
        triple = document.getElementById('ability' + id + '-triple'),
        quad = document.getElementById('ability' + id + '-quad'),
        name = document.getElementById('ability' + id + '-name').value,
        text = document.getElementById('ability' + id + '-text').value,
        transReaction = document.getElementById('card-translation-reaction').value,
        transDouble = document.getElementById('card-translation-double').value,
        transTriple = document.getElementById('card-translation-triple').value,
        transQuad = document.getElementById('card-translation-quad').value;

    // https://stackoverflow.com/a/35119260; http://jsfiddle.net/BaG4J/1/
    var textblock = (function () {
        var txt = '';
        var title = '';

        if (reaction.checked) {
            if (transReaction.length) {
                //var txt = '[' + transReaction + '] ' + name + ': ' + text;
                // new title variable for the text to be in bold
                var title = '[' + transReaction + '] ' + name + ': ';
                // this adds spaces equal to twice the title length (as it's bold) to the text
                var txt = '  '.repeat(title.length) + text;
            } else {
                var title = '[Reaction] ' + name + ': ';
                var txt = ' '.repeat(title.length) + text;
                //var txt = '[Reaction] ' + name + ': ' + text;
            }
        } else if (double.checked) {
            if (transDouble.length) {
                //var txt = '[' + transDouble + '] ' + name + ': ' + text;
                // new title variable for the text to be in bold
                var title = '[' + transDouble + '] ' + name + ': ';
                // this adds spaces equal to twice the title length (as it's bold) to the text
                var txt = '  '.repeat(title.length) + text;
            } else {
                //var txt = '[Double] ' + name + ': ' + text;
                var title = '[Double] ' + name + ': ';
                var txt = ' '.repeat(title.length) + text;
            }
        } else if (triple.checked) {
            if (transTriple.length) {
                //var txt = '[' + transTriple + '] ' + name + ': ' + text;
                // new title variable for the text to be in bold
                var title = '[' + transTriple + '] ' + name + ': ';
                // this adds spaces equal to twice the title length (as it's bold) to the text
                var txt = '  '.repeat(title.length) + text;
            } else {
                //var txt = '[Triple] ' + name + ': ' + text;
                var title = '[Triple] ' + name + ': ';
                var txt = ' '.repeat(title.length) + text;
            }
        } else if (quad.checked) {
            if (transQuad.length) {
                //var txt = '[' + transQuad + '] ' + name + ': ' + text;
                // new title variable for the text to be in bold
                var title = '[' + transQuad + '] ' + name + ': ';
                // this adds spaces equal to twice the title length (as it's bold) to the text
                var txt = '  '.repeat(title.length) + text;
            } else {
                //var txt = '[Quad] ' + name + ': ' + text;
                var title = '[Quad] ' + name + ': ';
                var txt = ' '.repeat(title.length) + text;
            }
        }

        // All this added to print new title variable
        getContext().font = 'bold 28px Georgia, serif';
        writeScaled(title,
            { x: pixelPosition.x, y: pixelPosition.y }
        );
        getContext().font = '28px Georgia, serif';
        // end added section

        var lines = txt.split('\n');

        for (var i = 0; i < lines.length; i++) {
            writeScaled(
                lines[i],
                { x: pixelPosition.x, y: pixelPosition.y + (i * 35) }
            );
        }
    })();
}

drawCardTranslationAbilities = function (value) {
    getContext().font = '28px Georgia, serif';
    getContext().fillStyle = 'white';
    getContext().textAlign = 'center';
    writeScaled(value, { x: (1772 / 2), y: 55 });
}

drawCardTitle = function (value) {
    getContext().font = '92px rodchenkoctt';
    getContext().fillStyle = 'white';
    getContext().textAlign = 'center';
    writeScaled(value, { x: (1772 / 2), y: 135 });
}

function getLabel(element) {
    return $(element).prop("labels")[0];
}

function getImage(element) {
    return $(element).find("img")[0];
}

function getSelectedRunemark(radioDiv) {
    var checked = $(radioDiv).find('input:checked');
    if (checked.length > 0) {
        //console.log(getImage(getLabel(checked[0])).getAttribute("src"));
        return getImage(getLabel(checked[0])).getAttribute("src");
    }
    return null;
}

function setSelectedFactionRunemark(runemark) {
    var factionRunemarksDiv = $("#factionRunemarkSelect");
    {
        var checked = factionRunemarksDiv.find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = factionRunemarksDiv.find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = 'black';
        }
    }
    var queryString = "img[src='" + runemark + "']";
    var imgs = factionRunemarksDiv.find(queryString);
    if (imgs.length > 0) {
        var checkbox = $(imgs[0].parentNode.parentNode).find('input')[0];
        checkbox.checked = true;
        imgs[0].style.backgroundColor = "#00bc8c";
    } else {
        var newDiv = addToImageCheckboxSelector(runemark, factionRunemarksDiv[0], 'black');
        $(newDiv).find('img')[0].style.backgroundColor = "#00bc8c";
        $(newDiv).find('input')[0].checked = true;
    }
}

function setSelectedSubfactionRunemark(runemark) {
    var subfactionRunemarksDiv = $("#subfactionRunemarkSelect");
    {
        var checked = subfactionRunemarksDiv.find('input:checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].checked = false;
        }
        var icons = subfactionRunemarksDiv.find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = 'black';
        }
    }
    var queryString = "img[src='" + runemark + "']";
    var imgs = subfactionRunemarksDiv.find(queryString);
    if (imgs.length > 0) {
        var checkbox = $(imgs[0].parentNode.parentNode).find('input')[0];
        checkbox.checked = true;
        imgs[0].style.backgroundColor = "#00bc8c";
    } else {
        var newDiv = addToImageCheckboxSelector(runemark, subfactionRunemarksDiv[0], 'black');
        $(newDiv).find('img')[0].style.backgroundColor = "#00bc8c";
        $(newDiv).find('input')[0].checked = true;
    }
}

function getSelectedFactionRunemark() {
    return getSelectedRunemark($('#factionRunemarkSelect')[0]);
}

function getSelectedSubfactionRunemark() {
    return getSelectedRunemark($('#subfactionRunemarkSelect')[0]);
}

function drawImage(scaledPosition, scaledSize, image) {
    if (image != null) {
        if (image.complete) {
            getContext().drawImage(image, scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
        }
        else {
            image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        }
    }
}

function drawImageSrc(scaledPosition, scaledSize, imageSrc) {
    if (imageSrc != null) {
        var image = new Image();
        image.onload = function () { drawImage(scaledPosition, scaledSize, image); };
        image.src = imageSrc;
    }
}

function drawTagRunemark(index, runemark, row) {
    // draw the runemarks
    var positions = []
    y_pos = 210;

    if (document.getElementById('ability7-toggle').checked) {

        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{ x: 175, y: 210 }, { x: 285, y: 210 }, { x: 395, y: 210 }];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{ x: 175, y: 360 }, { x: 285, y: 360 }, { x: 395, y: 360 }];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{ x: 175, y: 510 }, { x: 285, y: 510 }, { x: 395, y: 510 }];
        } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
            positions = [{ x: 175, y: 660 }, { x: 285, y: 660 }, { x: 395, y: 660 }];
        } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
            positions = [{ x: 175, y: 810 }, { x: 285, y: 810 }, { x: 395, y: 810 }];
        } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
            positions = [{ x: 175, y: 960 }, { x: 285, y: 960 }, { x: 395, y: 960 }];
        } else if (row == 7 && document.getElementById('ability7-toggle').checked) {
            positions = [{ x: 175, y: 1110 }, { x: 285, y: 1110 }, { x: 395, y: 1110 }];
        }
    }
    else {
        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{ x: 175, y: 210 }, { x: 285, y: 210 }, { x: 395, y: 210 }];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{ x: 175, y: 385 }, { x: 285, y: 385 }, { x: 395, y: 385 }];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{ x: 175, y: 560 }, { x: 285, y: 560 }, { x: 395, y: 560 }];
        } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
            positions = [{ x: 175, y: 735 }, { x: 285, y: 735 }, { x: 395, y: 735 }];
        } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
            positions = [{ x: 175, y: 900 }, { x: 285, y: 900 }, { x: 395, y: 900 }];
        } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
            positions = [{ x: 175, y: 1075 }, { x: 285, y: 1075 }, { x: 395, y: 1075 }];
        }
    }

    /*
    with 4th runemark
    
        if (row == 1 && document.getElementById('ability1-toggle').checked) {
            positions = [{x: 175, y: 225}, {x: 285, y: 225}, {x: 395, y: 225}, {x: 505, y: 225}];
        } else if (row == 2 && document.getElementById('ability2-toggle').checked) {
            positions = [{x: 175, y: 410}, {x: 285, y: 410}, {x: 395, y: 410}, {x: 505, y: 410}];
        } else if (row == 3 && document.getElementById('ability3-toggle').checked) {
            positions = [{x: 175, y: 580}, {x: 285, y: 580}, {x: 395, y: 580}, {x: 505, y: 580}];
        } else if (row == 4 && document.getElementById('ability4-toggle').checked) {
            positions = [{x: 175, y: 760}, {x: 285, y: 760}, {x: 395, y: 760}, {x: 505, y: 760}];
        } else if (row == 5 && document.getElementById('ability5-toggle').checked) {
            positions = [{x: 175, y: 940}, {x: 285, y: 940}, {x: 395, y: 940}, {x: 505, y: 940}];
        } else if (row == 6 && document.getElementById('ability6-toggle').checked) {
            positions = [{x: 175, y: 1115}, {x: 285, y: 1115}, {x: 395, y: 1115}, {x: 505, y: 1115}];
        }
    */

    if (index >= positions.length) return;

    var img = $("#circle")[0],
        position = scalePixelPosition(positions[index]),
        size = scalePixelPosition({ x: 90, y: 90 });

    // position = scalePixelPosition({x: positions[index].x + 15, y: positions[index].y + 15});
    // size = scalePixelPosition({x: 130, y: 130});
    position = scalePixelPosition({ x: positions[index].x, y: positions[index].y });

    drawImage(position, { x: 90, y: 90 }, img);
    drawImageSrc(position, size, runemark);
}

function getName() {
    //var textInput = $("#saveNameInput")[0];
    return "Default";
}

function setName(name) {
    //var textInput = $("#saveNameInput")[0];
    //textInput.value = name;
}

function readtagRunemarksOne() {
    var array = new Array;
    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseFourOne").find('input:checked');
    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksTwo() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseFourTwo").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksThree() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseFourThree").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksFour() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseFourFour").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksFive() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseFourFifth").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}
function readTagRunemarksSix() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseFourSixth").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}

function readTagRunemarksSeven() {
    var array = new Array;

    var checkedBoxes = $("#tagRunemarkSelect_abilitiesCollapseFourSeventh").find('input:checked');

    for (i = 0; i < checkedBoxes.length; i++) {
        array.push(getImage(getLabel(checkedBoxes[i])).getAttribute("src"));
    }
    return array;
}

function setSelectedTagRunemarks(selectedRunemarksArray) {
    // var tagRunemarksDiv = $('#tagRunemarkSelect');
    var tagRunemarksDiv = $("[id^='tagRunemarkSelect_']");
    {
        // var checked = tagRunemarksDiv.find('input:checked');
        // for (var i = 0; i < checked.length; i++) {
        //     checked[i].checked = false;
        // }
        var icons = tagRunemarksDiv.find('img');
        for (var i = 0; i < icons.length; i++) {
            icons[i].style.backgroundColor = 'white';
        }
    }
    /* due to some issues, taking this out for the time being
    for (var i = 0; i < selectedRunemarksArray.length; i++) {
        var runemark = selectedRunemarksArray[i];
        var queryString = "img[src='" + runemark + "']";
        var imgs = tagRunemarksDiv.find(queryString);
        if (imgs.length > 0) {
            var checkbox = $(imgs[0].parentNode.parentNode).find('input')[0];
            checkbox.checked = true;
            imgs[0].style.backgroundColor = "#00bc8c";
        } else {
            var newDiv = addToImageCheckboxSelector(runemark, tagRunemarksDiv[0], 'white');
            $(newDiv).find('img')[0].style.backgroundColor = "#00bc8c";
            $(newDiv).find('input')[0].checked = true;
        }
    }
    */
}


function readControls() {
    var data = new Object;
    data.name = getName();
    // data.imageUrl = getModelImage();
    // data.imageProperties = getModelImageProperties();

    data.cardTranslationAbilities = document.getElementById('card-translation-abilities').value;
    data.cardTitle = document.getElementById('card-title').value;

    data.factionRunemark = getSelectedFactionRunemark();
    data.subfactionRunemark = getSelectedSubfactionRunemark();

    data.ability1checked = document.getElementById('ability1-toggle').checked;
    data.ability2checked = document.getElementById('ability2-toggle').checked;
    data.ability3checked = document.getElementById('ability3-toggle').checked;
    data.ability4checked = document.getElementById('ability4-toggle').checked;
    data.ability5checked = document.getElementById('ability5-toggle').checked;
    data.ability6checked = document.getElementById('ability6-toggle').checked;
    data.ability7checked = document.getElementById('ability7-toggle').checked;

    data.ability1Name = document.getElementById('ability1-name').value;
    data.ability2Name = document.getElementById('ability2-name').value;
    data.ability3Name = document.getElementById('ability3-name').value;
    data.ability4Name = document.getElementById('ability4-name').value;
    data.ability5Name = document.getElementById('ability5-name').value;
    data.ability6Name = document.getElementById('ability6-name').value;
    data.ability7Name = document.getElementById('ability7-name').value;

    data.ability1Text = document.getElementById('ability1-text').value;
    data.ability2Text = document.getElementById('ability2-text').value;
    data.ability3Text = document.getElementById('ability3-text').value;
    data.ability4Text = document.getElementById('ability4-text').value;
    data.ability5Text = document.getElementById('ability5-text').value;
    data.ability6Text = document.getElementById('ability6-text').value;
    data.ability7Text = document.getElementById('ability7-text').value;

    data.tagRunemarksOne = readtagRunemarksOne();
    data.tagRunemarksTwo = readTagRunemarksTwo();
    data.tagRunemarksThree = readTagRunemarksThree();
    data.tagRunemarksFour = readTagRunemarksFour();
    data.tagRunemarksFive = readTagRunemarksFive();
    data.tagRunemarksSix = readTagRunemarksSix();
    data.tagRunemarksSeven = readTagRunemarksSeven();

    data.bg01 = document.getElementById('bg-01').checked;
    data.bg02 = document.getElementById('bg-02').checked;
    data.bg03 = document.getElementById('bg-03').checked;
    data.bg04 = document.getElementById('bg-04').checked;
    data.bg05 = document.getElementById('bg-05').checked;
    data.bg06 = document.getElementById('bg-06').checked;
    data.bg07 = document.getElementById('bg-07').checked;
    data.bg08 = document.getElementById('bg-08').checked;

    return data;
}

function drawFactionRunemark(image, inc) {
    // drawImageSrc({x: 57.5, y: 57.5}, {x: 100, y: 100}, image);
    // if we have 6 items then it's different spacing to seven
    // both start here
    y_pos = 205;
    // for 7 spacing its + 150 for 6 spacing it's + 175
    drawImageSrc({ x: 92.5, y: 35 }, { x: 135, y: 135 }, image);
    if (getSelectedSubfactionRunemark() == null || getSelectedSubfactionRunemark() == 'assets/img/blank.gif') {
        if (document.getElementById('ability1-toggle').checked) {
            var positions = { x: 60, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
        if (document.getElementById('ability2-toggle').checked) {
            var positions = { x: 60, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
        if (document.getElementById('ability3-toggle').checked) {
            var positions = { x: 60, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
        if (document.getElementById('ability4-toggle').checked) {
            var positions = { x: 60, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
        if (document.getElementById('ability5-toggle').checked) {
            var positions = { x: 60, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
        if (document.getElementById('ability6-toggle').checked) {
            var positions = { x: 60, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
        y_pos += inc;
        if (document.getElementById('ability7-toggle').checked) {
            var positions = { x: 60, y: y_pos },
                replacedImage = image.replace('white', 'black');
            drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
            drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
        }
    }

}
function drawSubfactionRunemark(image, inc) {
    // drawImageSrc({x: 57.5, y: 57.5}, {x: 90, y: 90}, image);
    // if we have 6 items then it's different spacing to seven
    // both start here
    y_pos = 210;
    // for 7 spacing its + 150 for 6 spacing it's + 175
    drawImageSrc({ x: 224, y: 58 }, { x: 90, y: 90 }, image);

    if (document.getElementById('ability1-toggle').checked) {
        var positions = { x: 65, y: y_pos },
            replacedImage = image.replace('white', 'black');
        drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
        drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
    }
    y_pos += inc;
    if (document.getElementById('ability2-toggle').checked) {
        var positions = { x: 65, y: y_pos },
            replacedImage = image.replace('white', 'black');
        drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
        drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
    }
    y_pos += inc;
    if (document.getElementById('ability3-toggle').checked) {
        var positions = { x: 65, y: y_pos },
            replacedImage = image.replace('white', 'black');
        drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
        drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
    }
    y_pos += inc;
    if (document.getElementById('ability4-toggle').checked) {
        var positions = { x: 65, y: y_pos },
            replacedImage = image.replace('white', 'black');
        drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
        drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
    }
    y_pos += inc;
    if (document.getElementById('ability5-toggle').checked) {
        var positions = { x: 65, y: y_pos },
            replacedImage = image.replace('white', 'black');
        drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
        drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
    }
    y_pos += inc;
    if (document.getElementById('ability6-toggle').checked) {
        var positions = { x: 65, y: y_pos },
            replacedImage = image.replace('white', 'black');
        drawImage(positions, { x: 90, y: 90 }, $("#circle")[0]);
        drawImageSrc(positions, { x: 90, y: 90 }, replacedImage);
    }
}

render = function (cardData) {
    drawBackground();
    // drawModel(cardData.imageUrl, cardData.imageProperties);

    drawCardTranslationAbilities(cardData.cardTranslationAbilities);
    drawCardTitle(cardData.cardTitle);

    if (document.getElementById('ability7-toggle').checked) {
        drawFactionRunemark(cardData.factionRunemark, 151);
        drawSubfactionRunemark(cardData.subfactionRunemark, 151);
    }
    else {
        drawFactionRunemark(cardData.factionRunemark, 174);
        drawSubfactionRunemark(cardData.subfactionRunemark, 174);
    }

    // idea here is to check the number of runemarks being used per row
    // then adjust the text size to account.
    // would need to check cardData.tagRunemarksOne

    max_tagRunemarks = Math.max(cardData.tagRunemarksOne.length, cardData.tagRunemarksTwo.length,
        cardData.tagRunemarksThree.length, cardData.tagRunemarksFour.length,
        cardData.tagRunemarksFive.length, cardData.tagRunemarksSix.length,
        cardData.tagRunemarksSeven.length);
    if (max_tagRunemarks < 2) {
        x_value = 300;
    }
    if (max_tagRunemarks == 2) {
        x_value = 400;
    }
    if (max_tagRunemarks > 2) {
        x_value = 500;
    }
    y_value = 210;
    // for 7 spacing its + 150 for 6 spacing it's + 175

    if (document.getElementById('ability7-toggle').checked) {
        if (document.getElementById('ability1-toggle').checked) {
            drawAbility(1, { x: x_value, y: y_value });
        }
        y_value += 150;
        if (document.getElementById('ability2-toggle').checked) {
            drawAbility(2, { x: x_value, y: y_value });
        }
        y_value += 150;
        if (document.getElementById('ability3-toggle').checked) {
            drawAbility(3, { x: x_value, y: y_value });
        }
        y_value += 150;
        if (document.getElementById('ability4-toggle').checked) {
            drawAbility(4, { x: x_value, y: y_value });
        }
        y_value += 150;
        if (document.getElementById('ability5-toggle').checked) {
            drawAbility(5, { x: x_value, y: y_value });
        }
        y_value += 150;
        if (document.getElementById('ability6-toggle').checked) {
            drawAbility(6, { x: x_value, y: y_value });
        }
        y_value += 150;
        if (document.getElementById('ability7-toggle').checked) {
            drawAbility(7, { x: x_value, y: y_value });
        }
    } else {
        if (document.getElementById('ability1-toggle').checked) {
            drawAbility(1, { x: x_value, y: y_value });
        }
        y_value += 175;
        if (document.getElementById('ability2-toggle').checked) {
            drawAbility(2, { x: x_value, y: y_value });
        }
        y_value += 175;
        if (document.getElementById('ability3-toggle').checked) {
            drawAbility(3, { x: x_value, y: y_value });
        }
        y_value += 175;
        if (document.getElementById('ability4-toggle').checked) {
            drawAbility(4, { x: x_value, y: y_value });
        }
        y_value += 175;
        if (document.getElementById('ability5-toggle').checked) {
            drawAbility(5, { x: x_value, y: y_value });
        }
        y_value += 175;
        if (document.getElementById('ability6-toggle').checked) {
            drawAbility(6, { x: x_value, y: y_value });
        }

    }

    for (i = 0; i < cardData.tagRunemarksOne.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksOne[i], 1);
    }
    for (i = 0; i < cardData.tagRunemarksTwo.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksTwo[i], 2);
    }
    for (i = 0; i < cardData.tagRunemarksThree.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksThree[i], 3);
    }
    for (i = 0; i < cardData.tagRunemarksFour.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksFour[i], 4);
    }
    for (i = 0; i < cardData.tagRunemarksFive.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksFive[i], 5);
    }
    for (i = 0; i < cardData.tagRunemarksSix.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksSix[i], 6);
    }
    for (i = 0; i < cardData.tagRunemarksSeven.length; i++) {
        drawTagRunemark(i, cardData.tagRunemarksSeven[i], 7);
    }


};

function writeControls(cardData) {

    setName(cardData.name);
    console.log(cardData);

    $('#card-title').value = cardData.cardTitle;
    $('#card-translation-abilities').value = cardData.cardTranslationAbilities;
    $('#card-translation-double').value = cardData.cardTranslationDouble;
    $('#card-translation-triple').value = cardData.cardTranslationTriple;
    $('#card-translation-quad').value = cardData.cardTranslationQuad;

    setSelectedFactionRunemark(cardData.factionRunemark);
    setSelectedSubfactionRunemark(cardData.subfactionRunemark);

    // check and uncheck if needed
    document.getElementById('ability1-toggle').checked = cardData.ability1checked;
    document.getElementById('ability2-toggle').checked = cardData.ability2checked;
    document.getElementById('ability3-toggle').checked = cardData.ability3checked;
    document.getElementById('ability4-toggle').checked = cardData.ability4checked;
    document.getElementById('ability5-toggle').checked = cardData.ability5checked;
    document.getElementById('ability6-toggle').checked = cardData.ability6checked;
    document.getElementById('ability7-toggle').checked = cardData.ability7checked;

    document.getElementById("ability1-name").value = cardData.ability1Name;
    document.getElementById("ability2-name").value = cardData.ability2Name;
    document.getElementById("ability3-name").value = cardData.ability3Name;
    document.getElementById("ability4-name").value = cardData.ability4Name;
    document.getElementById("ability5-name").value = cardData.ability5Name;
    document.getElementById("ability6-name").value = cardData.ability6Name;
    document.getElementById("ability7-name").value = cardData.ability7Name;

    document.getElementById("ability1-text").value = cardData.ability1Text;
    document.getElementById("ability2-text").value = cardData.ability2Text;
    document.getElementById("ability3-text").value = cardData.ability3Text;
    document.getElementById("ability4-text").value = cardData.ability4Text;
    document.getElementById("ability5-text").value = cardData.ability5Text;
    document.getElementById("ability6-text").value = cardData.ability6Text;
    document.getElementById("ability7-text").value = cardData.ability7Text;

    // this doesn't appear to work
    var runes_one = cardData.tagRunemarksOne,
        runes_two = cardData.tagRunemarksTwo,
        runes_three = cardData.tagRunemarksThree,
        runes_four = cardData.tagRunemarksFour,
        runes_five = cardData.tagRunemarksFive,
        runes_six = cardData.tagRunemarksSix,
        runes_seven = cardData.tagRunemarksSeven;
    //var tagRuneMarks = $.merge(runes_one, runes_two, runes_three, runes_four, runes_five, runes_six, runes_seven);

    // amended the below function to cut out everything put marking backgrounds as white
    //setSelectedTagRunemarks(tagRuneMarks);
    /*
        onTagRunemarkSelectionChanged = function (checkbox, backgroundColor) {
            // getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "tomato" : backgroundColor;
            getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "#00bc8c" : backgroundColor;
            onAnyChange();
        }
    */

    // first we clear all the ability runetags
    tagPrefix = ["one", "two", "three", "four", "five", "six", "seven"];
    tagSuffix = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
        "Nineteen", "Twenty", "Twentyone", "Twentytwo", "Twentythree", "Twentyfour", "Twentyfive"];

    for (i in tagPrefix) {
        for (j in tagSuffix) {
            rune_id = tagPrefix[i] + tagSuffix[j];
            document.getElementById(rune_id).checked = false;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#FFFFFF";
        }
    }

    // this next section will select the required tags
    if (runes_one.length > 0) {
        for (i in runes_one) {
            rune_id = getTagRunemarkId(runes_one[i], "one");
            console.log(rune_id + ": " + runes_one[i]);
            document.getElementById(rune_id).checked = true;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
        }
    }
    if (runes_two.length > 0) {
        for (i in runes_two) {
            rune_id = getTagRunemarkId(runes_two[i], "two");
            document.getElementById(rune_id).checked = true;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
        }
    }
    if (runes_three.length > 0) {
        for (i in runes_three) {
            rune_id = getTagRunemarkId(runes_three[i], "three");
            document.getElementById(rune_id).checked = true;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
        }
    }
    if (runes_four.length > 0) {
        for (i in runes_four) {
            rune_id = getTagRunemarkId(runes_four[i], "four");
            document.getElementById(rune_id).checked = true;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
        }
    }
    if (runes_five.length > 0) {
        for (i in runes_five) {
            rune_id = getTagRunemarkId(runes_five[i], "five");
            document.getElementById(rune_id).checked = true;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
        }
    }
    if (runes_six.length > 0) {
        for (i in runes_six) {
            rune_id = getTagRunemarkId(runes_six[i], "six");
            document.getElementById(rune_id).checked = true;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
        }
    }
    if (runes_seven.length > 0) {
        for (i in runes_seven) {
            rune_id = getTagRunemarkId(runes_seven[i], "seven");
            document.getElementById(rune_id).checked = true;
            getImage(getLabel(document.getElementById(rune_id))).style.backgroundColor = "#00bc8c";
        }
    }

    // check and uncheck backgrounds if needed
    document.getElementById('bg-01').checked = cardData.bg01;
    document.getElementById('bg-02').checked = cardData.bg02;
    document.getElementById('bg-03').checked = cardData.bg03;
    document.getElementById('bg-04').checked = cardData.bg04;
    document.getElementById('bg-05').checked = cardData.bg05;
    document.getElementById('bg-06').checked = cardData.bg06;
    document.getElementById('bg-07').checked = cardData.bg07;
    document.getElementById('bg-08').checked = cardData.bg08;

}

function defaultCardData() {
    var cardData = new Object;
    cardData.name = 'Default';
    // cardData.imageUrl = null;
    // cardData.imageProperties = getDefaultModelImageProperties();

    cardData.cardTitle = 'Iron Golem';
    cardData.cardTranslationAbilities = 'Abilities';
    cardData.cardTranslationReaction = 'Reaction';
    cardData.cardTranslationDouble = 'Double';
    cardData.cardTranslationTriple = 'Triple';
    cardData.cardTranslationQuad = 'Quad';

    cardData.factionRunemark = 'runemarks/white/factions-chaos-iron-golems.svg';
    cardData.subfactionRunemark = 'assets/img/blank.gif';

    cardData.ability1checked = true;
    cardData.ability2checked = true;
    cardData.ability3checked = true;
    cardData.ability4checked = true;
    cardData.ability5checked = true;
    cardData.ability6checked = true;
    cardData.ability7checked = false;

    cardData.ability1Name = 'First ability name';
    cardData.ability2Name = 'Second ability name';
    cardData.ability3Name = 'Third ability name';
    cardData.ability4Name = 'Fourth ability name';
    cardData.ability5Name = 'Fifth ability name';
    cardData.ability6Name = 'Sixth ability name';
    cardData.ability7Name = 'Seventh ability name';

    cardData.ability1Text = '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability2Text = '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability3Text = '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability4Text = '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability5Text = '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability6Text = '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';
    cardData.ability7Text = '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor.';

    cardData.tagRunemarksOne = new Array;
    cardData.tagRunemarksOne.push('runemarks/black/fighters-berserker.svg');
    cardData.tagRunemarksTwo = new Array;
    cardData.tagRunemarksThree = new Array;
    cardData.tagRunemarksFour = new Array;
    cardData.tagRunemarksFive = new Array;
    cardData.tagRunemarksSix = new Array;
    cardData.tagRunemarksSeven = new Array;

    cardData.bg01 = false;
    cardData.bg02 = false;
    cardData.bg03 = false;
    cardData.bg04 = true;
    cardData.bg05 = false;
    cardData.bg06 = false;
    cardData.bg07 = false;
    cardData.bg08 = false;

    return cardData;
}

function saveCardDataMap(newMap) {
    window.localStorage.setItem("cardDataMap", JSON.stringify(newMap));
}

function loadCardDataMap() {
    var storage = window.localStorage.getItem("cardDataMap");
    if (storage != null) {
        return JSON.parse(storage);
    }
    // Set up the map.
    var map = new Object;
    map["Default"] = defaultCardData();
    saveCardDataMap(map);
    return map;
}

function loadLatestCardData() {
    var latestFighterName = window.localStorage.getItem("latestFighterName");
    if (latestFighterName == null) {
        latestFighterName = "Default";
    }

    console.log("Loading '" + latestFighterName + "'...");

    var data = loadCardData(latestFighterName);

    if (data) {
        console.log("Loaded data:");
        console.log(data);
    }
    else {
        console.log("Failed to load a fighter data.");
    }

    return data;
}

function saveLatestCardData() {
    var cardData = readControls();
    if (!cardData.name) {
        return;
    }

    window.localStorage.setItem("latestFighterName", cardData.name);
    saveCardData(cardData);
}

function loadCardData(cardDataName) {
    if (!cardDataName) {
        return null;
    }

    var map = loadCardDataMap();
    if (map[cardDataName]) {
        return map[cardDataName];
    }

    return null;
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
}

function onload2promise(obj) {
    return new Promise((resolve, reject) => {
        obj.onload = () => resolve(obj);
        obj.onerror = reject;
    });
}

async function getBase64ImgFromUrl(imgUrl) {
    let img = new Image();
    let imgpromise = onload2promise(img); // see comment of T S why you should do it this way.
    img.src = imgUrl;
    await imgpromise;
    var imgData = getBase64Image(img);
    return imgData;
}

async function handleImageUrlFromDisk(imageUrl) {
    if (imageUrl &&
        imageUrl.startsWith("blob:")) {
        // The image was loaded from disk. So we can load it later, we need to stringify it.
        imageUrl = await getBase64ImgFromUrl(imageUrl);
    }

    return imageUrl;
}

async function saveCardData(cardData) {
    var finishSaving = function () {
        var map = loadCardDataMap();
        map[cardData.name] = cardData;
        window.localStorage.setItem("cardDataMap", JSON.stringify(map));
    };

    if (cardData != null &&
        cardData.name) {
        // handle images we may have loaded from disk...
        cardData.imageUrl = await handleImageUrlFromDisk(cardData.imageUrl);
        cardData.factionRunemark = await handleImageUrlFromDisk(cardData.factionRunemark);
        cardData.subfactionRunemark = await handleImageUrlFromDisk(cardData.subfactionRunemark);

        for (i = 0; i < cardData.tagRunemarksOne.length; i++) {
            cardData.tagRunemarksOne[i] = await handleImageUrlFromDisk(cardData.tagRunemarksOne[i]);
        }
        for (i = 0; i < cardData.tagRunemarksTwo.length; i++) {
            cardData.tagRunemarksTwo[i] = await handleImageUrlFromDisk(cardData.tagRunemarksTwo[i]);
        }
        for (i = 0; i < cardData.tagRunemarksThree.length; i++) {
            cardData.tagRunemarksThree[i] = await handleImageUrlFromDisk(cardData.tagRunemarksThree[i]);
        }
        for (i = 0; i < cardData.tagRunemarksFour.length; i++) {
            cardData.tagRunemarksFour[i] = await handleImageUrlFromDisk(cardData.tagRunemarksFour[i]);
        }
        for (i = 0; i < cardData.tagRunemarksFive.length; i++) {
            cardData.tagRunemarksFive[i] = await handleImageUrlFromDisk(cardData.tagRunemarksFive[i]);
        }
        for (i = 0; i < cardData.tagRunemarksSix.length; i++) {
            cardData.tagRunemarksSix[i] = await handleImageUrlFromDisk(cardData.tagRunemarksSix[i]);
        }
        for (i = 0; i < cardData.tagRunemarksSeven.length; i++) {
            cardData.tagRunemarksSeven[i] = await handleImageUrlFromDisk(cardData.tagRunemarksSeven[i]);
        }

        finishSaving();
    }
}

function getLatestCardDataName() {
    return "latestCardData";
}

window.onload = function () {
    //window.localStorage.clear();
    var cardData = loadLatestCardData();
    writeControls(cardData);
    render(cardData);
    refreshSaveSlots();
}

onAnyChange = function () {
    var cardData = readControls();
    render(cardData);
    saveLatestCardData();
}

function onWeaponControlsToggled(weaponCheckbox) {
    var controlsDiv = $(weaponCheckbox.parentNode).find("#weaponInputs")[0];
    controlsDiv.style.display = weaponCheckbox.checked ? "block" : "none";

    onAnyChange();
}

onWeaponMinRangeChanged = function (minRange) {
    var maxRange = $(minRange.parentNode).find("#rangeMax")[0];
    maxRange.value = Math.max(minRange.value, maxRange.value);

    onAnyChange();
}

onWeaponMaxRangeChanged = function (maxRange) {
    var minRange = $(maxRange.parentNode).find("#rangeMin")[0];
    minRange.value = Math.min(maxRange.value, minRange.value);

    onAnyChange();
}

onRunemarkSelectionChanged = function (radioButton, backgroundColor) {
    var radioSection = radioButton.parentNode.parentNode;
    var allRadioButtons = $('input', radioSection);

    for (i = 0; i < allRadioButtons.length; i++) {
        getImage(getLabel(allRadioButtons[i])).style.backgroundColor = backgroundColor;
    }

    // getImage(getLabel(radioButton)).style.backgroundColor = "tomato";
    getImage(getLabel(radioButton)).style.backgroundColor = "#00bc8c";

    onAnyChange();
}

onTagRunemarkSelectionChanged = function (checkbox, backgroundColor) {
    // getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "tomato" : backgroundColor;
    getImage(getLabel(checkbox)).style.backgroundColor = checkbox.checked ? "#00bc8c" : backgroundColor;
    onAnyChange();
}

addToImageRadioSelector = function (imageSrc, imageSelector, radioGroupName, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
        <label for="${radioGroupName}-${imageSrc}"><img src="${imageSrc}" width="50" height="50" alt="" style="background-color:${bgColor};"></label>
        <input type="radio" style="display:none;" name="${radioGroupName}" id="${radioGroupName}-${imageSrc}" onchange="onRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    imageSelector.appendChild(div);
    return div;
}

onFactionRunemarkFileSelect = function () {
    var imageSelect = $("#additionalFactionMarkSelect")[0];
    var selectGrid = $("#factionRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "faction", "black");
    }
}

onSubfactionRunemarkFileSelect = function () {
    var imageSelect = $("#additionalSubfactionMarkSelect")[0];
    var selectGrid = $("#subfactionRunemarkSelect")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "subfaction", "black");
    }
}

onWeaponRunemarkFileSelect = function (input, weaponName) {
    var grid = $(input.parentNode).find("#weaponRunemarkSelect")[0];

    for (i = 0; i < input.files.length; i++) {
        addToImageRadioSelector(URL.createObjectURL(input.files[i]), grid, weaponName, "white");
    }
}

function addToImageCheckboxSelector(imgSrc, grid, bgColor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'mr-0');
    div.innerHTML = `
    <label for="checkbox-${imgSrc}">
        <img src="${imgSrc}" width="50" height="50" alt="" style="background-color:${bgColor};">
    </label>
    <input type="checkbox" style="display:none;" id="checkbox-${imgSrc}" onchange="onTagRunemarkSelectionChanged(this, '${bgColor}')">
    `;
    // grid.appendChild(div);
    return div;
}

function onTagRunemarkFileSelect() {
    var imageSelect = $("#additionalTagMarkSelect")[0];
    // var selectGrid = $("#tagRunemarkSelect")[0];
    var selectGrid = $("[id^='tagRunemarkSelect_']")[0];

    for (i = 0; i < imageSelect.files.length; i++) {
        addToImageCheckboxSelector(URL.createObjectURL(imageSelect.files[i]), selectGrid, "white");
    }
}

function onClearCache() {
    window.localStorage.clear();
    location.reload();
    return false;
}

function onResetToDefault() {
    var cardData = defaultCardData();
    writeControls(cardData);
    render(cardData);
}

function refreshSaveSlots() {
    // Remove all
    $('select').children('option').remove();

    var cardDataName = readControls().name;

    var map = loadCardDataMap();

    for (let [key, value] of Object.entries(map)) {
        var selected = false;
        if (cardDataName &&
            key == cardDataName) {
            selected = true;
        }
        var newOption = new Option(key, key, selected, selected);
        $('#saveSlotsSelect').append(newOption);
    }
}

async function onSaveClicked() {

    data = readControls();
    console.log(data);
    var exportObj = JSON.stringify(data, null, 4);

    var exportName = data.cardTitle;

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "warcry_abilities_" + exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function onLoadClicked() {
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();
    console.log("Loading '" + cardDataName + "'...");
    cardData = loadCardData(cardDataName);
    writeControls(cardData);
    render(cardData);
    refreshSaveSlots();
}

function onDeleteClicked() {
    var cardDataName = $('#saveSlotsSelect').find(":selected").text();
    console.log("Deleting '" + cardDataName + "'...");
    var map = loadCardDataMap();
    delete map[cardDataName];
    saveCardDataMap(map);
    refreshSaveSlots();
}

function saveCardAsImage() {
    var element = document.createElement('a');
    element.setAttribute('href', document.getElementById('canvas').toDataURL('image/png'));
    element.setAttribute('download', 'warcry-ability-card.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

$(document).ready(function () {
    var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();
});

async function readJSONFile(file) {
    // Function will return a new Promise which will resolve or reject based on whether the JSON file is read and parsed successfully
    return new Promise((resolve, reject) => {
        // Define a FileReader Object to read the file
        let fileReader = new FileReader();
        // Specify what the FileReader should do on the successful read of a file
        fileReader.onload = event => {
            // If successfully read, resolve the Promise with JSON parsed contents of the file
            resolve(JSON.parse(event.target.result))
        };
        // If the file is not successfully read, reject with the error
        fileReader.onerror = error => reject(error);
        // Read from the file, which will kick-off the onload or onerror events defined above based on the outcome
        fileReader.readAsText(file);
    });
}

async function fileChange(file) {
    // Function to be triggered when file input changes
    // As readJSONFile is a promise, it must resolve before the contents can be read - in this case logged to the console
    //readJSONFile(file).then(json => data);
    readJSONFile(file).then(json =>
        writeControls(json)
    );
    readJSONFile(file).then(json =>
        render(json)
    );
}

function getTagRunemarkId(runemark, ability) {
    // the id starts with the ability number in text form, one to seven lower case
    var result = ability;
    // the second part is One to Twentyfive each starting with a capital
    // each runemark is in order, so we can get the second part based on 
    if (runemark == "runemarks/black/fighters-agile.svg") {
        result = result + "One"
    }
    else if (runemark == "runemarks/black/fighters-ally.svg") {
        result = result + "Two"
    }
    else if (runemark == "runemarks/black/fighters-beast.svg") {
        result = result + "Three"
    }
    else if (runemark == "runemarks/black/fighters-berserker.svg") {
        result = result + "Four"
    }
    else if (runemark == "runemarks/black/fighters-brute.svg") {
        result = result + "Five"
    }
    else if (runemark == "runemarks/black/fighters-bulwark.svg") {
        result = result + "Six"
    }
    else if (runemark == "runemarks/black/fighters-champion.svg") {
        result = result + "Seven"
    }
    else if (runemark == "runemarks/black/fighters-destroyer.svg") {
        result = result + "Eight"
    }
    else if (runemark == "runemarks/black/fighters-elite.svg") {
        result = result + "Nine"
    }
    else if (runemark == "runemarks/black/fighters-ferocious.svg") {
        result = result + "Ten"
    }
    else if (runemark == "runemarks/black/fighters-fly.svg") {
        result = result + "Eleven"
    }
    else if (runemark == "runemarks/black/fighters-frenzied.svg") {
        result = result + "Twelve"
    }
    else if (runemark == "runemarks/black/fighters-gargantuan.svg") {
        result = result + "Thirteen"
    }
    // leader became hero so went back one messing up the order
    else if (runemark == "runemarks/black/fighters-leader.svg") {
        result = result + "Fifteen"
    }
    else if (runemark == "runemarks/black/fighters-icon-bearer.svg") {
        result = result + "Fourteen"
    }
    else if (runemark == "runemarks/black/fighters-minion.svg") {
        result = result + "Sixteen"
    }
    else if (runemark == "runemarks/black/fighters-mount.svg") {
        result = result + "Seventeen"
    }
    else if (runemark == "runemarks/black/fighters-mystic.svg") {
        result = result + "Eighteen"
    }
    else if (runemark == "runemarks/black/fighters-priest.svg") {
        result = result + "Ninteen"
    }
    else if (runemark == "runemarks/black/fighters-scout.svg") {
        result = result + "Twenty"
    }
    else if (runemark == "runemarks/black/fighters-sentience.svg") {
        result = result + "Twentyone"
    }
    else if (runemark == "runemarks/black/fighters-terrifying.svg") {
        result = result + "Twentytwo"
    }
    else if (runemark == "runemarks/black/fighters-thrall.svg") {
        result = result + "Twentythree"
    }
    else if (runemark == "runemarks/black/fighters-trapper.svg") {
        result = result + "Twentyfour"
    }
    else if (runemark == "runemarks/black/fighters-warrior.svg") {
        result = result + "Twentyfive"
    }

    return result;
}