const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const primaryMenu = document.getElementById('primaryMenu');

const handleToggleMenu = () => {
  if (!menuButton || !mobileMenu) return;
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    return;
  }
  mobileMenu.classList.remove('hidden');
  menuButton.setAttribute('aria-expanded', 'true');
};

const handleKeyToggle = (event) => {
  if (!event) return;
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  handleToggleMenu();
};

const handleCloseOnResize = () => {
  if (!mobileMenu) return;
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add('hidden');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  }
};

if (menuButton) {
  menuButton.addEventListener('click', handleToggleMenu);
  menuButton.addEventListener('keydown', handleKeyToggle);
}

document.querySelectorAll('#mobileMenu a').forEach((link) => {
  link.addEventListener('click', () => {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('resize', handleCloseOnResize);

// Products & Systems filtering and UI enhancements
const filterInput = document.getElementById('products-filter-input');
const filterClear = document.getElementById('products-filter-clear');
const productRows = Array.from(document.querySelectorAll('.products-row'));
const tableWrapper = document.getElementById('productsTableWrapper');
const tableTopShadow = document.getElementById('productsTableTopShadow');

const handleFilter = () => {
  if (!filterInput) return;
  const query = filterInput.value.trim().toLowerCase();
  let visible = 0;
  productRows.forEach((row) => {
    const text = row.textContent ? row.textContent.toLowerCase() : '';
    const matches = text.includes(query);
    row.style.display = matches ? '' : 'none';
    if (matches) visible += 1;
  });
  if (filterClear) filterClear.classList.toggle('hidden', query.length === 0);
};

const handleClearFilter = () => {
  if (!filterInput) return;
  filterInput.value = '';
  handleFilter();
  filterInput.focus();
};

if (filterInput) {
  filterInput.addEventListener('input', handleFilter);
}
if (filterClear) {
  filterClear.addEventListener('click', handleClearFilter);
}

const handleTableScrollShadow = () => {
  if (!tableWrapper || !tableTopShadow) return;
  const scrolled = tableWrapper.scrollTop > 0;
  tableTopShadow.style.opacity = scrolled ? '1' : '0';
};

if (tableWrapper) {
  tableWrapper.addEventListener('scroll', handleTableScrollShadow);
}



