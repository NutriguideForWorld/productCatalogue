Universal Carton Tier Calculator

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Universal Carton Tier Calculator - Reuse That Box</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- FontAwesome for clean icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          colors: {
            kraft: {
              50: '#fdfbf7',
              100: '#f7f2e7',
              200: '#ede0ca',
              300: '#dfca9f',
              400: '#cfb076',
              500: '#bf9453',
              600: '#a37740',
              700: '#835a34',
              800: '#6d482e',
              900: '#5a3d29',
            },
            eco: {
              50: '#f2f9f5',
              100: '#dfefded',
              200: '#beedd',
              300: '#90d7aa',
              400: '#5dbb7f',
              500: '#389f5f',
              600: '#288049',
              700: '#22663c',
              800: '#1e5232',
              900: '#19432a',
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #fbf9f5;
      color: #2d2a26;
    }
    .custom-shadow {
      box-shadow: 0 10px 25px -5px rgba(109, 72, 46, 0.08), 0 8px 10px -6px rgba(109, 72, 46, 0.05);
    }
    .active-tier-row {
      background-color: #ecfdf5 !important;
      border-left: 4px solid #059669 !important;
    }
    /* Simple CSS 3D Box Styling */
    .box-container {
      perspective: 600px;
    }
    .box-3d {
      transform-style: preserve-3d;
      transition: transform 0.3s ease;
    }
  </style>
</head>
<body class="font-sans antialiased min-h-screen flex flex-col justify-between">

  <!-- TOP BRANDING & HEADER -->
  <header class="bg-gradient-to-r from-eco-900 via-eco-800 to-kraft-900 text-white border-b border-eco-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-eco-300 font-semibold text-xs tracking-wider uppercase mb-1">
            <i class="fa-solid font-bold fa-leaf"></i>
            <span>Baraka Impact Inspired • Sustainable Shipping Tool</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <i class="fa-solid fa-box-open text-kraft-300"></i>
            Universal Carton Tier Calculator
          </h1>
          <p class="mt-2 text-base text-kraft-100 max-w-2xl">
            Reuse That Box! Instantly compute USPS Cubic Tiers for Priority Mail &amp; Ground Advantage to reduce packaging waste and lower shipping costs.
          </p>
        </div>
        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs text-kraft-100">
          <div class="text-2xl text-kraft-300"><i class="fa-solid fa-scale-balanced"></i></div>
          <div>
            <div class="font-bold text-white text-sm">USPS Cubic Rule Quick Reference</div>
            <div>Max Weight: <span class="font-semibold text-kraft-200">20 lbs</span> • Max Side: <span class="font-semibold text-kraft-200">18"</span> (Updated up to 22")</div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- MAIN CONTENT CONTAINER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">

    <!-- TOP CONTROL ROW: CALCULATOR & REAL-TIME RESULT DISPLAY -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

      <!-- LEFT COLUMN: INPUT CONTROLS & PRESETS (7 Cols) -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- INPUT CARD -->
        <div class="bg-white rounded-2xl p-6 border border-kraft-200 custom-shadow">
          <div class="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-eco-100 text-eco-800 flex items-center justify-center font-bold text-sm">1</span>
              <h2 class="text-lg font-bold text-stone-800">Outer Carton Dimensions</h2>
            </div>
            
            <!-- Unit Toggle Switch -->
            <div class="inline-flex rounded-lg p-1 bg-stone-100 border border-stone-200">
              <button type="button" id="unit-in-btn" onclick="setUnit('in')" 
                class="px-3 py-1.5 text-xs font-bold rounded-md transition-all bg-white text-eco-800 shadow-sm">
                Inches (in)
              </button>
              <button type="button" id="unit-cm-btn" onclick="setUnit('cm')" 
                class="px-3 py-1.5 text-xs font-bold rounded-md transition-all text-stone-600 hover:text-stone-900">
                Centimeters (cm)
              </button>
            </div>
          </div>

          <!-- Dimension Inputs Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <!-- Length -->
            <div>
              <label for="input-length" class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Length <span class="unit-label text-stone-400 font-normal">(in)</span>
              </label>
              <div class="relative">
                <input type="number" id="input-length" step="0.1" min="0.1" value="10" placeholder="10"
                  class="w-full pl-3 pr-8 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eco-500 focus:border-eco-500 font-semibold text-stone-800 transition-all text-base">
                <span class="absolute right-3 top-3 text-xs text-stone-400 font-bold unit-label">in</span>
              </div>
            </div>

            <!-- Width -->
            <div>
              <label for="input-width" class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Width <span class="unit-label text-stone-400 font-normal">(in)</span>
              </label>
              <div class="relative">
                <input type="number" id="input-width" step="0.1" min="0.1" value="8" placeholder="8"
                  class="w-full pl-3 pr-8 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eco-500 focus:border-eco-500 font-semibold text-stone-800 transition-all text-base">
                <span class="absolute right-3 top-3 text-xs text-stone-400 font-bold unit-label">in</span>
              </div>
            </div>

            <!-- Height -->
            <div>
              <label for="input-height" class="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Height <span class="unit-label text-stone-400 font-normal">(in)</span>
              </label>
              <div class="relative">
                <input type="number" id="input-height" step="0.1" min="0.1" value="6" placeholder="6"
                  class="w-full pl-3 pr-8 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-eco-500 focus:border-eco-500 font-semibold text-stone-800 transition-all text-base">
                <span class="absolute right-3 top-3 text-xs text-stone-400 font-bold unit-label">in</span>
              </div>
            </div>
          </div>

          <!-- Quick Presets -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-stone-600 uppercase tracking-wider">Quick Preset Reused Boxes:</span>
              <button type="button" onclick="resetCalculator()" class="text-xs text-stone-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors">
                <i class="fa-solid fa-rotate-left"></i> Reset
              </button>
            </div>
            <div class="flex flex-wrap gap-2" id="presets-container">
              <!-- Preset Pills Populated via JS -->
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button type="button" onclick="calculateTier()" 
              class="flex-1 bg-eco-700 hover:bg-eco-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
              <i class="fa-solid fa-calculator"></i> Calculate USPS Tier
            </button>
          </div>
        </div>

        <!-- DIMENSION & WEIGHT GUIDELINES NOTICE -->
        <div class="bg-kraft-100 rounded-xl p-5 border border-kraft-200 flex items-start gap-3 text-xs sm:text-sm text-kraft-900">
          <i class="fa-solid fa-circle-info text-kraft-700 text-lg mt-0.5 flex-shrink-0"></i>
          <div>
            <p class="font-bold mb-1">How USPS Cubic Measurement Works</p>
            <p class="text-stone-700 leading-relaxed">
              Cubic rates are based on total box volume (<span class="font-semibold">Length × Width × Height ÷ 1,728</span>) rounded up to the nearest 0.1 cu ft. Boxes up to 20 lbs qualify for huge savings over standard weight-based shipping. Maximum side length is standard 18" (updated to 22" in recent postal revisions).
            </p>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: RESULTS & ELIGIBILITY CARD (5 Cols) -->
      <div class="lg:col-span-5">
        <div class="bg-white rounded-2xl p-6 border border-kraft-200 custom-shadow sticky top-6">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
            <div class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-kraft-200 text-kraft-900 flex items-center justify-center font-bold text-sm">2</span>
              <h2 class="text-lg font-bold text-stone-800">Cubic Calculation Result</h2>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full font-bold bg-eco-100 text-eco-800 flex items-center gap-1">
              <i class="fa-solid fa-check-double"></i> Live
            </span>
          </div>

          <!-- DYNAMIC RESULTS DISPLAY -->
          <div id="results-display">
            
            <!-- MAIN TIER BADGE -->
            <div id="tier-badge-container" class="rounded-2xl p-6 text-center mb-5 bg-gradient-to-br from-eco-800 to-eco-900 text-white shadow-inner relative overflow-hidden">
              <div class="text-xs uppercase font-bold tracking-widest text-eco-200 mb-1">Assigned USPS Cubic Tier</div>
              <div id="result-tier-title" class="text-4xl sm:text-5xl font-black tracking-tight text-kraft-200 my-1">
                Tier 0.3
              </div>
              <div id="result-cu-ft" class="text-sm font-medium text-eco-100 mt-1">
                0.278 cu ft (480.0 cu in)
              </div>

              <!-- Decorative Background Icon -->
              <i class="fa-solid fa-box text-white/5 text-8xl absolute -right-4 -bottom-4 pointer-events-none"></i>
            </div>

            <!-- METRIC DETAILS GRID -->
            <div class="grid grid-cols-3 gap-2 text-center mb-5">
              <div class="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Volume (Cu Ft)</div>
                <div id="metric-cuft" class="text-sm sm:text-base font-extrabold text-stone-800 mt-0.5">0.278</div>
              </div>
              <div class="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Volume (Cu In)</div>
                <div id="metric-cuin" class="text-sm sm:text-base font-extrabold text-stone-800 mt-0.5">480</div>
              </div>
              <div class="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Max Side</div>
                <div id="metric-maxside" class="text-sm sm:text-base font-extrabold text-stone-800 mt-0.5">10.0"</div>
              </div>
            </div>

            <!-- SERVICE ELIGIBILITY STATUSES -->
            <div class="space-y-3 mb-5">
              
              <!-- Priority Mail Cubic -->
              <div id="priority-cubic-card" class="p-3.5 rounded-xl border flex items-center justify-between transition-all bg-emerald-50 border-emerald-200 text-emerald-900">
                <div class="flex items-center gap-3">
                  <div id="priority-cubic-icon" class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    <i class="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <div class="font-bold text-sm">Priority Mail Cubic</div>
                    <div id="priority-cubic-sub" class="text-xs text-emerald-700">Eligible (Tiers 0.1 – 0.5, Max 0.50 cu ft)</div>
                  </div>
                </div>
                <span id="priority-cubic-status" class="text-xs font-extrabold uppercase px-2 py-1 rounded bg-emerald-200 text-emerald-900">Qualified</span>
              </div>

              <!-- Ground Advantage Cubic -->
              <div id="ground-cubic-card" class="p-3.5 rounded-xl border flex items-center justify-between transition-all bg-emerald-50 border-emerald-200 text-emerald-900">
                <div class="flex items-center gap-3">
                  <div id="ground-cubic-icon" class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    <i class="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <div class="font-bold text-sm">Ground Advantage Cubic</div>
                    <div id="ground-cubic-sub" class="text-xs text-emerald-700">Eligible (Tiers 0.1 – 1.0, Max 1.00 cu ft)</div>
                  </div>
                </div>
                <span id="ground-cubic-status" class="text-xs font-extrabold uppercase px-2 py-1 rounded bg-emerald-200 text-emerald-900">Qualified</span>
              </div>

            </div>

            <!-- WARNING / ALERT BANNERS IF ANY -->
            <div id="warning-banner" class="hidden mb-5 p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
              <i class="fa-solid fa-triangle-exclamation text-amber-600 text-base mt-0.5"></i>
              <div id="warning-text">Dimensions exceed standard limits.</div>
            </div>

            <!-- COPY RESULT BUTTON -->
            <button type="button" onclick="copyResultSummary()" 
              class="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-4 rounded-xl border border-stone-300 text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors">
              <i class="fa-regular fa-copy"></i> Copy Carton Summary
            </button>

          </div>
        </div>
      </div>

    </div>

    <!-- TIER REFERENCE CHART SECTION -->
    <section class="mt-12 bg-white rounded-2xl p-6 border border-kraft-200 custom-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-stone-100">
        <div>
          <h2 class="text-xl font-extrabold text-stone-900 flex items-center gap-2">
            <i class="fa-solid fa-table-list text-eco-700"></i>
            USPS Cubic Tier Reference Chart
          </h2>
          <p class="text-xs sm:text-sm text-stone-600 mt-1">
            Click any row in the chart to auto-load sample dimensions into the calculator.
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
          <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Active Selected Tier
        </div>
      </div>

      <!-- TABLE WRAPPER FOR RESPONSIVENESS -->
      <div class="overflow-x-auto rounded-xl border border-stone-200">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
              <th class="py-3.5 px-4">Cubic Tier</th>
              <th class="py-3.5 px-4">Max Cubic Ft</th>
              <th class="py-3.5 px-4">Max Cubic Inches</th>
              <th class="py-3.5 px-4 text-center">Priority Mail Cubic</th>
              <th class="py-3.5 px-4 text-center">Ground Advantage Cubic</th>
              <th class="py-3.5 px-4">Sample Box Outer Size (Inches)</th>
            </tr>
          </thead>
          <tbody id="tier-table-body" class="divide-y divide-stone-200 font-medium text-stone-800">
            <!-- Rows generated dynamically by JS -->
          </tbody>
        </table>
      </div>
    </section>

    <!-- SUSTAINABLE SHIPPING & BOX REUSE GUIDE SECTION -->
    <section class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-white p-6 rounded-2xl border border-kraft-200 custom-shadow">
        <div class="w-10 h-10 rounded-xl bg-eco-100 text-eco-800 flex items-center justify-center text-lg mb-4 font-bold">
          <i class="fa-solid fa-recycle"></i>
        </div>
        <h3 class="font-bold text-stone-900 text-base mb-2">1. Reuse Clean Cardboard</h3>
        <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Reusing sturdy boxes prevents landfill waste and slashes packaging costs. Ensure boxes are rigid, undamaged, and obscure old shipping barcodes or hazardous material markings completely.
        </p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-kraft-200 custom-shadow">
        <div class="w-10 h-10 rounded-xl bg-kraft-100 text-kraft-800 flex items-center justify-center text-lg mb-4 font-bold">
          <i class="fa-solid fa-ruler-combined"></i>
        </div>
        <h3 class="font-bold text-stone-900 text-base mb-2">2. Measure Outer Edges</h3>
        <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Always measure the outermost dimensions of the box after sealing, including any bulge. USPS rounds down fractional sides to the nearest 1/4 inch when measuring cubic rates.
        </p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-kraft-200 custom-shadow">
        <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg mb-4 font-bold">
          <i class="fa-solid fa-piggy-bank"></i>
        </div>
        <h3 class="font-bold text-stone-900 text-base mb-2">3. Pack Heavy Items Smartly</h3>
        <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Cubic rates allow up to 20 lbs in small boxes. Dense products like shea butter, essential oils, books, or jars ship at substantial discounts compared to regular weight-distance zones.
        </p>
      </div>

    </section>

  </main>

  <!-- FOOTER -->
  <footer class="bg-stone-900 text-stone-400 border-t border-stone-800 mt-16 py-8 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-leaf text-eco-400 text-sm"></i>
        <span class="font-bold text-stone-200">Universal Carton Tier Calculator</span>
        <span>— Inspired by Baraka Impact Sustainable Shipping</span>
      </div>
      <div class="text-stone-500">
        Free tool for eco-conscious merchants &amp; shippers.
      </div>
    </div>
  </footer>

  <!-- TOAST NOTIFICATION -->
  <div id="toast" class="fixed bottom-6 right-6 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none z-50">
    <i class="fa-solid fa-circle-check text-eco-400 text-base"></i>
    <span id="toast-msg">Copied to clipboard!</span>
  </div>

  <!-- JAVASCRIPT LOGIC -->
  <script>
    // Global State
    let currentUnit = 'in'; // 'in' or 'cm'

    // Preset Boxes Data (in inches)
    const PRESETS = [
      { name: "Small Mailer", l: 8, w: 6, h: 3, desc: "Tier 0.1" },
      { name: "Medium Box", l: 10, w: 8, h: 6, desc: "Tier 0.3" },
      { name: "Standard Box", l: 12, w: 10, h: 8, desc: "Tier 0.6" },
      { name: "Max Priority", l: 12, w: 12, h: 6, desc: "Tier 0.5" },
      { name: "Max Cubic Box", l: 12, w: 12, h: 12, desc: "Tier 1.0" }
    ];

    // Reference Table Data for Tiers 0.1 to 1.0
    const TIER_DATA = [
      { tier: "0.1", maxCuFt: 0.10, maxCuIn: 172, priority: true, ground: true, sample: "8\" × 6\" × 3.5\"" },
      { tier: "0.2", maxCuFt: 0.20, maxCuIn: 345, priority: true, ground: true, sample: "10\" × 8\" × 4\"" },
      { tier: "0.3", maxCuFt: 0.30, maxCuIn: 518, priority: true, ground: true, sample: "10\" × 8\" × 6\"" },
      { tier: "0.4", maxCuFt: 0.40, maxCuIn: 691, priority: true, ground: true, sample: "12\" × 10\" × 5.5\"" },
      { tier: "0.5", maxCuFt: 0.50, maxCuIn: 864, priority: true, ground: true, sample: "12\" × 12\" × 6\"" },
      { tier: "0.6", maxCuFt: 0.60, maxCuIn: 1036, priority: false, ground: true, sample: "12\" × 10\" × 8.5\"" },
      { tier: "0.7", maxCuFt: 0.70, maxCuIn: 1209, priority: false, ground: true, sample: "14\" × 10\" × 8.5\"" },
      { tier: "0.8", maxCuFt: 0.80, maxCuIn: 1382, priority: false, ground: true, sample: "14\" × 12\" × 8\"" },
      { tier: "0.9", maxCuFt: 0.90, maxCuIn: 1555, priority: false, ground: true, sample: "15\" × 12\" × 8.5\"" },
      { tier: "1.0", maxCuFt: 1.00, maxCuIn: 1728, priority: false, ground: true, sample: "12\" × 12\" × 12\"" },
    ];

    // Initialize Page
    window.addEventListener('DOMContentLoaded', () => {
      renderPresets();
      renderTierTable();
      setupInputListeners();
      calculateTier();
    });

    // Render Preset Buttons
    function renderPresets() {
      const container = document.getElementById('presets-container');
      container.innerHTML = PRESETS.map((p, idx) => `
        <button type="button" onclick="applyPreset(${idx})" 
          class="px-3 py-1.5 bg-stone-100 hover:bg-kraft-100 hover:border-kraft-300 text-stone-700 text-xs font-semibold rounded-lg border border-stone-200 transition-all flex items-center gap-1.5">
          <i class="fa-solid fa-box text-kraft-600"></i>
          <span>${p.name} (${p.l}×${p.w}×${p.h}")</span>
        </button>
      `).join('');
    }

    // Render Tier Reference Chart Table
    function renderTierTable() {
      const tbody = document.getElementById('tier-table-body');
      tbody.innerHTML = TIER_DATA.map((t) => `
        <tr id="tier-row-${t.tier.replace('.', '_')}" onclick="applySampleDimensions('${t.sample}')" 
          class="hover:bg-stone-50 cursor-pointer transition-colors border-b border-stone-200">
          <td class="py-3 px-4 font-bold text-eco-900">Tier ${t.tier}</td>
          <td class="py-3 px-4">${t.maxCuFt.toFixed(2)} cu ft</td>
          <td class="py-3 px-4">${t.maxCuIn.toLocaleString()} cu in</td>
          <td class="py-3 px-4 text-center">
            ${t.priority ? '<span class="text-emerald-600 font-bold"><i class="fa-solid fa-circle-check"></i> Eligible</span>' : '<span class="text-stone-400">—</span>'}
          </td>
          <td class="py-3 px-4 text-center">
            ${t.ground ? '<span class="text-emerald-600 font-bold"><i class="fa-solid fa-circle-check"></i> Eligible</span>' : '<span class="text-stone-400">—</span>'}
          </td>
          <td class="py-3 px-4 text-stone-600 font-mono text-xs">${t.sample}</td>
        </tr>
      `).join('');
    }

    // Set Measurement Unit (in vs cm)
    function setUnit(unit) {
      if (currentUnit === unit) return;

      const lInput = document.getElementById('input-length');
      const wInput = document.getElementById('input-width');
      const hInput = document.getElementById('input-height');

      let l = parseFloat(lInput.value) || 0;
      let w = parseFloat(wInput.value) || 0;
      let h = parseFloat(hInput.value) || 0;

      if (unit === 'cm') {
        // Convert in -> cm
        lInput.value = (l * 2.54).toFixed(1);
        wInput.value = (w * 2.54).toFixed(1);
        hInput.value = (h * 2.54).toFixed(1);
      } else {
        // Convert cm -> in
        lInput.value = (l / 2.54).toFixed(1);
        wInput.value = (w / 2.54).toFixed(1);
        hInput.value = (h / 2.54).toFixed(1);
      }

      currentUnit = unit;

      // Update UI Toggles & Labels
      const inBtn = document.getElementById('unit-in-btn');
      const cmBtn = document.getElementById('unit-cm-btn');

      if (unit === 'in') {
        inBtn.className = "px-3 py-1.5 text-xs font-bold rounded-md transition-all bg-white text-eco-800 shadow-sm";
        cmBtn.className = "px-3 py-1.5 text-xs font-bold rounded-md transition-all text-stone-600 hover:text-stone-900";
      } else {
        cmBtn.className = "px-3 py-1.5 text-xs font-bold rounded-md transition-all bg-white text-eco-800 shadow-sm";
        inBtn.className = "px-3 py-1.5 text-xs font-bold rounded-md transition-all text-stone-600 hover:text-stone-900";
      }

      document.querySelectorAll('.unit-label').forEach(el => {
        el.textContent = unit;
      });

      calculateTier();
    }

    // Apply Preset Dimensions
    function applyPreset(index) {
      const preset = PRESETS[index];
      if (!preset) return;

      if (currentUnit === 'cm') {
        document.getElementById('input-length').value = (preset.l * 2.54).toFixed(1);
        document.getElementById('input-width').value = (preset.w * 2.54).toFixed(1);
        document.getElementById('input-height').value = (preset.h * 2.54).toFixed(1);
      } else {
        document.getElementById('input-length').value = preset.l;
        document.getElementById('input-width').value = preset.w;
        document.getElementById('input-height').value = preset.h;
      }

      calculateTier();
    }

    // Apply Sample Dimensions from Reference Table
    function applySampleDimensions(sampleStr) {
      // e.g., "10\" × 8\" × 6\""
      const numbers = sampleStr.replace(/[^0-9.]/g, ' ').trim().split(/\s+/).map(Number);
      if (numbers.length >= 3) {
        if (currentUnit === 'cm') {
          document.getElementById('input-length').value = (numbers[0] * 2.54).toFixed(1);
          document.getElementById('input-width').value = (numbers[1] * 2.54).toFixed(1);
          document.getElementById('input-height').value = (numbers[2] * 2.54).toFixed(1);
        } else {
          document.getElementById('input-length').value = numbers[0];
          document.getElementById('input-width').value = numbers[1];
          document.getElementById('input-height').value = numbers[2];
        }
        calculateTier();
      }
    }

    // Listeners for real-time calculation as user types
    function setupInputListeners() {
      ['input-length', 'input-width', 'input-height'].forEach(id => {
        document.getElementById(id).addEventListener('input', calculateTier);
      });
    }

    // Reset Calculator
    function resetCalculator() {
      if (currentUnit === 'cm') {
        document.getElementById('input-length').value = "25.4";
        document.getElementById('input-width').value = "20.3";
        document.getElementById('input-height').value = "15.2";
      } else {
        document.getElementById('input-length').value = "10";
        document.getElementById('input-width').value = "8";
        document.getElementById('input-height').value = "6";
      }
      calculateTier();
    }

    // Core Calculation Logic
    function calculateTier() {
      let lVal = parseFloat(document.getElementById('input-length').value) || 0;
      let wVal = parseFloat(document.getElementById('input-width').value) || 0;
      let hVal = parseFloat(document.getElementById('input-height').value) || 0;

      // Convert to inches for standard USPS math if unit is cm
      let lIn = currentUnit === 'cm' ? lVal / 2.54 : lVal;
      let wIn = currentUnit === 'cm' ? wVal / 2.54 : wVal;
      let hIn = currentUnit === 'cm' ? hVal / 2.54 : hVal;

      let maxSideIn = Math.max(lIn, wIn, hIn);
      let cuIn = lIn * wIn * hIn;
      let cuFt = cuIn / 1728;

      // Clear Table Active Row Highlights
      document.querySelectorAll('#tier-table-body tr').forEach(row => {
        row.classList.remove('active-tier-row');
      });

      // Handle Invalid / Zero Input
      if (lIn <= 0 || wIn <= 0 || hIn <= 0) {
        document.getElementById('result-tier-title').textContent = "Enter Dimensions";
        document.getElementById('result-cu-ft').textContent = "Please enter positive values for L, W, and H.";
        document.getElementById('metric-cuft').textContent = "0.00";
        document.getElementById('metric-cuin').textContent = "0";
        document.getElementById('metric-maxside').textContent = "0\"";
        setEligibilityStatus('priority', false, "Invalid dimensions");
        setEligibilityStatus('ground', false, "Invalid dimensions");
        hideWarning();
        return;
      }

      // Compute USPS Cubic Tier: Ceiling to nearest 0.1 (min 0.1)
      let calculatedTierNum = Math.ceil((cuFt - 1e-9) * 10) / 10;
      if (calculatedTierNum < 0.1) calculatedTierNum = 0.1;

      // Update Metrics Readouts
      document.getElementById('metric-cuft').textContent = cuFt.toFixed(3);
      document.getElementById('metric-cuin').textContent = Math.round(cuIn).toLocaleString();
      document.getElementById('metric-maxside').textContent = maxSideIn.toFixed(1) + '"';

      let isExceedingVolume = cuFt > 1.0;
      let isSideOver18 = maxSideIn > 18.0;
      let isSideOver22 = maxSideIn > 22.0;

      // Display Tier Badge
      const tierBadge = document.getElementById('tier-badge-container');
      if (isExceedingVolume) {
        document.getElementById('result-tier-title').textContent = "Over 1.0 cu ft";
        document.getElementById('result-cu-ft').textContent = `${cuFt.toFixed(3)} cu ft (${Math.round(cuIn)} cu in) — Exceeds Cubic Limit`;
        tierBadge.className = "rounded-2xl p-6 text-center mb-5 bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-inner relative overflow-hidden";
      } else {
        let tierStr = calculatedTierNum.toFixed(1);
        document.getElementById('result-tier-title').textContent = `Tier ${tierStr}`;
        document.getElementById('result-cu-ft').textContent = `${cuFt.toFixed(3)} cu ft (${Math.round(cuIn)} cu in)`;
        tierBadge.className = "rounded-2xl p-6 text-center mb-5 bg-gradient-to-br from-eco-800 to-eco-900 text-white shadow-inner relative overflow-hidden";

        // Highlight matching table row
        const matchingRow = document.getElementById(`tier-row-${tierStr.replace('.', '_')}`);
        if (matchingRow) {
          matchingRow.classList.add('active-tier-row');
        }
      }

      // Determine Eligibility for Priority Mail Cubic (Max Tier 0.5 & Max Side 18"/22")
      let priorityEligible = !isExceedingVolume && calculatedTierNum <= 0.5 && !isSideOver18;
      let priorityReason = priorityEligible ? "Eligible (Tiers 0.1 – 0.5, Max 0.50 cu ft)" :
                           (calculatedTierNum > 0.5 ? `Tier ${calculatedTierNum.toFixed(1)} exceeds 0.5 cu ft limit` : "Side exceeds 18\" limit");

      setEligibilityStatus('priority', priorityEligible, priorityReason);

      // Determine Eligibility for Ground Advantage Cubic (Max Tier 1.0 & Max Side 18"/22")
      let groundEligible = !isExceedingVolume && calculatedTierNum <= 1.0 && !isSideOver18;
      let groundReason = groundEligible ? "Eligible (Tiers 0.1 – 1.0, Max 1.00 cu ft)" :
                         (isExceedingVolume ? "Volume exceeds 1.0 cu ft limit" : "Side exceeds 18\" limit");

      setEligibilityStatus('ground', groundEligible, groundReason);

      // Manage Warning Banners
      if (isExceedingVolume || isSideOver18) {
        let warnMsg = "";
        if (isExceedingVolume && isSideOver18) {
          warnMsg = `Carton volume (${cuFt.toFixed(2)} cu ft) exceeds 1.0 cu ft limit AND longest side (${maxSideIn.toFixed(1)}") exceeds 18". Standard dimensional/weight pricing applies.`;
        } else if (isExceedingVolume) {
          warnMsg = `Carton volume (${cuFt.toFixed(2)} cu ft) exceeds 1.0 cu ft cubic limit. Requires standard weight/dimensional rates.`;
        } else if (isSideOver22) {
          warnMsg = `Longest side (${maxSideIn.toFixed(1)}") exceeds maximum 22" limit. Not eligible for cubic rates.`;
        } else {
          warnMsg = `Longest side (${maxSideIn.toFixed(1)}") exceeds standard 18" threshold. (Note: USPS updated max side allowance to 22" under July 2026 guidelines).`;
        }
        showWarning(warnMsg);
      } else {
        hideWarning();
      }
    }

    // Helper to toggle eligibility card styles
    function setEligibilityStatus(service, eligible, subtext) {
      const card = document.getElementById(`${service}-cubic-card`);
      const icon = document.getElementById(`${service}-cubic-icon`);
      const sub = document.getElementById(`${service}-cubic-sub`);
      const status = document.getElementById(`${service}-cubic-status`);

      sub.textContent = subtext;

      if (eligible) {
        card.className = "p-3.5 rounded-xl border flex items-center justify-between transition-all bg-emerald-50 border-emerald-200 text-emerald-900";
        icon.className = "w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold";
        icon.innerHTML = '<i class="fa-solid fa-check"></i>';
        status.className = "text-xs font-extrabold uppercase px-2 py-1 rounded bg-emerald-200 text-emerald-900";
        status.textContent = "Qualified";
      } else {
        card.className = "p-3.5 rounded-xl border flex items-center justify-between transition-all bg-stone-100 border-stone-200 text-stone-500 opacity-80";
        icon.className = "w-7 h-7 rounded-full bg-stone-300 text-stone-600 flex items-center justify-center text-xs font-bold";
        icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        status.className = "text-xs font-extrabold uppercase px-2 py-1 rounded bg-stone-200 text-stone-600";
        status.textContent = "Ineligible";
      }
    }

    function showWarning(msg) {
      const banner = document.getElementById('warning-banner');
      document.getElementById('warning-text').textContent = msg;
      banner.classList.remove('hidden');
    }

    function hideWarning() {
      document.getElementById('warning-banner').classList.add('hidden');
    }

    // Copy Result Summary to Clipboard
    function copyResultSummary() {
      let lVal = document.getElementById('input-length').value;
      let wVal = document.getElementById('input-width').value;
      let hVal = document.getElementById('input-height').value;
      let tierTitle = document.getElementById('result-tier-title').textContent.trim();
      let cuFt = document.getElementById('metric-cuft').textContent;
      let cuIn = document.getElementById('metric-cuin').textContent;
      let maxSide = document.getElementById('metric-maxside').textContent;

      let summaryText = `📦 USPS Carton Tier Summary\n` +
                        `Dimensions: ${lVal} × ${wVal} × ${hVal} ${currentUnit}\n` +
                        `Volume: ${cuFt} cu ft (${cuIn} cu in)\n` +
                        `Longest Side: ${maxSide}\n` +
                        `USPS Tier: ${tierTitle}\n` +
                        `Calculated via Universal Carton Tier Calculator (Baraka Impact Guide)`;

      // Fallback copy execution for iframe compatibility
      const textarea = document.createElement('textarea');
      textarea.value = summaryText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        showToast("Summary copied to clipboard!");
      } catch (err) {
        showToast("Failed to copy. Please manually select summary.");
      } finally {
        document.body.removeChild(textarea);
      }
    }

    // Toast Notification helper
    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toast-msg').textContent = msg;
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }
  </script>
</body>
</html>
