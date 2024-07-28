export default class ModRing {
  width: number = 500;
  height: number = 500;
  expression: string = 'n';
  modulus: number = 10; 

  constructor(width = 500, height = 500, modulus = 10) {
    this.width = width;
    this.height = height;
  }
  
  /**
   *  Valideate whether the expression is valid
   * 
   * Expression is valide if it contains only numbers, n, +, -, *, /, and ^
   */
  validateExpression() {
    const regex = /^[0-9n+\-*/^]+$/;
    return regex.test(this.expression);
  }
  
  /**
   * Evalueate the expression at the value n.
   * @param n 
   */
  evaluateExpression(n: number) {
    this.validateExpression();
    const expression = this.expression.replace(/(\d*)n/,"$1*n");
    const evaluation =  eval(expression); //urgh
    if (typeof evaluation === 'number') {
      return evaluation;
    } else {
      throw new Error('Invalid expression');
    }
  }
  
  /**
   * Gets coordinates of ith point on the ring
   * @param i th point to get coordinates for
   */
  point(i: number) {
    const step = 2 * Math.PI / this.modulus;
    const angle = i * step;
  }
  
  drawIn(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas not supported');
    }
    const width = canvas.width = this.width;
    const height = canvas.height = this.height;
    const center = [width / 2, height / 2];
    const radius = width *0.45;
    
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
