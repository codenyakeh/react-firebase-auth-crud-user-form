export const dispatchUser = (myUser)=>{
    return {
      type: 'SET_User',
      payload:myUser
    }
  }