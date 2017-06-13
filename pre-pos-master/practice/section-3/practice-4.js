'use strict';

function AnalyseElement(element) {
  let refactor = ['key', 0];
  if (element.match('-')) {
    refactor[0] = element.split('-')[0];
    refactor[1] = element.split('-')[1];
  }
  else if (element.match(':')) {
    refactor[0] = element.split(':')[0];
    refactor[1] = element.split(':')[1];
  }
  else if (element.match(/\[/)) {
    refactor[0] = element.split(/\[/)[0];
    refactor[1] = element.split(/\[/)[1].split(/\]/)[0];
  }
  else {
    refactor[0] = element;
    refactor[1] = 1;
  }
  refactor[1] = Number(refactor[1]);

  return refactor;
}

function countSameElements(collection) {
  let ret = [];

  collection.forEach(function (e) {
    let refactor = AnalyseElement(e);
    let pos = ret.findIndex(function (f) {
      refactor = AnalyseElement(e);
      return f.key === refactor[0];
    });

    if (pos === -1) {
      ret.push({key: refactor[0], count: refactor[1]});
    } else {
      ret[pos].count += refactor[1];
    }
  });

  return ret;
}

function createUpdatedCollection(collectionA, objectB) {
  let collectionCount = countSameElements(collectionA);

  objectB.value.forEach(function (e) {
    collectionCount.forEach(function (f) {
      if (f.key === e) {
        f.count -= Math.floor(f.count / 3);
      }
    })
  });

  return collectionCount;
}
