import ModRing from './ModRing.js';
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Get the input and canvas elements by their ids
    var expressionInput = document.getElementById('expression');
    var nInput = document.getElementById('n');
    var canvas = document.getElementById('canvas');
    var modRing = new ModRing();
    (_a = document.getElementById('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        var _a, _b;
        event.preventDefault();
        var expression = (_a = expressionInput === null || expressionInput === void 0 ? void 0 : expressionInput.value) !== null && _a !== void 0 ? _a : 'n';
        var n = parseInt((_b = nInput === null || nInput === void 0 ? void 0 : nInput.value) !== null && _b !== void 0 ? _b : '10');
        modRing.expression = expression;
        modRing.modulus = n;
        modRing.drawIn(canvas);
    });
});
function error(message) {
    console.log('Error:', message);
}
//# sourceMappingURL=main.js.map