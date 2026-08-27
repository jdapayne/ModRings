import ModRing from './ModRing.js';
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    // Get the input and SVG elements by their ids
    const expressionInput = document.getElementById('expression');
    const nInput = document.getElementById('n');
    const singlePath = document.getElementById('path');
    const startInput = document.getElementById('start');
    const drawArrows = document.getElementById('arrows');
    const svg = document.getElementById('svg');
    const downloadButton = document.getElementById('download');
    const modRing = new ModRing();
    function getInfoAndDraw() {
        var _a, _b, _c, _d, _e;
        if (!svg) {
            return;
        }
        const expression = (_a = expressionInput === null || expressionInput === void 0 ? void 0 : expressionInput.value) !== null && _a !== void 0 ? _a : 'n';
        const n = parseInt((_b = nInput === null || nInput === void 0 ? void 0 : nInput.value) !== null && _b !== void 0 ? _b : '10');
        const single = (_c = singlePath === null || singlePath === void 0 ? void 0 : singlePath.checked) !== null && _c !== void 0 ? _c : false;
        const start = parseInt((_d = startInput === null || startInput === void 0 ? void 0 : startInput.value) !== null && _d !== void 0 ? _d : '1');
        const arrows = (_e = drawArrows === null || drawArrows === void 0 ? void 0 : drawArrows.checked) !== null && _e !== void 0 ? _e : false;
        modRing.expression = expression;
        modRing.modulus = n;
        modRing.singlePath = single;
        modRing.start = start;
        modRing.drawArrows = arrows;
        modRing.drawIn(svg);
    }
    (_a = document.getElementById('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', getInfoAndDraw);
    downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener('click', () => {
        if (svg) {
            downloadSvg(svg);
        }
    });
    getInfoAndDraw();
});
function downloadSvg(svg) {
    const svgCopy = svg.cloneNode(true);
    svgCopy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const localStyleSheet = Array.from(document.styleSheets).find(sheet => { var _a; return (_a = sheet.href) === null || _a === void 0 ? void 0 : _a.endsWith('/style.css'); });
    if (localStyleSheet) {
        try {
            const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
            style.textContent = Array.from(localStyleSheet.cssRules)
                .map(rule => rule.cssText)
                .join('\n');
            svgCopy.insertBefore(style, svgCopy.firstChild);
        }
        catch (_a) {
            console.warn('Could not embed the stylesheet in the downloaded SVG');
        }
    }
    const svgText = new XMLSerializer().serializeToString(svgCopy);
    const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mod-ring.svg';
    link.click();
    URL.revokeObjectURL(url);
}
function error(message) {
    console.log('Error:', message);
}
//# sourceMappingURL=main.js.map