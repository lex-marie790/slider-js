// check to see whether the input the user enters is a valid hex
// 1. #00000 or 000000
// 2. check the length - should be either 3 or 6 chars long
// get ref to hexInput & inputColor dom elements
// create keyup event handler for hexinput
// check if hex is valid
// if yes update background color of input color

const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const alteredColor = document.getElementById('alteredColor');
const alteredColoredText = document.getElementById('alteredColoredText');
const lightenText = document.getElementById('lightenText')
const darkenText = document.getElementById('darkenText')
const toggleBtn = document.getElementById('toggleBtn')
const inputColoredText = document.getElementById('inputColoredText')
const container = document.getElementsByClassName('container')

 // this toggles the button to lighten or darken
toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
    reset();
})

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');

    inputColor.style.backgroundColor = "#" + strippedHex;
    inputColoredText.innerText = `Input Color #${strippedHex}`
    reset();
})

// checks to make sure input is valid hex
const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#','');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

//Create a function to convert Hex to RGB
//this should work with 3 or 6 character hex values
//Hint - use ParseInt("",16) to convert a hex value to a decimal value
//should return an object with 3 properties - r,g, and b
//Test your function with a few different use cases

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');
    
    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
         + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }

    const r = parseInt(strippedHex.substring(0,2), 16)
    const g = parseInt(strippedHex.substring(2,4), 16)
    const b = parseInt(strippedHex.substring(4,6), 16)

    return {r,g,b}
}

const convertRGBToHex = (r,g,b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = '#' + firstPair + secondPair + thirdPair;
    return hex;
}

//get a reference to the slider and sliderText DOM elements
//create an input event listener for slider element
//display the value of the slider 
// const slider = document.getElementById('slider');
// const sliderText = document.getElementById('sliderText');

//Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value
const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex);

    const amount = Math.floor((percentage/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    return convertRGBToHex(newR,newG,newB);
}

const increaseWithin0To255 = (hex, amount) => {
    // const newHex = hex + amount;
    // if(newHex > 255) return 255;
    // if(newHex < 0) return 0;
    // return newHex
    return Math.min(255, Math.max(0, hex + amount))
}

slider.addEventListener('input',() => {
    if(!isValidHex(hexInput.value)) return;
    // check if hex is valid
    sliderText.textContent = `${slider.value}%`;

    // get the altered hex value
    const valueAddition = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;

    const alteredHex = alterColor(hexInput.value, valueAddition);
    // update the altered color
    alteredColor.style.backgroundColor = alteredHex;
    alteredColoredText.innerText = `Altered Colors ${alteredHex}`;
})

const reset = () => {
    slider.value = 0;
    sliderText.innerText=`0%`;
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColoredText.innerText = `Altered Color ${hexInput.value}`; 
}
