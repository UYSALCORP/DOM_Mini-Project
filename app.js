//! CHECKOUT PAGE

//? 1- Ürünlerin Ekranda Görüntülenmesi:

// Ürünlerim
let sepettekiler = [
  {
    name: "Vintage Backpack",
    price: 34.99,
    piece: 1,
    img: "./images/photo1.png",
  },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./images/photo2.png" },
  { name: "Antique Clock", price: 69.99, piece: 1, img: "./images/photo3.jpg" },
];

const tax = 0.18

// DOM ile Dinamikleştirme
sepettekiler.forEach((urun) => {
  // 1.YOL -> urun.name, urun.image gibi bir yapı kullanımı
  // 2-YOL -> urun.name kullanmak yerine doğrudan name, img kullanmak
  // Destructure
  const { img, name, price, piece } = urun;
  // 3-YOL -> forEach bölümündeki parantez içinde destructure
  document.querySelector("#product-rowlari").innerHTML += `
           <div class="row ">
            <div class="col-md-5">
              <img
                src="${urun.img}"
                class="w-100 rounded-start"
                alt="..."
              />
            </div>

            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">${urun.name}</h5>

                <div class="ürün-price">
                  <p class="text-warning h2">$<span class="indirim-price">${
                    urun.price
                  } </span>
                    <span class="h5 text-dark text-decoration-line-through">${(
                      urun.price * 0.7
                    ).toFixed(2)}</span>
                  </p>
                </div>

                <div
                  class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2">
                  <div class="adet-controller">
                    <button class="btn btn-secondary btn-sm minus">
                      <i class="fas fa-minus"></i>
                    </button>
                    <p class="d-inline mx-4" id="ürün-adet">${urun.piece}</p>
                    <button class="btn btn-secondary btn-sm plus">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="ürün-removal mt-4">
                  <button class="btn btn-danger btn-sm w-100 remove-product">
                    <i class="fa-solid fa-trash-can me-2"></i>Remove
                  </button>
                </div>

                <div class="mt-2">
                <p>Ürün Toplam:<span class="product-total">${
                  (price * 0.7 * piece).toFixed(2)
                }</span></p>
                  
                </div>
              </div>
            </div>
          </div> 
    `;
});

calculateCardTotal()
//? 2- Toplam Değerleri Tablosunun Doldurulması :
function calculateCardTotal() {
    const icerik = document.querySelectorAll(".product-total")
    const toplamArray = Array.from(icerik).reduce((genelToplam,item)=> genelToplam+Number(item.textContent), 0)
    // console.log(toplamArray);
    document.querySelector(".productstoplam").textContent=toplamArray
    document.querySelector(".vergi").textContent = (toplamArray*tax).toFixed(2)
    shipping = toplamArray>150 ? 0 : 15;
    document.querySelector(".kargo").textContent = shipping
    document.querySelector(".toplam").textContent = (toplamArray + toplamArray*tax + shipping).toFixed(2)
}

removeButton()
//? 3- Silme İşlemi | Remove
function removeButton() {
    document.querySelectorAll(".remove-product").forEach((btn)=>{
        btn.onclick=()=>{
            // btn.parentElement.parentElement.parentElement.remove()
            btn.closest(".row").remove()
            calculateCardTotal()
        }
    })
}

increaseDecrease()
//? 4- Ürün Ekleme/Çıkarma
function increaseDecrease(){
    document.querySelectorAll(".adet-controller").forEach((ekleCikar)=>{
        const plus = ekleCikar.lastElementChild;
        const minus = ekleCikar.firstElementChild
        // const adet = plus.previousSibling
        const adet = ekleCikar.children[1]

        plus.onclick=()=> {
            adet.textContent = Number(adet.textContent)+1
            plus.closest(".card-body").querySelector(".product-total").textContent = (plus.closest(".card-body").querySelector(".indirim-price").textContent * adet.textContent).toFixed(2)
            calculateCardTotal()
        }

        minus.onclick=()=>{
            adet.textContent = Number(adet.textContent)-1
            if (adet.textContent<1){
                alert("Ürünü Almak İstemediğinize Emin Misiniz?")
                minus.closest(".row").remove()
            } else {
                minus.closest(".card-body").querySelector(".product-total").textContent = (minus.closest(".card-body").querySelector(".indirim-price").textContent * adet.textContent).toFixed(2)
            calculateCardTotal()
            }
        }
    })
}

//! BUBLING
// let flag = false;
// let h1 = document.querySelector("h1")
// h1.onclick=()=>{
//     flag = !flag;
//     flag ? h1.textContent= "CheckOut Project" : h1.textContent = "Almayan Bin Pişman"
// }

// let header = document.querySelector("header")
// header.onclick=()=>{
//     flag = !flag;
//     flag ? h1.textContent= "Yunus Emre UYSAL" : h1.textContent = "Ömer Faruk UYSAL"
// }