// const verticalInfoSections = Array.prototype.slice.call( document.querySelectorAll(".vertical-info-section") );

// document.addEventListener("DOMContentLoaded", function() {
    
//   verticalInfoSections.forEach((section, i, all) => {

//     const verticalMarker = section.querySelector(".vertical-marker");

//     const scrollSpine = section.querySelector(".scroll-spine");

//     const vrItems = Array.prototype.slice.call( section.querySelectorAll(".vr-item") );

//     const lastRowHeight = vrItems[vrItems.length - 1].offsetHeight;

//     scrollSpine.style.height = scrollSpine.offsetHeight - lastRowHeight + "px";

//     vrItems.forEach((row, i, all) => {
  
//       let waypont = new Waypoint({
//           element: row,
//           handler: function(direction) {
    
//             all.forEach((item, i, all) => {
//               item.classList.remove("active");
//             });
        
//             if(i === 0 ) {
//               // First Item
//               verticalMarker.style.top = 0 + "px";
//             } else if(i === all.length - 1) {
//               // Last item
//               verticalMarker.style.top = scrollSpine.offsetHeight - verticalMarker.offsetHeight + "px";
//             } else {
//               // console.log(row.offsetTop);
//               verticalMarker.style.top = row.offsetTop - verticalMarker.offsetHeight / 2 + 5 + "px";
//             }
//           },
//           offset: function(e) {
//             return Waypoint.viewportHeight() / 2 - verticalMarker.offsetHeight;
//           }
//       });
//     });
//   });
  
// });