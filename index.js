// Sample Initial Data with Categories
let menuItems = [
    { name: "Truffle Tagliatelle", price: 18.50, vegan: false, gf: false, category: "Mains" },
    { name: "Seared Salmon Bowl", price: 21.00, vegan: false, gf: true, category: "Mains" },
    { name: "Garden Risotto", price: 16.50, vegan: true, gf: true, category: "Mains" },
    { name: "Bruschetta Trio", price: 12.00, vegan: true, gf: false, category: "Starters" },
    { name: "Lemon Sorbet", price: 7.50, vegan: true, gf: true, category: "Desserts" }
];

// DOM Elements
const menuContainer = document.getElementById('live-menu');
const addItemBtn = document.getElementById('add-item-btn');
const countItems = document.getElementById('count-items');

// Render Function
function renderMenu(filter = 'all') {
    if (!menuContainer) return;
    menuContainer.innerHTML = '';
    
    const filteredItems = menuItems.filter(item => {
        if (filter === 'vegan') return item.vegan;
        if (filter === 'gf') return item.gf;
        return true;
    });

    const categories = ["Starters", "Mains", "Desserts"];
    
    categories.forEach(cat => {
        const catItems = filteredItems.filter(i => i.category === cat);
        if (catItems.length > 0) {
            const header = document.createElement('h4');
            header.className = 'menu-category-header';
            header.innerText = cat;
            menuContainer.appendChild(header);

            catItems.forEach(item => {
                const div = document.createElement('div');
                div.className = 'menu-item';
                
                let tags = '';
                if (item.vegan) tags += '<span class="tag-vegan label-tech">[V] Vegan</span>';
                if (item.gf) tags += '<span class="tag-gf label-tech">[GF] Gluten-Free</span>';

                div.innerHTML = `
                    <div class="menu-item-info">
                        <span>${item.name}</span>${tags}
                    </div>
                    <div class="menu-item-price">€${item.price.toFixed(2)}</div>
                `;
                menuContainer.appendChild(div);
            });
        }
    });

    if(countItems) countItems.textContent = menuItems.length;
}

