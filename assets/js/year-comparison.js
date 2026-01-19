// Year comparison tool
(function() {
  const year1Select = document.getElementById('year1-select');
  const year2Select = document.getElementById('year2-select');
  const resultsContainer = document.getElementById('comparison-results');

  if (!year1Select || !year2Select || !resultsContainer) return;

  // Get sorted years (newest first)
  const years = Object.keys(platformData).sort().reverse();

  // Populate select dropdowns
  function populateSelects() {
    years.forEach(function(year, index) {
      const option1 = new Option(year, year, index === 0, index === 0);
      const option2 = new Option(year, year, index === 1, index === 1);
      year1Select.add(option1);
      year2Select.add(option2);
    });
  }

  // Get component value from year data
  function getComponentValue(yearData, categoryId, itemId) {
    if (!yearData) return null;

    let section;
    if (categoryId === 'components') {
      section = yearData.components;
    } else {
      section = yearData[categoryId];
    }

    if (!section || !section[itemId]) return null;
    return section[itemId].version || null;
  }

  // Find differences between two years
  function findDifferences(year1, year2) {
    const data1 = platformData[year1];
    const data2 = platformData[year2];
    const diffs = [];

    componentMeta.categories.forEach(function(category) {
      category.items.forEach(function(item) {
        const val1 = getComponentValue(data1, category.id, item.id);
        const val2 = getComponentValue(data2, category.id, item.id);

        // Normalize for comparison
        const str1 = val1 || '';
        const str2 = val2 || '';

        if (str1 !== str2) {
          diffs.push({
            category: category.name,
            categoryId: category.id,
            component: item.name,
            componentId: item.id,
            value1: val1 || '\u2014',
            value2: val2 || '\u2014',
            type: getDiffType(val1, val2)
          });
        }
      });
    });

    return diffs;
  }

  // Determine diff type
  function getDiffType(val1, val2) {
    if (!val1) return 'added';
    if (!val2) return 'removed';
    return 'changed';
  }

  // Render comparison results
  function renderResults(year1, year2, differences) {
    if (differences.length === 0) {
      resultsContainer.innerHTML = '<div class="p-8 text-center text-gray-500 dark:text-gray-400">No differences found between ' + year1 + ' and ' + year2 + '</div>';
      return;
    }

    let html = '<div class="overflow-x-auto"><table class="platform-table"><thead><tr>';
    html += '<th class="text-left">Category</th>';
    html += '<th class="text-left">Component</th>';
    html += '<th>' + year1 + '</th>';
    html += '<th>' + year2 + '</th>';
    html += '</tr></thead><tbody>';

    let currentCategory = '';
    let categoryCount = {};

    // Count items per category for rowspan
    differences.forEach(function(diff) {
      categoryCount[diff.category] = (categoryCount[diff.category] || 0) + 1;
    });

    differences.forEach(function(diff) {
      const rowClass = 'diff-' + diff.type;
      let categoryCell = '';

      if (diff.category !== currentCategory) {
        categoryCell = '<td class="category-' + diff.categoryId + ' font-semibold align-middle" rowspan="' + categoryCount[diff.category] + '">' + diff.category + '</td>';
        currentCategory = diff.category;
      }

      html += '<tr class="' + rowClass + '">';
      html += categoryCell;
      html += '<td class="text-left">' + diff.component + '</td>';
      html += '<td class="font-mono text-sm">' + diff.value1 + '</td>';
      html += '<td class="font-mono text-sm">' + diff.value2 + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table></div>';

    // Summary
    html += '<div class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">';
    html += '<p class="text-sm text-gray-600 dark:text-gray-400">';
    html += '<strong>' + differences.length + '</strong> difference' + (differences.length === 1 ? '' : 's') + ' found between ' + year1 + ' and ' + year2;
    html += '</p></div>';

    resultsContainer.innerHTML = html;
  }

  // Compare function
  function compare() {
    const year1 = year1Select.value;
    const year2 = year2Select.value;

    if (!year1 || !year2) return;

    const differences = findDifferences(year1, year2);
    renderResults(year1, year2, differences);
  }

  // Initialize
  populateSelects();
  compare();

  // Event listeners
  year1Select.addEventListener('change', compare);
  year2Select.addEventListener('change', compare);
})();
