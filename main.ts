import ModRing from './ModRing.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get the input and SVG elements by their ids
  const expressionInput = document.getElementById('expression') as HTMLInputElement | null;
  const nInput = document.getElementById('n') as HTMLInputElement | null;
  const singlePath = document.getElementById('path') as HTMLInputElement | null;
  const startInput = document.getElementById('start') as HTMLInputElement | null;
  const drawArrows = document.getElementById('arrows') as HTMLInputElement | null;
  const svg = document.getElementById('svg') as SVGSVGElement | null;
  const downloadButton = document.getElementById('download') as HTMLButtonElement | null;
  const modRing = new ModRing();

  function getInfoAndDraw() {
    if (!svg) {
      return;
    }
    const expression = expressionInput?.value ?? 'n';
    const n = parseInt(nInput?.value ?? '10');
    const single = singlePath?.checked ?? false;
    const start = parseInt(startInput?.value ?? '1');
    const arrows = drawArrows?.checked ?? false;
    modRing.expression = expression;
    modRing.modulus = n;
    modRing.singlePath = single;
    modRing.start = start;
    modRing.drawArrows = arrows;
    modRing.drawIn(svg);
  }

  document.getElementById('form')?.addEventListener('change', getInfoAndDraw);
  downloadButton?.addEventListener('click', () => {
    if (svg) {
      downloadSvg(svg);
    }
  });

  getInfoAndDraw();
});

function downloadSvg(svg: SVGSVGElement) {
  const svgCopy = svg.cloneNode(true) as SVGSVGElement;
  svgCopy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const localStyleSheet = Array.from(document.styleSheets).find(sheet => sheet.href?.endsWith('/style.css'));
  if (localStyleSheet) {
    try {
      const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = Array.from(localStyleSheet.cssRules)
        .map(rule => rule.cssText)
        .join('\n');
      svgCopy.insertBefore(style, svgCopy.firstChild);
    } catch {
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

function error(message: string) {
  console.log('Error:', message);
}