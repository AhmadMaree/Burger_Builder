
export const updateObject = (oldObject , updateProp) => {

      return {
            ...oldObject ,   
            ...updateProp
      }  
}

export const checkValidation = (value,rules) => {
      let isValid = true ; 

      if(rules.required) {

          isValid = value.trim() !== '' && isValid ;
      }

      if(rules.maxlen) {
              isValid = value.length <= rules.maxlen && isValid;
      }

      if(rules.minlen) {
          isValid = value.length >= rules.minlen && isValid;

      }
      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid;
      }
      
      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid;
      }
          return isValid ;
  }