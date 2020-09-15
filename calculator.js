"use strict";

function factorial(n) {
    if(n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function nthDerivative(func, n, x) {
    // returns the nth derivative of a function at x

    function f(x) {
        return eval(func);
    }

    let h = 0.01;
    if(n == 0) {
        return f(x);
    } else if(n == 1) {
        return (f(x + h) - f(x)) / h;
    } else {
        return (nthDerivative(func, n - 1, x + h) - nthDerivative(func, n - 1, x)) / h;
    }
}

function maclaurin(func, n) {
    // returns the Macluarin Series of the first n terms for a function
    
    let terms = [];
    let series = "";

    // find each term and add it to terms
    for(let i = 0; i < n; i++) {
        let term = nthDerivative(func, i, 0) / factorial(i);
        if(i != 0) {
            if(i == 1) {
                term += "x";
            } else {
                term += "x^" + i;
            }
        }
        terms.push(term);
    }

    // format the terms into a series
    series += terms[0];
    for(let i = 1; i < terms.length; i++) {
        if(terms[i].charAt(0) == "-") {
            series += " - ";
            terms[i] = terms[i].substring(1);
        } else {
            series += " + ";
        }
        series += terms[i];
    }

    return series;
}

function taylor(func, c, n) {
    // returns the Taylor Series, centered at c, of the first n terms for a function

    let terms = [];
    let series = "";

    // find each term and add it to terms
    for(let i = 0; i < n; i++) {
        let term = nthDerivative(func, i, c) / factorial(i);
        if(i != 0) {
            if(i == 1) {
                term += "(x - " + c + ")";
            } else {
                term += "(x - " + c + ")^" + i;
            }
        }
        terms.push(term);
    }

    // format the terms into a series
    series += terms[0];
    for(let i = 1; i < terms.length; i++) {
        if(terms[i].charAt(0) == "-") {
            series += " - ";
            terms[i] = terms[i].substring(1);
        } else {
            series += " + ";
        }
        series += terms[i];
    }

    return series;
}

let func, n, c;

function onClick() {
    // this runs when the "Find Series" button is clicked

    func = funcInp.value;
    n = parseInt(numInp.value);
    seriesType = getSeriesType();

    // format the function
    func = func.replace("sin", "Math.sin");
    func = func.replace("cos", "Math.cos");
    func = func.replace("ln", "Math.log");
    func = func.replace("e", "Math.E");
    func = func.replace("pi", "Math.PI");

    if(seriesType == "maclaurin") {
        seriesTxt.innerHTML = maclaurin(func, n);
    } else {
        c = Math.ceil(Math.random() * 9);    
        seriesTxt.innerHTML = "Center: " + c + "<br><br>" + taylor(func, c, n);
    }
}