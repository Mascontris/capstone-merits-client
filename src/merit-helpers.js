export const findHousehold = (households=[], name) => {
 return (!households || !name)
  ? households
  : households.find(household => household.name === name)
}

export const getKidsForHousehold = (kids=[], id) => (
 (!id)
  ? kids 
  : kids.filter(kid => kid.household_id === parseInt(id))
)

export const findKid = (kids=[], kidId) => (
(!kidId)
  ? kids
  : kids.find(kid => kid.id === parseInt(kidId))
 )

export const getActionsForKid = (actions=[], kidId) => (
 (!kidId)
  ? actions
  : actions.filter(action => action.kid_id === parseInt(kidId.id))
 )

export const countKidsForHousehold = (notes=[], folderId) =>  
notes.filter(note => note.folderId === folderId).length

export const calculateCurrentStars = (actionList=[]) => {
  let currentStars = 0

  actionList.forEach(action => {
    if(action.polarity){
      currentStars += 1
    } else { 
      currentStars -= 1
    }
  })
  return currentStars
}