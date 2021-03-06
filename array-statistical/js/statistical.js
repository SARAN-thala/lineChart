let mappedValues;
let quartileValue;

let showingInput = function (div, data) {
    d3.select(div).html("");
    let divElement = d3.select(div).append('div');
    divElement.append('span')
        .classed('title', true)
        .text(data.title);
    divElement.append('span')
        .classed('value', true)
        .text(data.value);
};

let sortbyMethods = function (title, method) {
    if (!mappedValues || mappedValues == '') {
        alert("Please fill the quartile box");
    } else {
        return showingInput('.container', {title: `${title} of number : `, value: method(mappedValues)});
    }
};

let getQuantileValue = function (title, method) {
    if (!quartileValue) {
        alert("Please fill the quartile box");
    } else {
        return showingInput('.container', {
            title: `${title} of number : `,
            value: method(mappedValues, quartileValue)
        });
    }
};

let dataStore = function () {
    let storingValues = (document.getElementById('inputNumber').value).split(',');
    mappedValues = storingValues.filter(d => { return d;});
    if (mappedValues == '') {
        alert("Please fill the Input box");
        d3.select('.value').html("");
    } else {
        d3.select('.value').html("");
        showingInput('.value', {title: 'Entered values are : ', value: mappedValues})
    }
    document.getElementById('inputNumber').value = '';
};

let quartileStore = function () {
    quartileValue = (document.getElementById('quartileInput').value).split(',')[0];
    if (quartileValue == '') {
        alert("Please fill the quartile box");
        d3.select('.quantile').html("");
    } else {
        d3.select('.quantile').html("");
        showingInput('.quantile', {title: 'Entered quartile value is : ', value: quartileValue})
    }
    document.getElementById('quartileInput').value = '';
};

function validate(evt) {
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /[(0-9),]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}