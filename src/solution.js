// Please implement your solution in this file

const filter = (data, path, filterFn) => {
  return data.filter(obj => {
    const propValue = extractPropValue(obj, path);
    return filterFn(propValue);
  });
}

const immutableSort = (data, path) => {
  return [...data].sort((a, b) => {
    const aValue = extractPropValue(a, path);
    const bValue = extractPropValue(b, path);
    if ((aValue.length || aValue) < (bValue.length || bValue)) {
      return 1;
    }
    if ((aValue.length || aValue) > (bValue.length || bValue)) {
      return -1;
    }
    return 0;
  });
}

const map = (data) => {
  return data.map(({ flight_number, mission_name, rocket }) => {
    const payloads_count = extractPropValue(rocket, 'second_stage:payloads').length;
    return {
      flight_number,
      mission_name,
      payloads_count
    }
  });
}

const extractPropValue = (obj, path) => {
  return path.split(':').reduce((obj, field) => {
    if (!obj[field]) {
      throw new Error(`Unknown path parameter "${field}" in "${path}"`);
    }
    return obj[field];
  }, obj);
}

function prepareData(data, year = 2018, customer = 'NASA') {
  data = filter(data, 'launch_year', (launchYear) => launchYear === String(year));
  data = filter(data, 'rocket:second_stage:payloads', (payloads) => {
    return payloads.some(({ customers }) => customers.some(c => c.indexOf(customer) !== -1));
  });
  data = immutableSort(data, 'flight_number', false);
  data = immutableSort(data, 'rocket:second_stage:payloads', false);
  return map(data);
}

function renderData(data) {
  document.getElementById("out").innerHTML = JSON.stringify(data, null, 2);
}

module.exports = {
  prepareData,
  renderData
};
