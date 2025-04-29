// Application images and titles for each tab
const applicationData = {
    'walling': {
        image: 'assests/1.png',
        title: 'WALLING SOLUTIONS'
    },
    'waterproofing': {
        image: 'assests/1.png',
        title: 'WATERPROOFING SYSTEMS'
    },
    'tile': {
        image: 'assests/1.png',
        title: 'TILE AND STONE INSTALLATION SOLUTIONS'
    },
    'structural': {
        image: 'assests/1.png',
        title: 'STRUCTURAL REPAIRS, SEALANTS & GROUTS'
    },
    'protective': {
        image: 'assests/1.png',
        title: 'PROTECTIVE COATINGS'
    }
};

// Product data for each tab
const productData = {
    'walling': [{
            image: 'assests/1.png',
            name: 'ASCOSEAL PU',
            description: 'Single component polyurethane sealant'
        },
        {
            image: 'assests/1.png',
            name: 'ASCOPOXY PUTTY',
            description: 'Two component epoxy putty'
        },
        {
            image: 'assests/1.png',
            name: 'FLY ASH BLOCKS',
            description: 'High-quality construction blocks'
        },
        {
            image: 'assests/1.png',
            name: 'READY MIX MORTAR',
            description: 'Pre-mixed mortar for construction'
        }
    ],
    'waterproofing': [{
        image: 'assests/1.png',
        name: 'ASCOPROOF IW+',
        description: 'Internal wall waterproofing solution'
    }],
    'tile': [{
        image: 'assests/1.png',
        name: 'TILE ADHESIVE PRO',
        description: 'Professional grade tile adhesive'
    }],
    'structural': [{
        image: 'assests/1.png',
        name: 'REPAIR MORTAR',
        description: 'High-strength repair mortar'
    }],
    'protective': [{
        image: 'assests/1.png',
        name: 'WALL GUARD',
        description: 'Protective wall coating system'
    }]
};

class ProductsManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.currentTab = 'walling';
        this.updateContent();
    }

    initializeElements() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.productsGrid = document.querySelector('.products-grid');
        this.applicationImage = document.getElementById('applicationImage');
        this.applicationTitle = document.getElementById('applicationTitle');
    }

    setupEventListeners() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleTabSwitch(button);
            });
        });
    }

    handleTabSwitch(clickedTab) {
        // Remove active class from all tabs
        this.tabButtons.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });

        // Add active class to clicked tab
        clickedTab.classList.add('active');
        clickedTab.setAttribute('aria-selected', 'true');

        // Update current tab and content
        this.currentTab = clickedTab.dataset.tab;
        this.updateContent();
    }

    updateContent() {
        this.updateApplicationImage();
        this.updateProducts();
    }

    updateApplicationImage() {
        const appData = applicationData[this.currentTab];
        if (!appData) return;

        // Fade out current image and title
        this.applicationImage.style.opacity = '0';
        this.applicationTitle.style.opacity = '0';

        setTimeout(() => {
            // Update image and title
            this.applicationImage.src = appData.image;
            this.applicationTitle.textContent = appData.title;

            // Fade in new image and title
            this.applicationImage.style.opacity = '1';
            this.applicationTitle.style.opacity = '1';
        }, 300);
    }

    updateProducts() {
        const products = productData[this.currentTab];
        if (!products) return;

        // Fade out current products
        this.productsGrid.style.opacity = '0';

        setTimeout(() => {
            // Generate product cards HTML
            this.productsGrid.innerHTML = products.map(product => `
                <div class="product-card bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div class="aspect-w-4 aspect-h-3">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-4">
                        <h4 class="text-xl font-semibold text-gray-900 mb-2">${product.name}</h4>
                        <p class="text-gray-600 mb-4">${product.description}</p>
                        <button class="view-product-btn bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors w-full">
                            View Product
                        </button>
                    </div>
                </div>
            `).join('');

            // Fade in new products
            this.productsGrid.style.opacity = '1';

            // Add click handlers to view product buttons
            const viewButtons = this.productsGrid.querySelectorAll('.view-product-btn');
            viewButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    this.showProductModal(products[index]);
                });
            });
        }, 300);
    }

    showProductModal(product) {
        const modal = document.getElementById('productModal');
        const modalImg = document.getElementById('modalProductImg');
        const modalName = document.getElementById('modalProductName');
        const modalDetails = document.getElementById('modalProductDetails');

        if (modal && modalImg && modalName && modalDetails) {
            modalImg.src = product.image;
            modalName.textContent = product.name;
            modalDetails.textContent = product.description;
            modal.classList.remove('hidden');
        }
    }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const productsManager = new ProductsManager();

    // Make closeProductModal available globally
    window.closeProductModal = function() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };
});