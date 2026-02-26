const grid = document.getElementById("grid");
const library = document.getElementById("library");

let skins = [];
let selected = [];
const ITEM = 104;
const COLS = 3;

fetch("skins.json")
  .then(r=>r.json())
  .then(data=>{
    skins = data;
    renderVisible();
  });

library.addEventListener("scroll", renderVisible);

function renderVisible(){
  const scrollTop = library.scrollTop;
  const startRow = Math.floor(scrollTop / ITEM);
  const endRow = startRow + 20;

  grid.innerHTML = "";

  for(let r=startRow;r<endRow;r++){
    for(let c=0;c<COLS;c++){
      const i = r*COLS+c;
      if(!skins[i]) continue;

      const div = document.createElement("div");
      div.className="item";
      div.style.top = r*ITEM+"px";
      div.style.left = c*ITEM+"px";

      const img = document.createElement("img");
      img.src = skins[i].thumb;

      div.onclick = ()=>addSkin(skins[i]);
      div.appendChild(img);
      grid.appendChild(div);
    }
  }
}
