import ModRing from './ModRing.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get the input and canvas elements by their ids
  const expressionInput = document.getElementById('expression') as HTMLInputElement | null;
  const nInput = document.getElementById('n') as HTMLInputElement | null;
  const singlePath = document.getElementById('path') as HTMLInputElement | null;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const modRing = new ModRing();

  function getInfoAndDraw() {
    const expression = expressionInput?.value ?? 'n';
    const n = parseInt(nInput?.value ?? '10');
    const single = singlePath?.checked ?? false;
    modRing.expression = expression;
    modRing.modulus = n;
    modRing.singlePath = single;
    modRing.drawIn(canvas);
  }

  document.getElementById('form')?.addEventListener('change', getInfoAndDraw);

  getInfoAndDraw();
});

function error(message: string) {
  console.log('Error:', message);
}