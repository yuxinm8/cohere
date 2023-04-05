export const checkCriteria = (symptom, criteria) => {
    
    // iterate over the keys in the criteria object
    for (const key in criteria) {
      // check if the symptom object has the same key and value as the criteria object
        if (symptom.hasOwnProperty(key)) {
            const symptomValue = symptom[key];
            const criteriaValue = criteria[key];
        
            // check if the values are equivalent (true/false)
            if ((symptomValue === true && criteriaValue === true) || (symptomValue === false && criteriaValue === false)) {
                return true; // return true if equivalent
            }
            
            // check if the symptom value is greater than the criteria value (if both are numbers)
            if (typeof symptomValue === 'number' && typeof criteriaValue === 'number' && symptomValue >= criteriaValue) {
                return true; // return true if symptom value is greater
            }
        }
       
    }
    // if no match is found, return false to indicate that the criteria is not met
    return false;
};
  