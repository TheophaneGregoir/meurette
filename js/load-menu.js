fetch('data/menu.json')
  .then(response => response.json())
  .then(data => {
    const platList = document.getElementById('plat-list');
    const accList = document.getElementById('accompagnement-list');
    const topList = document.getElementById('topping-list');
    if (platList) {
      platList.innerHTML = '';
      data.plats.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        platList.appendChild(li);
      });
    }
    if (accList) {
      accList.innerHTML = '';
      data.accompagnements.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        accList.appendChild(li);
      });
    }
    if (topList) {
      topList.innerHTML = '';
      data.toppings.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        topList.appendChild(li);
      });
    }
  })
  .catch(err => {
    console.error('Error loading menu', err);
  });

