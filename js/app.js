document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const productImage = document.getElementById('current-image');
    const imageCounter = document.getElementById('image-counter');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const productDetails = document.getElementById('product-details');

    let currentImages = [];
    let currentImageIndex = 0;

    // Load categories on start
    fetch('data/categories.json')
        .then(res => res.json())
        .then(data => renderSidebar(data))
        .catch(err => console.error('Error loading categories:', err));

    function renderSidebar(categories) {
        sidebar.innerHTML = '';
        categories.forEach(category => {
            const group = document.createElement('div');
            group.className = 'category-group';
            
            // Header (Product Category 1)
            const header = document.createElement('div');
            header.className = 'category-header';
            header.innerHTML = `<span>${category.name}</span> <span class="toggle-icon">+</span>`;
            
            // Product Lines List (Product line 1.2)
            const list = document.createElement('ul');
            list.className = 'product-lines';
            
            category.productLines.forEach(line => {
                const li = document.createElement('li');
                li.textContent = line.name;
                li.onclick = (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.product-lines li').forEach(el => el.classList.remove('selected'));
                    li.classList.add('selected');
                    loadProductData(category.folder, line.folder);
                };
                list.appendChild(li);
            });

            header.onclick = () => {
                // Accordion behavior
                document.querySelectorAll('.product-lines').forEach(el => {
                    if (el !== list) {
                        el.classList.remove('active');
                        el.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
                    }
                });
                
                const isActive = list.classList.toggle('active');
                header.querySelector('.toggle-icon').textContent = isActive ? '-' : '+';
            };

            group.appendChild(header);
            group.appendChild(list);
            sidebar.appendChild(group);
        });
    }

    function loadProductData(catFolder, lineFolder) {
        const basePath = `products/${catFolder}/${lineFolder}/`;
        
        fetch(`${basePath}product.json`)
            .then(res => res.json())
            .then(data => {
                renderDetails(data);
                if (data.images && data.images.length > 0) {
                    currentImages = data.images.map(img => basePath + img);
                    currentImageIndex = 0;
                    updateImageDisplay();
                } else {
                    currentImages = [];
                    productImage.style.display = 'none';
                    imageCounter.textContent = '0 of 0';
                }
            })
            .catch(err => console.error('Error loading product data:', err));
    }

    function renderDetails(data) {
        let html = '';
        if(data.productName) html += `<div class="detail-item"><strong>Product Name:</strong> ${data.productName}</div>`;
        if(data.weight) html += `<div class="detail-item"><strong>Weight:</strong> ${data.weight}</div>`;
        if(data.colors) html += `<div class="detail-item"><strong>Color options:</strong> ${data.colors.join(', ')}</div>`;
        if(data.material) html += `<div class="detail-item"><strong>Material:</strong> ${data.material}</div>`;
        if(data.customization) html += `<div class="detail-item"><strong>Customisation:</strong> ${data.customization}</div>`;
        productDetails.innerHTML = html;
    }

    function updateImageDisplay() {
        if (currentImages.length > 0) {
            productImage.src = currentImages[currentImageIndex];
            productImage.style.display = 'block';
            imageCounter.textContent = `${currentImageIndex + 1} of ${currentImages.length}`;
        }
    }

    btnNext.onclick = () => {
        if (currentImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        updateImageDisplay();
    };

    btnPrev.onclick = () => {
        if (currentImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        updateImageDisplay();
    };
});