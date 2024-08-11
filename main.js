const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "من فضلك انتظر...";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;

                // عرض رسالة النجاح باستخدام SweetAlert
                Swal.fire({
                    title: "تم الإرسال بنجاح!",
                    text: 'تم إرسال البريد الإلكتروني بنجاح!',
                    icon: "success",
                    confirmButtonText: "موافق"
                });
            } else {
                console.log(response);
                result.innerHTML = json.message;

                // عرض رسالة الفشل باستخدام SweetAlert
                Swal.fire({
                    title: "فشل في الإرسال!",
                    text: json.message,
                    icon: "error",
                    confirmButtonText: "موافق"
                });
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "حدث خطأ ما!";

            // عرض رسالة الخطأ باستخدام SweetAlert
            Swal.fire({
                title: "حدث خطأ!",
                text: "يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "موافق"
            });
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});


function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    
    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });
    
}

navSlide();




