document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        sidebar: document.getElementById('sidebar'),
        image: document.getElementById('current-image'),
        counter: document.getElementById('image-counter'),
        prevBtn: document.getElementById('btn-prev'),
        nextBtn: document.getElementById('btn-next'),
        details: document.getElementById('product-details')
    };

    let state = {
        images: [],
        currentIndex: 0
    };

    // Initialize catalogue (with cache-busting query parameter)
    fetch(`data/categories.json?v=${Date.now()}`)
        .then(res => {
            if (!res.ok) throw new Error("Could not load categories.json");
            return res.json();
        })
        .then(renderSidebar)
        .catch(err => console.error('Initialization error:', err));

    function renderSidebar(categories) {
        elements.sidebar.innerHTML = '';
        
        categories.forEach(category => {
            const group = document.createElement('div');
            group.className = 'category-group';
            
            const header = document.createElement('div');
            header.className = 'category-header';
            header.innerHTML = `<span>${category.name}</span> <span class="toggle-icon">+</span>`;
            
            const list = document.createElement('ul');
            list.className = 'product-lines';
            
            category.productLines.forEach(line => {
                const li = document.createElement('li');
                li.textContent = line.name;
                li.onclick = (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.product-lines li').forEach(el => el.classList.remove('selected'));
                    li.classList.add('selected');
                    fetchProductData(category.folder, line.folder);
                };
                list.appendChild(li);
            });

            header.onclick = () => {
                document.querySelectorAll('.product-lines').forEach(el => {
                    if (el !== list) {
                        el.classList.remove('active');
                        el.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                    }
                });
                
                const isActive = list.classList.toggle('active');
                header.querySelector('.toggle-icon').textContent = isActive ? '-' : '+';
            };

            group.append(header, list);
            elements.sidebar.appendChild(group);
        });
    }

    function fetchProductData(catFolder, lineFolder) {
        const path = `products/${catFolder}/${lineFolder}/`;
        
        // Cache-busting (?v=Timestamp) ensures freshest JSON is always loaded
        fetch(`${path}product.json?v=${Date.now()}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                renderDetails(data);
                if (data.images && data.images.length > 0) {
                    state.images = data.images.map(img => path + img);
                    state.currentIndex = 0;
                    updateGallery();
                } else {
                    clearGallery();
                }
            })
            .catch(err => {
                console.error(`Data loading error for ${path}product.json:`, err);
                clearGallery();
                elements.details.innerHTML = '<p style="color:red;">Product details unavailable. Check if product.json exists and has valid JSON syntax.</p>';
            });
    }

    // Dynamic renderer: renders ALL key-value pairs present in product.json
    function renderDetails(data) {
        let html = '';

        // Readable labels mapping for standard keys
        const customLabels = {
            productName: 'Product Name',
            customization: 'Customisation'
        };

        for (const key in data) {
            // Ignore images array from description panel
            if (key === 'images') continue;

            const value = data[key];
            if (value === null || value === undefined || value === '') continue;

            // Format key camelCase to Title Case (e.g. qualityStandards -> Quality Standards)
            const label = customLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            // Format arrays as comma-separated values
            const formattedVal = Array.isArray(value) ? value.join(', ') : value;

            html += `<div class="detail-item"><strong>${label}:</strong> ${formattedVal}</div>`;
        }
        
        elements.details.innerHTML = html || '<p>No product details specified.</p>';
    }

    function updateGallery() {
        if (state.images.length > 0) {
            elements.image.src = state.images[state.currentIndex];
            elements.image.style.display = 'block';
            elements.counter.textContent = `${state.currentIndex + 1} of ${state.images.length}`;
        }
    }

    function clearGallery() {
        state.images = [];
        elements.image.style.display = 'none';
        elements.counter.textContent = '0 of 0';
    }

    elements.nextBtn.onclick = () => {
        if (!state.images.length) return;
        state.currentIndex = (state.currentIndex + 1) % state.images.length;
        updateGallery();
    };

    elements.prevBtn.onclick = () => {
        if (!state.images.length) return;
        state.currentIndex = (state.currentIndex - 1 + state.images.length) % state.images.length;
        updateGallery();
    };
});