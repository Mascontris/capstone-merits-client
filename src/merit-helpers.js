console.log("merit-helpers.js loaded")

export const findHousehold = (households=[], loggedInHousehold) => (
 (!loggedInHousehold)
  ? households
  : households.find(household => household.id === loggedInHousehold)
)

export const getKidsForHousehold = (kids=[], loggedInHousehold) => (
 (!loggedInHousehold)
  ? kids 
  : kids.filter(kid => kid.household_id === loggedInHousehold)
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
