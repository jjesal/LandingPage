
// AGREGA CLASE current AL HACER SCROLL 
let mainNavLinks = document.querySelectorAll("nav div ul li a");

window.addEventListener("scroll", event => {
    event.preventDefault();

    let fromTop = window.scrollY + 200;

    mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
});

function enviarMensaje() {
    alert('Mensaje enviado con éxito!');
    document.getElementById("miForm").reset();
}
function scroll_to(anchor_id) {
    var tag = $("#" + anchor_id + "");
    $('html, body').animate({ scrollTop: tag.offset().top }, 800);
}
