async function getshoping() {
  try {
    const url = "https://dummyjson.com/products";
    const options = {
      method: "GET",
    };

    const respons = await fetch(url, options);

    if (!respons.ok) {
      throw new Error("خطا در واکشی");
    }
    const data = await respons.json();
    const cartprice = document.querySelectorAll("#priceProducts");
    const carttitle = document.querySelectorAll("#titleProducts");
    const batnadid = document.querySelectorAll(".btnadd");
    const listprodacts = document.getElementById("list_product");
    const a = 1;
    console.log(listprodacts, "تعداد تگ ال ای");
    const cartproducts = [];
    //حلقه زدن رو قیممت محصولات
    for (let i = 0; i < cartprice.length && carttitle.length; i++) {
      cartprice[i].textContent = `${data.products[i].price} $`;
      carttitle[i].textContent = `${data.products[i].title}`;
    }
    let priceproduct = 0;

    batnadid.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const newid = e.target.dataset.id;
        //پیدا کردن ایدی محصول در ارایه محصولات
        data.products.findIndex((idbtn) => {
          //برابری ایدی محصول در ارایه با ایدی کارت محصول انتخابی
          if (idbtn.id == newid) {
            const idprod = cartproducts.find((item) => {
              return item.id === newid;
            });
            if (idprod) {
              idprod.cont++;
              idprod.li.textContent = `
              X${idprod.cont}
              نام محصول${idprod.name}
              قیمت ${idprod.price}

              `;
            } else {
              const newarye = {
                id: newid,
                name: idbtn.title,
                price: idbtn.price,
                cont: 1,
              };
              const newli = document.createElement("li");
             newli.classList.add('stylli')
              newli.textContent = ` 
            
              X${newarye.cont}
              نام محصول${newarye.name}
              قیمت ${newarye.price}

              `;
              newarye.li = newli;

              cartproducts.push(newarye);
              listprodacts.appendChild(newli);
            }
            const pricfain = idbtn.price;
            console.log(pricfain, "price");
            const a=[];
           cartproducts.filter((item)=>{
          a.push(item.cont)  
            })
           
           const sum=a.reduce((total,number)=>total+number,0)
            priceproduct += Number(pricfain.toPrecision(4));

            document.getElementById("totalprice").textContent =
              `$${priceproduct.toPrecision(4)}`;

            document.getElementById("totallenght").textContent =
              `${sum}`;
          }
        });
      });
    });

    console.log(cartproducts, "کل محصولات");
  } catch {
    console.log("خطا در دریافت اطلاعات");
  }
}
getshoping();
