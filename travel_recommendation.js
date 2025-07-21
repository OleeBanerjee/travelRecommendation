document.getElementById('btnSearch').addEventListener('click', function () {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let results = [];
  
        if (['beach', 'beaches'].includes(keyword)) {
          results = data.beaches;
        } else if (['temple', 'temples'].includes(keyword)) {
          results = data.temples;
        } else if (['country', 'countries'].includes(keyword)) {
          results = data.countries.flatMap(country => country.cities);
        }
  
        if (results.length === 0) {
          resultsContainer.innerHTML = `<p>No results found.</p>`;
        } else {
          results.forEach(item => {
            const card = document.createElement('div');
            card.innerHTML = `
              <h2>${item.name}</h2>
              <img src="${item.imageUrl}" alt="${item.name}" width="300">
              <p>${item.description}</p>
            `;
            resultsContainer.appendChild(card);
          });
        }
      });
  });

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}
  
document.getElementById('btnClear').addEventListener('click', clearSearch);