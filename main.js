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



// Brands Section Functionality
// Sample brand data for testing (you can replace these with your actual brands)
const brandsData = {
  'A': ['ABB', 'Atlas Copco', 'Alfa Laval', 'Armstrong', 'AEG', 'Allen Bradley', 'Auma', 'Azbil'],
  'B': ['Bosch', 'Baldor', 'Bentley', 'Bachmann', 'Burkert', 'Bitzer', 'Boge', 'Bussmann'],
  'C': ['Caterpillar', 'Cummins', 'Control Techniques', 'Crouzet', 'Copal', 'Copal Electronics', 'Copal Controls'],
  'D': ['Danfoss', 'Delta', 'Danaher', 'Dresser', 'Dynapar', 'Dynisco', 'Dynalco', 'Dynatrol'],
  'E': ['Emerson', 'Eaton', 'Endress+Hauser', 'Enerpac', 'Eurotherm', 'Euchner', 'Elcon', 'Eltra'],
  'F': ['Festo', 'Flowserve', 'Fuji Electric', 'FANUC', 'Fagor', 'Fischer', 'Flo-Tork', 'Flo-Tech'],
  'G': ['GE', 'Grundfos', 'Goulds', 'Grundfos Pumps', 'Grundfos Motors', 'Grundfos Controls', 'Grundfos Valves'],
  'H': ['Honeywell', 'Hitachi', 'Hagglunds', 'Haskel', 'Hoffman', 'Hubbell', 'Hytorc', 'Hytorc Tools'],
  'I': ['Ingersoll Rand', 'ITT', 'Invensys', 'Invensys Foxboro', 'Invensys Triconex', 'Invensys Wonderware'],
  'J': ['Johnson Controls', 'Jumo', 'Jokab Safety', 'Jokab Safety Systems', 'Jokab Safety Products'],
  'K': ['Kawasaki', 'Kistler', 'Kistler Instruments', 'Kistler Sensors', 'Kistler Transducers'],
  'L': ['Liebherr', 'Linde', 'Linde Gas', 'Linde Engineering', 'Linde Material Handling'],
  'M': ['Mitsubishi', 'Motorola', 'Mettler Toledo', 'Mettler Toledo Scales', 'Mettler Toledo Balances'],
  'N': ['Nachi', 'Nachi Bearings', 'Nachi Tools', 'Nachi Cutting Tools', 'Nachi Machine Tools'],
  'O': ['Omron', 'Omega', 'Omega Engineering', 'Omega Temperature', 'Omega Pressure'],
  'P': ['Parker', 'Parker Hannifin', 'Parker Hydraulics', 'Parker Pneumatics', 'Parker Filtration'],
  'Q': ['Qualitrol', 'Qualitrol Corporation', 'Qualitrol Sensors', 'Qualitrol Monitoring'],
  'R': ['Rockwell', 'Rockwell Automation', 'Rockwell Software', 'Rockwell Hardware', 'Rockwell Controls'],
  'S': ['Schneider', 'Schneider Electric', 'Siemens', 'Siemens Energy', 'Siemens Industry'],
  'T': ['Toshiba', 'Toshiba International', 'Toshiba Motors', 'Toshiba Drives', 'Toshiba Controls'],
  'U': ['United Technologies', 'UTC', 'United Technologies Corporation', 'United Technologies Aerospace'],
  'V': ['Vickers', 'Vickers Hydraulics', 'Vickers Pumps', 'Vickers Valves', 'Vickers Motors'],
  'W': ['WEG', 'WEG Motors', 'WEG Drives', 'WEG Controls', 'WEG Automation'],
  'X': ['Xylem', 'Xylem Water Solutions', 'Xylem Analytics', 'Xylem Applied Water Systems'],
  'Y': ['Yaskawa', 'Yaskawa Electric', 'Yaskawa Drives', 'Yaskawa Motors', 'Yaskawa Robotics'],
  'Z': ['ZF', 'ZF Friedrichshafen', 'ZF Transmissions', 'ZF Marine', 'ZF Industrial'],
  '#': ['3M', '4B', '5B', '7B', '8B', '9B', '10B', '12B']
};

const handleBrandFilter = (letter) => {
  const brandFilterBtns = document.querySelectorAll('.brand-filter-btn');
  const brandsContent = document.getElementById('brands-content');
  
  console.log('handleBrandFilter called with letter:', letter);
  console.log('brandsContent element:', brandsContent);
  
  if (!brandsContent) {
    console.error('Brands content element not found');
    return;
  }
  
  // Update active button state
  brandFilterBtns.forEach(btn => {
    btn.classList.remove('active', 'bg-brandPurple', 'text-white');
    btn.classList.add('bg-gray-100', 'text-gray-700');
  });
  
  const activeBtn = document.querySelector(`[data-letter="${letter}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-brandPurple', 'text-white');
    activeBtn.classList.remove('bg-gray-100', 'text-gray-700');
  }

  // Display brands for selected letter
  if (brandsData[letter]) {
    const brands = brandsData[letter];
    const brandsHTML = brands.map(brand => `
      <div class="text-brandNavy text-lg font-medium hover:text-brandPurple transition-colors cursor-pointer">
        ${brand}
      </div>
    `).join('');
    
    console.log('Generated HTML:', brandsHTML);
    brandsContent.innerHTML = brandsHTML;
    console.log(`Displaying ${brands.length} brands for letter ${letter}`);
    console.log('brandsContent.innerHTML length:', brandsContent.innerHTML.length);
  } else {
    console.error('No brands data found for letter:', letter);
  }
};

// Initialize brands section with letter A active by default
const initializeBrands = () => {
  console.log('=== INITIALIZING BRANDS SECTION ===');
  
  const brandFilterBtns = document.querySelectorAll('.brand-filter-btn');
  const brandsContent = document.getElementById('brands-content');
  
  console.log('Found brand filter buttons:', brandFilterBtns.length);
  console.log('Found brands content element:', brandsContent);
  console.log('brandsData keys:', Object.keys(brandsData));
  
  if (brandFilterBtns.length > 0 && brandsContent) {
    console.log('All required elements found, proceeding...');
    
    // Set initial active state for letter A
    const letterABtn = document.querySelector('[data-letter="A"]');
    if (letterABtn) {
      letterABtn.classList.add('active', 'bg-brandPurple', 'text-white');
      letterABtn.classList.remove('bg-gray-100', 'text-gray-700');
      console.log('Set letter A as active');
    }
    
    // Show brands for letter A by default
    console.log('Calling handleBrandFilter("A")...');
    handleBrandFilter('A');
  } else {
    console.error('Required elements not found for brands section');
    console.error('brandFilterBtns.length:', brandFilterBtns.length);
    console.error('brandsContent:', brandsContent);
  }
};

// Initialize brands section when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBrands);

// Also add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const brandFilterBtns = document.querySelectorAll('.brand-filter-btn');
  
  brandFilterBtns.forEach(btn => {
    // Show brands on hover
    btn.addEventListener('mouseenter', () => {
      const letter = btn.getAttribute('data-letter');
      if (letter) {
        console.log('Hovered over letter:', letter);
        handleBrandFilter(letter);
      }
    });
    
    // Keep click functionality as backup
    btn.addEventListener('click', () => {
      const letter = btn.getAttribute('data-letter');
      if (letter) {
        console.log('Clicked letter:', letter);
        handleBrandFilter(letter);
      }
    });
  });
});

// Try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  console.log('DOM still loading, waiting for DOMContentLoaded...');
} else {
  console.log('DOM already loaded, initializing immediately...');
  initializeBrands();
}



