var ModRing = /** @class */ (function () {
    function ModRing(width, height, modulus) {
        if (width === void 0) { width = 500; }
        if (height === void 0) { height = 500; }
        if (modulus === void 0) { modulus = 10; }
        this.width = 500;
        this.height = 500;
        this.expression = 'n';
        this.modulus = 10;
        this.width = width;
        this.height = height;
    }
    /**
     *  Valideate whether the expression is valid
     *
     * Expression is valide if it contains only numbers, n, +, -, *, /, and ^
     */
    ModRing.prototype.validateExpression = function () {
        var regex = /^[0-9n+\-*/^]+$/;
        return regex.test(this.expression);
    };
    /**
     * Evalueate the expression at the value n.
     * @param n
     */
    ModRing.prototype.evaluateExpression = function (n) {
        this.validateExpression();
        var expression = this.expression.replace(/(\d*)n/, "$1*n");
        var evaluation = eval(expression); //urgh
        if (typeof evaluation === 'number') {
            return evaluation;
        }
        else {
            throw new Error('Invalid expression');
        }
    };
    /**
     * Gets coordinates of ith point on the ring
     * @param i th point to get coordinates for
     */
    ModRing.prototype.point = function (i) {
        var step = 2 * Math.PI / this.modulus;
        var angle = i * step;
    };
    ModRing.prototype.drawIn = function (canvas) {
        console.log('Drawing in canvas');
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas not supported');
        }
        var width = canvas.width = this.width;
        var height = canvas.height = this.height;
        var center = [width / 2, height / 2];
        var radius = width * 0.45;
        console.log("ctx.arc(" + center[0] + ", " + center[1] + ", " + radius + ", 0, 2 * Math.PI);");
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
        ctx.stroke();
    };
    return ModRing;
}());
export default ModRing;
//# sourceMappingURL=ModRing.js.map