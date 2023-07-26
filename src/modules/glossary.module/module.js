const glossaryItems = Array.prototype.slice.call( document.querySelectorAll(".glossary-item") );

// console.log({glossaryItems});

glossaryItems.forEach((item, i, all) => {
  item.addEventListener("click", function() {
    // console.log("click");
    // console.log({i});
    all.forEach( (item) => {
      item.classList.remove("active");
    // slideUp(item.querySelector(".vmc-row-description"), 250);
    });

    glossaryItems[i].classList.add("active");
    // const activeText = row.querySelector(".vmc-row-description");

    // console.log({activeText});
    // slideDown(activeText, 250);
  });
});