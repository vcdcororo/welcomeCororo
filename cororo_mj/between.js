<script>
    $( function() {
      $( ".mover" ).draggable();
      // $( "id #, class ." ).draggable();

      $( ".drop" ).droppable({
        hoverClass: "blackcircle",
        drop: function( event, ui ) {
          $( this ).addClass( "blackcircle" );
        }
      });
      
    } );

    $(document).on("click", ".blackcircle", function() {
setTimeout(function() {
  window.location.href = "main.html";
}, 1000);
});




  </script>

const targetNode = document.getElementById('myDiv');
const observer = new MutationObserver((mutations) => {
mutations.forEach((mutation) => {
  const addedNodes = mutation.addedNodes;
  if (addedNodes.length > 0) {
    const container = document.querySelector("#section-01");
    const circle = document.querySelector(".blackcircle");
    
    circle.addEventListener("mouseenter", function() {
    let newDiv = document.createElement("div");
    newDiv.classList.add("circle");
    newDiv.addEventListener("click", function() {
      window.location.href = "main.html";
    });
    container.appendChild(newDiv);
  });
  }
});
});


const config = { attributes: false, childList: true, subtree: false };

observer.observe(targetNode, config);
</script>