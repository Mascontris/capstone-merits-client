console.log("merit-helpers.js loaded")

// export const findHousehold = (households=[], id) => {
//  return (!households || !id)
//   ? households
//   : households.find(household => household.id == id)
// }

export const getKidsForHousehold = (kids=[], id) => (
 (!id)
  ? kids 
  : kids.filter(kid => kid.household_id == id)
)

export const findKid = (kids=[], KidName) => (
(!KidName)
  ? kids
  : kids.find(kid => kid.name === KidName)
 )

export const getActionsForKid = (actions=[], kidId) => (
 (!kidId)
  ? actions
  : actions.filter(action => action.kid_id === kidId.id)
 )

export const countKidsForHousehold = (notes=[], folderId) =>  
notes.filter(note => note.folderId === folderId).length
