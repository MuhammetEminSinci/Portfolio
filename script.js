document.addEventListener('DOMContentLoaded', () => {
    // Gerekli elementleri seçiyoruz
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // 1. Mobil Menü Açma/Kapama İşlemi
    hamburger.addEventListener('click', () => {
        // Menüye 'active' sınıfını ekle veya çıkar
        navLinks.classList.toggle('active');
        
        // İkonu değiştir (Çarpı veya Hamburger)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Çarpı ikonu
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Hamburger ikonu
        }
    });

    // 2. Menüdeki bir linke tıklanınca menüyü otomatik kapat
    // (Mobilde linke tıkladıktan sonra menünün açık kalmaması için)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            
            // İkonu tekrar eski haline getir
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Header Scroll Efekti (Bonus)
    // Sayfa aşağı kaydırıldığında header'a gölge efekti ekler
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.2)";
        } else {
            // En tepedeyken gölgeyi hafiflet veya kaldır
            header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        }
    });
});