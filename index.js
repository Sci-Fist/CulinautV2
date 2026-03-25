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
                if (item.vegan) tags += '<span class="tag-vegan">[V]</span>';
                if (item.gf) tags += '<span class="tag-gf">[GF]</span>';

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

        // 3. Hover Effects for Cursor
        const hoverTargets = 'a, button, .service-card, .pillar-card, .pricing-card, .step-card, .photo-card, .upload-box, input, .menu-item';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => {
                glow.style.width = '150px';
                glow.style.height = '150px';
                glow.style.background = 'radial-gradient(circle, rgba(0, 242, 255, 0.6) 0%, transparent 70%)';
                dot.style.transform = 'translate(-50%, -50%) scale(2.5)';
            });
            el.addEventListener('mouseleave', () => {
                glow.style.width = '300px';
                glow.style.height = '300px';
                glow.style.background = 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)';
                dot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

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

    // 8. AI Scanner Mock
    const scanBtn = document.getElementById('scan-btn');
    const scanResults = document.getElementById('scan-results');
    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            scanBtn.textContent = 'Analysing Assets...';
            scanBtn.disabled = true;
            setTimeout(() => {
                scanResults.innerHTML = `
                    <div class="result-item success">
                        <h4>LMIV Audit: Passed</h4>
                        <p>All 14 mandatory allergens correctly labeled.</p>
                        <span class="confidence">99.2% Accuracy</span>
                    </div>
                    <div class="result-item">
                        <h4>Nutritional Check</h4>
                        <p>Kcal calculation verified (450kcal avg).</p>
                        <span class="confidence">87.5% Confidence</span>
                    </div>
                `;
                scanBtn.textContent = 'Scan Complete';
            }, 1500);
        });
    }

    // 9. Profit Calculator
    const revInput = document.getElementById('revenue-input');
    const upsellRange = document.getElementById('upsell-rate');
    const upsellVal = document.getElementById('upsell-val');
    const gainTotal = document.getElementById('gain-total');

    if (revInput && upsellRange) {
        const updateCalc = () => {
            const rev = parseFloat(revInput.value) || 0;
            const rate = parseFloat(upsellRange.value) / 100;
            const annualGain = rev * rate * 12;
            upsellVal.textContent = `${upsellRange.value}%`;
            gainTotal.textContent = `€${Math.round(annualGain).toLocaleString()}`;
        };
        revInput.addEventListener('input', updateCalc);
        upsellRange.addEventListener('input', updateCalc);
    }
});
