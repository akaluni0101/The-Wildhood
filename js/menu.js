/**
 * THE WILDHOOD — LUXURY WILDLIFE-THEMED CAFÉ & RESTAURANT
 * Menu System Data & Interactive Filter Logic
 */

const WILDHOOD_MENU = [
  // --- STARTERS & SMALL PLATES ---
  {
    id: 1,
    name: "Truffle Wild Mushroom Arancini",
    category: "starters",
    price: "₹420",
    diet: "veg",
    chefSpecial: true,
    desc: "Crispy arborio risotto spheres infused with forest wild mushrooms, aged parmesan, black truffle oil and roasted garlic aioli."
  },
  {
    id: 2,
    name: "Smoked Himalayan Cottage Cheese Skewers",
    category: "starters",
    price: "₹390",
    diet: "veg",
    chefSpecial: false,
    desc: "Artisanal paneer marinated with mountain wild herbs, crushed coriander seed and hung curd, charred over fragrant charcoal embers."
  },
  {
    id: 3,
    name: "Wildhood Crispy Pepper Calamari",
    category: "starters",
    price: "₹520",
    diet: "non-veg",
    chefSpecial: true,
    desc: "Tender calamari tossed with kaffir lime zest, bird's eye chili, scallions, served with smoked chili dip."
  },
  {
    id: 4,
    name: "Herb Crusted Chicken Tenders",
    category: "starters",
    price: "₹440",
    diet: "non-veg",
    chefSpecial: false,
    desc: "Golden buttermilk crumb chicken strips paired with whole-grain honey mustard and house-made jalapeno dip."
  },
  {
    id: 5,
    name: "Avocado & Edamame Crostini",
    category: "starters",
    price: "₹460",
    diet: "veg",
    chefSpecial: false,
    desc: "Smashed Hass avocado, steamed edamame, micro basil, pickled shallots and aged balsamic glaze on grilled sourdough."
  },

  // --- SOUPS & GREENS ---
  {
    id: 6,
    name: "Roasted Forest Pumpkin & Thyme Velouté",
    category: "soups",
    price: "₹340",
    diet: "veg",
    chefSpecial: false,
    desc: "Silky roasted butternut pumpkin broth gently scented with garden fresh thyme, toasted pepitas and coconut cream."
  },
  {
    id: 7,
    name: "Burrata & Heritage Tomato Medley",
    category: "soups",
    price: "₹490",
    diet: "veg",
    chefSpecial: true,
    desc: "Fresh artisanal burrata, heirloom garden tomatoes, pine nuts, basil emulsion and 12-year Modena balsamic drizzle."
  },
  {
    id: 8,
    name: "Smoked Caesar with Chargrilled Chicken",
    category: "soups",
    price: "₹460",
    diet: "non-veg",
    chefSpecial: false,
    desc: "Crisp romaine hearts, shaved parmigiano reggiano, brioche croutons and tender smoky chicken strips."
  },

  // --- WOOD-FIRED PIZZAS ---
  {
    id: 9,
    name: "Wildhood Botanical Margherita",
    category: "pizza",
    price: "₹560",
    diet: "veg",
    chefSpecial: true,
    desc: "48-hour fermented sourdough crust, San Marzano tomato sauce, fresh buffalo mozzarella, sweet basil and cold-pressed extra virgin olive oil."
  },
  {
    id: 10,
    name: "Forest Forager Wild Funghi",
    category: "pizza",
    price: "₹640",
    diet: "veg",
    chefSpecial: true,
    desc: "Bianca sauce base, sautéed porcini, shimeji and button mushrooms, fontina cheese, fresh thyme and a mist of white truffle essence."
  },
  {
    id: 11,
    name: "Smoked Pepperoni & Hot Honey",
    category: "pizza",
    price: "₹720",
    diet: "non-veg",
    chefSpecial: true,
    desc: "Artisanal pork pepperoni, mozzarella fior di latte, crushed chili flakes, drizzled with organic chili-infused hot honey."
  },
  {
    id: 12,
    name: "Roast Chicken & Charred Bell Pepper",
    category: "pizza",
    price: "₹650",
    diet: "non-veg",
    chefSpecial: false,
    desc: "Slow roasted herb chicken, caramelised sweet onions, fire-roasted red peppers, mozzarella and fresh oregano."
  },

  // --- ARTISANAL PASTA ---
  {
    id: 13,
    name: "Handcrafted Black Truffle Tagliatelle",
    category: "pasta",
    price: "₹620",
    diet: "veg",
    chefSpecial: true,
    desc: "Fresh eggless handmade ribbons tossed in cultured butter, shaved black truffle carpaccio, parmigiano reggiano and cracked peppercorn."
  },
  {
    id: 14,
    name: "Spaghetti Aglio Olio e Peperoncino",
    category: "pasta",
    price: "₹490",
    diet: "veg",
    chefSpecial: false,
    desc: "Bronze-die spaghetti spun with golden garlic slivers, cold-pressed olive oil, fresh parsley, sun-dried tomatoes and chili flakes."
  },
  {
    id: 15,
    name: "Rigatoni Bolognese alla Wilderness",
    category: "pasta",
    price: "₹640",
    diet: "non-veg",
    chefSpecial: true,
    desc: "Slow-braised rich minced meat ragù simmered for six hours with mirepoix, Italian tomatoes and fresh rosemary."
  },
  {
    id: 16,
    name: "Creamy Pesto Penne with Pine Nuts",
    category: "pasta",
    price: "₹540",
    diet: "veg",
    chefSpecial: false,
    desc: "House-crushed Genovese basil pesto, roasted pine nuts, mascarpone cream and sweet cherry tomatoes."
  },

  // --- MAINS & GRILLS ---
  {
    id: 17,
    name: "Pan-Seared Norwegian Salmon",
    category: "mains",
    price: "₹890",
    diet: "non-veg",
    chefSpecial: true,
    desc: "Crispy skin salmon fillet, velvety potato purée, charred asparagus spears and lemon caper beurre blanc."
  },
  {
    id: 18,
    name: "Chargrilled Rosemary Chicken Steak",
    category: "mains",
    price: "₹660",
    diet: "non-veg",
    chefSpecial: false,
    desc: "Juicy chicken breast marinated with fresh rosemary, served with garlic mash, sautéed greens and rich wild mushroom jus."
  },
  {
    id: 19,
    name: "Slow Cooked Cottage Cheese Roulade",
    category: "mains",
    price: "₹560",
    diet: "veg",
    chefSpecial: false,
    desc: "Spinach & pine nut stuffed paneer medallion set on rich makhani reduction, served with herbed saffron pilaf."
  },
  {
    id: 20,
    name: "Wildhood Gourmet Green Bowl",
    category: "mains",
    price: "₹520",
    diet: "veg",
    chefSpecial: false,
    desc: "Warm quinoa, roasted spiced chickpeas, grilled zucchini, avocado rosette, tahini lime dressing and toasted seeds."
  },

  // --- DESSERTS ---
  {
    id: 21,
    name: "The Wildhood Dark Chocolate Dome",
    category: "desserts",
    price: "₹460",
    diet: "veg",
    chefSpecial: true,
    desc: "Belgian 70% dark chocolate sphere melted tableside with hot spiced salted caramel, revealing hazelnut mousse & wild berry compote."
  },
  {
    id: 22,
    name: "Classic Espresso Tiramisu",
    category: "desserts",
    price: "₹390",
    diet: "veg",
    chefSpecial: false,
    desc: "Savoiardi ladyfingers soaked in single-origin arabica espresso, layered with whipped mascarpone and dusted with Dutch cocoa."
  },
  {
    id: 23,
    name: "Baked Basque Burnt Cheesecake",
    category: "desserts",
    price: "₹410",
    diet: "veg",
    chefSpecial: true,
    desc: "Caramelised exterior with an ultra-creamy molten center, accompanied by house-made forest blackberry coulis."
  },

  // --- CRAFTED BEVERAGES & MOCKTAILS ---
  {
    id: 24,
    name: "Smoked Rosemary Woodland Mist",
    category: "beverages",
    price: "₹320",
    diet: "veg",
    chefSpecial: true,
    desc: "Fresh muddled blueberries, elderflower cordial, pressed cloudy apple, presented under a dome of aromatic rosemary smoke."
  },
  {
    id: 25,
    name: "Wild Jungle Passionfruit Cooler",
    category: "beverages",
    price: "₹290",
    diet: "veg",
    chefSpecial: false,
    desc: "Tangy passionfruit pulp, fresh mint leaves, kaffir lime, coconut water and fizzy ginger ale over crushed ice."
  },
  {
    id: 26,
    name: "Artisanal Pour-Over Single Origin Coffee",
    category: "beverages",
    price: "₹260",
    diet: "veg",
    chefSpecial: false,
    desc: "Medium-roast estate Arabica from Chikmagalur brewed manually through V60 paper filter. Notes of stone fruit and dark honey."
  },
  {
    id: 27,
    name: "Spiced Golden Turmeric Almond Latte",
    category: "beverages",
    price: "₹280",
    diet: "veg",
    chefSpecial: false,
    desc: "Fresh turmeric root, Ceylon cinnamon, cardamom, pure honey and steamed silky almond milk."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menuGridContainer');
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const searchInput = document.getElementById('menuSearchInput');
  const countDisplay = document.getElementById('menuCountDisplay');

  if (!menuContainer) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderMenu() {
    const filtered = WILDHOOD_MENU.filter(item => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} Dishes`;
    }

    if (filtered.length === 0) {
      menuContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <p style="font-family: var(--font-display); font-size: 1.2rem; color: var(--color-gold); margin-bottom: 8px;">No Wildhood Dishes Found</p>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">Try searching another keyword or reset the category filter.</p>
        </div>
      `;
      return;
    }

    menuContainer.innerHTML = filtered.map(item => `
      <div class="menu-item-card" data-category="${item.category}">
        <div class="menu-item-details">
          <div class="menu-item-badges">
            <span class="badge-diet ${item.diet === 'veg' ? 'badge-veg' : 'badge-nonveg'}">
              ${item.diet === 'veg' ? '● Veg' : '▲ Non-Veg'}
            </span>
            ${item.chefSpecial ? '<span class="badge-diet badge-chef">★ Signature</span>' : ''}
          </div>
          <div class="menu-item-header">
            <h3 class="menu-item-name">${item.name}</h3>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Event Listeners for Filters
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderMenu();
    });
  });

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  // Initial render
  renderMenu();
});
