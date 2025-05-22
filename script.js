document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    let menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
            this.reset();
        });
    }

    // Smooth Scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.benefit-card, .featured-card, .style-category, .size-content, .insta-post'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Adiciona classe para animação quando elementos entram na viewport
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // WhatsApp dinâmico
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos do Bazar Rainha da Paz.');
        whatsappButton.href = `https://wa.me/SEUNUMERO?text=${message}`;
    }

    // Elementos de filtro
    const searchInput = document.getElementById('search-input');
    const styleFilter = document.getElementById('style-filter');
    const categoryFilter = document.getElementById('category-filter');
    const conditionFilter = document.getElementById('condition-filter');
    const sizeFilter = document.getElementById('size-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const productsGrid = document.querySelector('.products-grid');

    // Função para filtrar produtos
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedStyle = styleFilter.value;
        const selectedCategory = categoryFilter.value;
        const selectedCondition = conditionFilter.value;
        const selectedSize = sizeFilter.value;

        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;

        products.forEach(product => {
            const title = product.querySelector('h4').textContent.toLowerCase();
            const description = product.querySelector('.description').textContent.toLowerCase();
            const style = product.querySelector('.category-tag').textContent.toLowerCase();
            const category = product.dataset.category || '';
            const condition = product.dataset.condition || '';
            const size = product.dataset.size || '';

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesStyle = selectedStyle === 'todos' || style.includes(selectedStyle.toLowerCase());
            const matchesCategory = selectedCategory === 'todos' || category === selectedCategory;
            const matchesCondition = selectedCondition === 'todos' || condition === selectedCondition;
            const matchesSize = selectedSize === 'todos' || size === selectedSize;

            if (matchesSearch && matchesStyle && matchesCategory && matchesCondition && matchesSize) {
                product.style.display = '';
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
                visibleCount++;
            } else {
                product.style.display = 'none';
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
            }
        });

        // Remove mensagem anterior se existir
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Adiciona mensagem apenas se não houver produtos visíveis
        if (visibleCount === 0) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.textContent = 'Nenhum produto encontrado com os filtros selecionados.';
            productsGrid.appendChild(message);
        }
    }

    // Event listeners para os filtros
    searchInput.addEventListener('input', filterProducts);
    styleFilter.addEventListener('change', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    conditionFilter.addEventListener('change', filterProducts);
    sizeFilter.addEventListener('change', filterProducts);

    // Limpar filtros
    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        styleFilter.value = 'todos';
        categoryFilter.value = 'todos';
        conditionFilter.value = 'todos';
        sizeFilter.value = 'todos';
        filterProducts();
    });

    // Adiciona transição suave aos produtos
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.transition = 'all 0.3s ease-in-out';
    });

    // Aplica filtro automático baseado na URL
    function applyUrlFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        const styleParam = urlParams.get('style');
        
        if (styleParam && document.getElementById('style-filter')) {
            document.getElementById('style-filter').value = styleParam;
            filterProducts();
        }
    }

    // Chama a função quando a página carrega
    applyUrlFilter();
}); 