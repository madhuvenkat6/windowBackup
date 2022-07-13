const flat = [
    { id: 'a2', name: 'Item 1', parentId: 'a' },
    { id: 'b2-2-1', name: 'Item 2-2-1', parentId: 'b2-2'},
    { id: 'a1', name: 'Item 1', parentId: 'a' },
    { id: 'a', name: 'Root 1', parentId: null },
    { id: 'b', name: 'Root 2', parentId: null },
    { id: 'c', name: 'Root 3', parentId: null },
    { id: 'b1', name: 'Item 1', parentId: 'b' },
    { id: 'b2', name: 'Item 2', parentId: 'b' },
    { id: 'b2-1', name: 'Item 2-1', parentId: 'b2' },
    { id: 'b2-2', name: 'Item 2-2', parentId: 'b2' },
    { id: 'b3', name: 'Item 3', parentId: 'b' },
    { id: 'c1', name: 'Item 1', parentId: 'c' },
    { id: 'c2', name: 'Item 2', parentId: 'c' }
];

function checkLeftOvers(leftOvers, possibleParent){
  for (let i = 0; i < leftOvers.length; i++) {
    if(leftOvers[i].parentId === possibleParent.id) {
      delete leftOvers[i].parentId
      possibleParent.children ? possibleParent.children.push(leftOvers[i]) : possibleParent.children = [leftOvers[i]]
      possibleParent.count = possibleParent.children.length
      const addedObj = leftOvers.splice(i, 1)
      checkLeftOvers(leftOvers, addedObj[0])
    }
  }
}

function findParent(possibleParents, possibleChild) {
  let found = false
  for (let i = 0; i < possibleParents.length; i++) {
    if(possibleParents[i].id === possibleChild.parentId) {
      found = true
      delete possibleChild.parentId
      if(possibleParents[i].children) possibleParents[i].children.push(possibleChild)
      else possibleParents[i].children = [possibleChild]
      possibleParents[i].count = possibleParents[i].children.length
      return true
    } else if (possibleParents[i].children) found = findParent(possibleParents[i].children, possibleChild)
  } 
  return found;
}
 
 const nested = flat.reduce((initial, value, index, original) => {
   if (value.parentId === null) {
     if (initial.left.length) checkLeftOvers(initial.left, value)
     delete value.parentId
     value.root = true;
     initial.nested.push(value)
   }
   else {
      let parentFound = findParent(initial.nested, value)
      if (parentFound) checkLeftOvers(initial.left, value)
      else initial.left.push(value)
   }
   return index < original.length - 1 ? initial : initial.nested
 }, {nested: [], left: []})
 
console.log(nested)