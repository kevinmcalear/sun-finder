const data = [
    {
        "id": 1,
        "location": "Bordeaux, France",
        "latitude": 44.84044,
        "longitude": -0.5805,
        "sunrise": "2019-02-25T06:46:15.000Z",
        "sunset": "2019-02-25T17:44:23.000Z"
    },
    {
        "id": 2,
        "location": "Camden, Arkansas",
        "latitude": 33.5845581,
        "longitude": -92.8343294,
        "sunrise": "2019-02-25T12:43:45.000Z",
        "sunset": "2019-02-26T00:04:49.000Z"
    },
    {
        "id": 3,
        "location": "Manila, Philippines",
        "latitude": 14.5995124,
        "longitude": 120.9842195,
        "sunrise": "2019-02-24T22:15:01.000Z",
        "sunset": "2019-02-25T10:03:11.000Z"
    },
    {
        "id": 4,
        "location": "Hamilton, New York",
        "latitude": 43.685499,
        "longitude": -74.331628,
        "sunrise": "2019-02-25T11:39:35.000Z",
        "sunset": "2019-02-25T22:40:59.000Z"
    },
    {
        "id": 5,
        "location": "Stuttgart, Germany",
        "latitude": 48.775447,
        "longitude": 9.184663,
        "sunrise": "2019-02-25T06:12:11.000Z",
        "sunset": "2019-02-25T17:00:19.000Z"
    },
    {
        "id": 6,
        "location": "Toledo, Ohio",
        "latitude": 41.656431,
        "longitude": -83.586351,
        "sunrise": "2019-02-25T12:14:22.000Z",
        "sunset": "2019-02-25T23:20:13.000Z"
    },
    {
        "id": 7,
        "location": "Wetzlar, Germany",
        "latitude": 50.550908,
        "longitude": 8.503875,
        "sunrise": "2019-02-25T06:17:24.000Z",
        "sunset": "2019-02-25T17:00:33.000Z"
    },
    {
        "id": 8,
        "location": "Oslo, Norway",
        "latitude": 59.9138688,
        "longitude": 10.7522454,
        "sunrise": "2019-02-25T06:25:42.000Z",
        "sunset": "2019-02-25T16:34:16.000Z"
    },
    {
        "id": 9,
        "location": "Orlando, Florida",
        "latitude": 28.5383355,
        "longitude": -81.3792365,
        "sunrise": "2019-02-25T11:53:54.000Z",
        "sunset": "2019-02-25T23:23:03.000Z"
    },
    {
        "id": 10,
        "location": "Queenstown, New Zealand",
        "latitude": -45.028489,
        "longitude": 168.663096,
        "sunrise": "2019-02-24T18:16:38.000Z",
        "sunset": "2019-02-25T07:40:11.000Z"
    }
]


const createTableRow = (data) => {
  return `<tr>
    <td>${data.id}</td>
    <td>${data.location}</td>
    <td>${data.latitude}</td>
    <td>${data.longitude}</td>
    <td>${new Date(data.sunrise).toLocaleString()}</td>
    <td>${new Date(data.sunset).toLocaleString()}</td>
  </tr>`
}

const searchBox = document.querySelector('input');
searchBox.addEventListener('keyup', (event)  => {
  const filteredData = filterData(data, event.target.value);
  renderTable(filteredData);
});

const tableHeader = document.querySelector('thead');
tableHeader.addEventListener('click', (event) => {
  if (event.target.tagName === 'TH') {
    const oldSortedIcon = document.querySelector('.sorted');
    oldSortedIcon.remove();

    const sortedIcon = document.createElement('div');
    sortedIcon.classList.add('sorted');
    sortedIcon.innerText = '🔽';
    event.target.append(sortedIcon)

    const filteredData = filterData(data, searchBox.value);
    const filteredAndSortedData = sortData(filteredData, event.target.dataset.column);
    renderTable(filteredAndSortedData);

  }
})

const tableBody = document.querySelector('tbody');
tableBody.addEventListener('focusout', event => {
  if (event.target.tagName === 'INPUT') {
    const inputBox = event.target;
    const tableCell = inputBox.parentElement;
    // send data to api via fetch using (inputBox.value)
    tableCell.innerHTML = inputBox.value;
  }
})
tableBody.addEventListener('click', event => {
  switch(event.target.tagName) {
    case 'TD':
    const tableCell = event.target;

    // inputBox = document.createElement('input');
    // inputBox.classList.add('edit');
    // inputBox.value = tableCell.innerText;

    const inputBox = `<input class="edit" type="text" value="${tableCell.innerText}" />`
    tableCell.innerHTML = inputBox;
    tableCell.children[0].focus();

    break;

    case 'INPUT':
    break;
  }
})



const renderTable = (data) => {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  data.forEach(rowData => {
    tableBody.innerHTML += createTableRow(rowData)
  })
}


const filterData = (data = [], searchTerm = '') => {
  return data.filter(rowData => {
    return rowData.location.toLowerCase().includes(searchTerm)
  })
}

const sortData = (data = [] , columnName = 'id') => {
  return data.sort((currentRowData, nextRowData) => {
    if (currentRowData[columnName] < nextRowData[columnName])
      return -1;
    if (currentRowData[columnName] > nextRowData[columnName])
      return 1;
    return 0;
  });
}

renderTable(data)
