const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName('jsColor');

const range = document.getElementById('jsRange');

const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c'; 
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR; 
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMounseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x,y);
  } else {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  startPainting()
}

function onMouseUp(event) {
  stopPainting();
}

function onMouseLeave() {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick() {
  if(filling) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  console.log(event);
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;  // download a url
  link.download = 'PaintJS[EXPORT]🖼'; // file name
  link.click();
}

if(canvas) {
  canvas.addEventListener('mousemove', onMounseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mouseleave', onMouseLeave);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);  // mouse rigth click
}

if(colors) {
  Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
}

if(range) {
  range.addEventListener('input', handleRangeChange);
}

if(mode) {
  mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}