// Master Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Render
    renderMenu();

    // 2. Custom Cursor Logic
    const glow = document.querySelector('.cursor-glow');
    const dot = document.querySelector('.cursor-dot');
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    if (glow && dot) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        const animateCursor = () => {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // 3. Hover Effects for Cursor & Clinical Pulse
        const hoverTargets = 'a, button, .service-card, .pillar-card, .pricing-card, .step-card, .photo-card, .upload-box, input, .menu-item, .audit-card';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => {
                glow.style.width = '150px';
                glow.style.height = '150px';
                glow.style.background = 'radial-gradient(circle, rgba(0, 242, 255, 0.6) 0%, transparent 70%)';
                dot.style.transform = 'translate(-50%, -50%) scale(2.5)';
                
                // Clinical Pulse for Audit Cards
                if (el.classList.contains('audit-card')) {
                    el.classList.add('scanned-pulse');
                    setTimeout(() => el.classList.remove('scanned-pulse'), 500);
                }
            });
            el.addEventListener('mouseleave', () => {
                glow.style.width = '300px';
                glow.style.height = '300px';
                glow.style.background = 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)';
                dot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Scroll-Triggered Soundscapes (Simulated)
    let lastScrollPos = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScrollPos) > 100) {
            // Simulated subsonic hum shift
            glow.style.opacity = '0.8';
            setTimeout(() => glow.style.opacity = '1', 200);
            lastScrollPos = currentScroll;
        }
    });

    // 4. Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. Add Item Logic
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('add-name');
            const priceInput = document.getElementById('add-price');
            const categoryInput = document.getElementById('add-category');
            const veganInput = document.getElementById('add-vegan');
            const gfInput = document.getElementById('add-gf');

            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value);
            const category = categoryInput.value;

            if (name === '' || isNaN(price)) return;

            menuItems.push({ name, price, category, vegan: veganInput.checked, gf: gfInput.checked });
            renderMenu();

            nameInput.value = '';
            priceInput.value = '';
            veganInput.checked = false;
            gfInput.checked = false;

            addItemBtn.innerText = 'Added! ✅';
            setTimeout(() => addItemBtn.innerText = 'Update Menu Live', 1500);
        });
    }

    // 6. Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderMenu(e.target.dataset.filter);
        });
    });

    // 7. Dynamic Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 8. AI Scanner Mock
    const scanBtn = document.getElementById('scan-btn');
    const scanResults = document.getElementById('scan-results');
    const dropZone = document.getElementById('drop-zone');

    function triggerScan() {
        if (!scanBtn || !scanResults) return;

        // Visual "Scanning" HUD Overlay
        const overlay = document.createElement('div');
        overlay.className = 'scanning-overlay';
        document.querySelector('.scanner-container').appendChild(overlay);

        scanBtn.textContent = 'Analysing Assets...';
        scanBtn.disabled = true;

        setTimeout(() => {
            overlay.remove();
            scanResults.innerHTML = `
                <div class="result-item success scanned-pulse">
                    <h4>LMIV Audit: Passed</h4>
                    <p>All 14 mandatory allergens correctly labeled.</p>
                    <span class="confidence">99.2% Accuracy</span>
                </div>
                <div class="result-item scanned-pulse">
                    <h4>Nutritional Check</h4>
                    <p>Kcal calculation verified (450kcal avg).</p>
                    <span class="confidence">87.5% Confidence</span>
                </div>
            `;
            scanBtn.textContent = 'Scan Complete';
            scanBtn.disabled = false;
        }, 3000);
    }

    if (scanBtn) {
        scanBtn.addEventListener('click', triggerScan);
    }

    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--accent-pulse)';
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = '';
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '';
            triggerScan();
        });
    }


    // 9. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved preference
    const savedTheme = localStorage.getItem('culinaut-theme');
    if (savedTheme === 'light') body.classList.add('light-mode');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('culinaut-theme', currentTheme);
        });
    }

    // 10. Technique Deep Dive Data & Modal
    const techCards = document.querySelectorAll('.tech-card');
    const modal = document.getElementById('tech-modal');
    const modalContent = document.getElementById('tech-details');
    const modalClose = document.querySelector('.modal-close');
    
    const techData = {
        'Bakery': {
            title: 'Mastering the <i>Sourdough Crust</i>',
            content: `
                <h3>The Physics of Oven-Spring</h3>
                <p>Oven spring is the final burst of expansion that occurs during the first 10-12 minutes of baking. It is driven by the rapid expansion of CO2 and steam captured within the gluten matrix.</p>
                <div class="data-grid">
                    <div class="data-point"><span>Optimum pH</span><strong>3.8 - 4.2</strong></div>
                    <div class="data-point"><span>Steam Saturation</span><strong>85%</strong></div>
                </div>
                <h3>The Maillard Reaction</h3>
                <p>The golden-brown crust is a result of amino acids reacting with reducing sugars at high heat, creating hundreds of flavor compounds.</p>
            `
        },
        'Sauces': {
            title: 'The Geometry of <i>Emulsions</i>',
            content: `
                <h3>Understanding Surface Tension</h3>
                <p>An emulsion is a mixture of two liquids that are normally immiscible. In culinary science, we focus on oil-in-water emulsions like Hollandaise or Mayonnaise.</p>
                <div class="data-grid">
                    <div class="data-point"><span>Droplet Size</span><strong>< 10μm</strong></div>
                    <div class="data-point"><span>Critical Temp</span><strong>63°C</strong></div>
                </div>
            `
        },
        'Preservation': {
            title: 'Modernist <i>Fermentation</i>',
            content: `
                <h3>Lacto-Fermentation Science</h3>
                <p>Lactobacillus bacteria convert sugars into lactic acid, lowering the pH and preserving the vegetables while creating a complex umami profile.</p>
                <div class="data-grid">
                    <div class="data-point"><span>Salinity</span><strong>2.5%</strong></div>
                    <div class="data-point"><span>Optimal pH</span><strong>< 4.6</strong></div>
                </div>
            `
        }
    };
    
    techCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('.category').textContent;
            const data = techData[category];
            if (data) {
                modalContent.innerHTML = `
                    <span class="badge">${category}</span>
                    <h2 class="display-sm">${data.title}</h2>
                    <div class="tech-deep-dive">
                        ${data.content}
                    </div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});
