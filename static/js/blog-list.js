const categoriesToggle = document.getElementById('less-more-toggle');
const categoryPills = document.querySelectorAll('.category-pill');
const allCategoryPill = document.getElementById('all-category-pill');
const allPosts = document.querySelectorAll('.title-description');

let chosenCategories = ['all'];

function blogList() {
    setupToggleCategories();
    setupCategoryFilter();
}

function setupToggleCategories() {
    categoriesToggle?.addEventListener('click', () => {
        const isExpanded = categoriesToggle.getAttribute('aria-expanded') === 'true';
        categoriesToggle.setAttribute('aria-expanded', String(!isExpanded));

        categoryPills.forEach((pill, index) => {
            const showAll = !isExpanded || index < 5;
            pill.setAttribute('tabindex', showAll ? '0' : '-1');
        });
    });
}

function setupCategoryFilter() {
    categoryPills.forEach(pill => {
        const category = pill.getAttribute('data-category')?.toLowerCase();

        pill.addEventListener('click', () => {
            if (!category) return;

            if (category === 'all') {
                chosenCategories = ['all'];
                updatePillStates();
                filterPosts();
                return;
            }

            // Remove 'all' if it's present
            chosenCategories = chosenCategories.filter(cat => cat !== 'all');

            if (chosenCategories.includes(category)) {
                chosenCategories = chosenCategories.filter(cat => cat !== category);
            } else {
                chosenCategories.push(category);
            }

            // If no categories selected, default to 'all'
            if (chosenCategories.length === 0) {
                chosenCategories = ['all'];
            }

            updatePillStates();
            filterPosts();
        });
    });

    updatePillStates(); // initialize pill states
    filterPosts();      // show all posts initially
}

function updatePillStates() {
    categoryPills.forEach(pill => {
        const category = pill.getAttribute('data-category')?.toLowerCase();
        const isActive = chosenCategories.includes(category);
        pill.setAttribute('aria-pressed', String(isActive));
    });
}

function filterPosts() {
    allPosts.forEach(post => {
        const matches = chosenCategories.includes('all') ||
            chosenCategories.some(cat => post.classList.contains(`cat-${cat}`));

        post.style.display = matches ? 'block' : 'none';
    });
}

blogList();