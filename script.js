function formatPage(r,g,b){
    var hexcode = "#" + hex(r) + hex(g) + hex(b);
    document.body.style.backgroundColor = hexcode;
    document.getElementById("hex").value = hexcode;
    document.getElementById("r-label").innerText = r;
    document.getElementById("g-label").innerText = g;
    document.getElementById("b-label").innerText = b;
    var hslcode = rgbToHSl(r,g,b);
    document.getElementById('hsl').value = "("+hslcode[0]+","+hslcode[1]+"%,"+hslcode[2]+"%)";

    if (r < 100 && g < 100 && b < 100)
        document.querySelector(':root').style.setProperty('--text-color', 'white');
    else 
        document.querySelector(':root').style.setProperty('--text-color', '#181818');
}

function RGBtoHEXnHSL(){
    var r = parseInt(document.getElementById("r").value);
    var g = parseInt(document.getElementById("g").value);
    var b = parseInt(document.getElementById("b").value);

    formatPage(r,g,b);
}

function hex(x){
    var hex = x.toString(16);
    if (x < 16) {
        hex = "0" + hex;
    }
    return hex;
}

function HEXtoRGBnHSL(){
    var input = document.getElementById('hex').value;
    var rgbcode = rgbFromHex(input);
    document.getElementById('r').value = rgbcode.r;
    document.getElementById('g').value = rgbcode.g;
    document.getElementById('b').value = rgbcode.b;

    formatPage(rgbcode.r,rgbcode.g,rgbcode.b);
}

function rgbFromHex(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function HSLtoRGBnHEX(){
    var input = document.getElementById('hsl').value;
    var hslcode = getHSL(input);
    var rgbcode = hslToRgb(hslcode.h,hslcode.s,hslcode.l);
    
    formatPage(rgbcode[0],rgbcode[1],rgbcode[2]);
}

function getHSL(hsl){
    var result = /(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*)/.exec(hsl);
    return result ? {
        h: parseInt(result[2]),
        s: parseInt(result[3]),
        l: parseInt(result[4])
    } : null;
}

function hslToRgb(h, s, l){
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c/2,
    r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;  
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r,g,b];
}

function rgbToHSl(r,g,b){
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0, s = 0, l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    
    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);

    return [h,s,l];
}