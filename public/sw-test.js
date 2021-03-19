const sec = 1000;
const min = 60 * sec;
const hour = 60 * min;

// how often should the data be checked
const refreshRate = 10 * sec;

// current data
let data = null;

function loadData() {
  let search = location.search.substring(1);
  // let json = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  let url = location.origin + '/api/offers' + location.search;
  try {
    fetch(url)
      .then(response => response.json())
      .then(data => checkData(data));
  } catch (err) {}
}

function checkData(resData) {
  if (data == null && resData.length > 0) {
    data = resData;
    return;
  }

  let newCategorie = data.length < resData;
  let offersChangesCount = 0;
  let cathegorieOffersAdded = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < resData.length; j++) {
      if (resData[j].name == data[i].name) {
        if (resData[j].offers.length > data[i].offers.length) {
          cathegorieOffersAdded.push(resData[j].name);
          offersChangesCount += resData[j].offers.length - data[i].offers.length;
        }
      }
    }
  }
  data = resData;
  if (newCategorie) {
    sendMessage('Neue Kategorien', 'Es sind neue Kategorien auf der Resultateseite hinzugekommen.');
  } else if (offersChangesCount > 0) {
    sendMessage(
      'Mindestens ' + offersChangesCount + ' neue Förderprogramme',
      'In den Kategorien ' + cathegorieOffersAdded.join(),
    );
  }
}

function sendMessage(title, message) {
  let title = title;
  let body = message;
  let icon = '/images/icon-192x192.png';
  let tag = 'change' + new Date().now;
  let data = {
    doge: {
      wow: 'such amaze notification data',
    },
  };
  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    tag: tag + i,
    data: data,
  });
}

// ----------------------------------------------
self.addEventListener('install', function(event) {
  console.log('Worker installed successfully', event);
});
self.addEventListener('activate', function(event) {
  console.log('Worker activated successfully', event);
  let i = 0;
  let interval = setInterval(() => {
    loadData();
    if (i++ >= 5) {
      clearInterval(interval);
    }
  }, refreshRate);
});
