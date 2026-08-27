export default class ModRing {
    constructor(width = 500, height = 500, modulus = 10) {
        this.width = 500;
        this.height = 500;
        this.expression = 'n';
        this.modulus = 10;
        this.singlePath = false;
        this.start = 1;
        this.drawArrows = false;
        this.width = width;
        this.height = height;
    }
    /**
     *  Valideate whether the expression is valid
     *
     * Expression is valide if it contains only numbers, n, +, -, *, /, and ^
     */
    validateExpression() {
        const regex = /^[0-9n+\-*/^()]+$/;
        return regex.test(this.expression);
    }
    /**
     * Evalueate the expression at the value n.
     * @param n
     */
    evaluateExpression(n) {
        this.validateExpression();
        const expression = this.expression.replace(/(\d+)n/, "$1*n")
            .replace("^", "**");
        console.log(`Evaluting ${expression} at n=${n}`);
        const evaluation = eval(expression); //urgh
        if (typeof evaluation === 'number') {
            return evaluation;
        }
        else {
            throw new Error('Invalid expression');
        }
    }
    /**
     * Draws the circle with labels in the SVG.
     */
    drawCircle(svg, center, radius) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', center[0].toString());
        circle.setAttribute('cy', center[1].toString());
        circle.setAttribute('r', radius.toString());
        circle.setAttribute('class', 'mod-ring-circle');
        svg.appendChild(circle);
        const fontSize = this.modulus > 30 ? 35 : 45;
        const offset = this.modulus > 30 ? 30 : 35;
        // Draw points and labels
        for (let i = 0; i < this.modulus; i++) {
            const angle = this.getAngle(i);
            const x = radius * Math.cos(angle);
            const y = -radius * Math.sin(angle);
            const x2 = (radius + offset) * Math.cos(angle);
            const y2 = -(radius + offset) * Math.sin(angle);
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', (center[0] + x).toString());
            dot.setAttribute('cy', (center[1] + y).toString());
            dot.setAttribute('r', '6');
            svg.appendChild(dot);
            if (this.modulus < 70) {
                const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                label.setAttribute('x', (center[0] + x2).toString());
                label.setAttribute('y', (center[1] + y2).toString());
                label.setAttribute('class', 'mod-ring-label');
                label.setAttribute('font-size', `${fontSize}px`);
                label.setAttribute('text-anchor', 'middle');
                label.setAttribute('dominant-baseline', 'middle');
                label.textContent = i.toString();
                svg.appendChild(label);
            }
        }
    }
    drawIn(svg) {
        const width = this.width * 2;
        const height = this.height * 2;
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('width', this.width.toString());
        svg.setAttribute('height', this.height.toString());
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }
        const center = [width / 2, height / 2];
        const radius = width * 0.43;
        this.drawCircle(svg, center, radius);
        if (this.singlePath) {
            this.drawPathIn(svg, center, radius);
        }
        else {
            this.drawAllIn(svg, center, radius);
        }
    }
    getAngle(i) {
        return Math.PI / 2 - 2 * Math.PI * i / this.modulus;
    }
    drawAllIn(svg, center, radius) {
        for (let i = 0; i < this.modulus; i++) {
            const angle = this.getAngle(i);
            const x = radius * Math.cos(angle);
            const y = -radius * Math.sin(angle);
            const j = this.evaluateExpression(i);
            const anglej = this.getAngle(j);
            const xj = radius * Math.cos(anglej);
            const yj = -radius * Math.sin(anglej);
            drawLine(svg, center[0] + x, center[1] + y, center[0] + xj, center[1] + yj, this.drawArrows);
        }
    }
    drawPathIn(svg, center, radius) {
        const start = this.start;
        let path = [];
        let current = start;
        while (true) {
            path.push(current);
            const next = this.evaluateExpression(current) % this.modulus;
            if (path.includes(next)) {
                break;
            }
            current = next;
        }
        console.log(path);
        path.forEach(i => {
            const angle = this.getAngle(i);
            const x = radius * Math.cos(angle);
            const y = -radius * Math.sin(angle);
            const j = this.evaluateExpression(i);
            const anglej = this.getAngle(j);
            const xj = radius * Math.cos(anglej);
            const yj = -radius * Math.sin(anglej);
            drawLine(svg, center[0] + x, center[1] + y, center[0] + xj, center[1] + yj, this.drawArrows);
        });
    }
}
function drawLine(svg, x1, y1, x2, y2, arrow = false, size = 20, offset = 30) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.setAttribute('class', 'mod-ring-line');
    line.setAttribute('stroke-width', '4');
    svg.appendChild(line);
    if (arrow) {
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length === 0) {
            return;
        }
        const unitX = (x2 - x1) / length;
        const unitY = (y2 - y1) / length;
        const normalX = -unitY;
        const normalY = unitX;
        const tipX = x2 - unitX * offset;
        const tipY = y2 - unitY * offset;
        const baseX = x2 - unitX * (size + offset);
        const baseY = y2 - unitY * (size + offset);
        const arrowhead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrowhead.setAttribute('points', [
            `${baseX + normalX * size / 2},${baseY + normalY * size / 2}`,
            `${tipX},${tipY}`,
            `${baseX - normalX * size / 2},${baseY - normalY * size / 2}`
        ].join(' '));
        arrowhead.setAttribute('class', 'mod-ring-arrowhead');
        arrowhead.setAttribute('stroke-width', '4');
        svg.appendChild(arrowhead);
    }
}
//# sourceMappingURL=ModRing.js.map