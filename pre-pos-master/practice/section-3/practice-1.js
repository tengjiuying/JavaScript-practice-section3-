'use strict';

function createUpdatedCollection(collectionA, objectB) {
  let collection=collectionA;

  objectB.value.forEach(function (e) {
    collectionA.forEach(function (f) {
      if(f.key === e){
        f.count--;
      }
    })
  })
  return collection;
}
