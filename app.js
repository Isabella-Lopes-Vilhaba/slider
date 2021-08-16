const previousEl = document.getElementById('previous');
const nextEl = document.getElementById('next');
const sliderEl = document.getElementById('slider');
let interval = undefined;
let timeout = undefined;
let selectedImgIndex = 0;

//Para passar ao apertar os botões
previousEl.addEventListener('click', onPreviousClick);
nextEl.addEventListener('click', onNextClick);

autoScroll();

function onPreviousClick() {
  const sliderWidth = sliderEl.offsetWidth;
  sliderEl.scrollLeft -= sliderWidth;
  --selectedImgIndex;
  handleActiveDot();
  handleSliderClick();
}

function onNextClick() {
  const sliderWidth = sliderEl.offsetWidth;
  sliderEl.scrollLeft += sliderWidth;
  ++selectedImgIndex;
  handleActiveDot();
  handleSliderClick();
}

//Cancelar scroll automático por tantos segundos se o usuário clicar
function handleSliderClick() {
  clearTimeout(timeout);
  clearInterval(interval);
  interval = undefined;
  timeout = setTimeout( () => {
    autoScroll();
  }, 30000);
}

//Para as bolinhas que indicam qual imagem está
function handleActiveDot() {
  const list = Array.from(document.getElementsByClassName('dot'));

  if(selectedImgIndex < 0) selectedImgIndex = 0;
  if(selectedImgIndex > list.length) selectedImgIndex = list.length - 1;
  
  list.forEach(el => el.classList.remove('active'));
  list[selectedImgIndex].classList.add('active');
}

//Para passar automaticamente
function autoScroll() {
  if(interval) return;

  interval = setInterval( () => {
//Calcula quanto cada imagem tem de largura
  const sliderWidth = sliderEl.offsetWidth;
//Calcula quantos elementos filhos o sliderEl tem
  const numberOfImages = sliderEl.childElementCount;
//Para calcular em qual imagem está
  const selectedImage = (sliderEl.scrollLeft/sliderWidth) + 1;

//    Se for a última => volta para o 0
  if(numberOfImages === selectedImage) {
    sliderEl.scrollLeft = 0;
    selectedImgIndex = 0;
    handleActiveDot();
    return;
   }
//    Se não
  sliderEl.scrollLeft += sliderWidth;
  ++selectedImgIndex;
  handleActiveDot();
 }, 5000);
}