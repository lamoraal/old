// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
//function to validate the credit card array of numbers to the Luhn algorithm
function validateCred(arrCred) {
    //inititate the sum of the creditcard digits
    let sumCred = 0;
    //every other digit needs to be doubled, the last digit does NOT te be doubled, the next one is, the next one is NOT,...
    //so let's get a boolean to take care of that for us
    let toDouble = false;

    //loop through the credit card digits, from back to front
    //as the length of the array is one number higher than the index of the last number, that's what we're using to start our iteration
    for (i=arrCred.length-1;i>=0;i--) {
        //every other digit should NOT be doubled, that's why we use this boolean
        if (toDouble) {
            //every other digits need to be doubled and added to sumCred
            sumCred+=arrCred[i]*2;
            //console.log('we add :' + arrCred[i]*2);
            //if the doubling of the digit is greater than 9, we subtract 9
            if (arrCred[i]*2>9) {
                //console.log('we subtract 9');
                sumCred-=9;
            }
        }            
        else {
            //if it not a digit to be doubled, we add it to sumCred
            sumCred+=arrCred[i];
        }
        //every iteration, we must change whether the next digit must be doubled or not
        toDouble = !toDouble;
        //console.log('what is sumCred: ' + sumCred);
    }

    //now that we've added all the digits, we check if the remainder of the division by 10 is 0. 
    if (sumCred%10===0) {
        //if it's 0 then the credit card is valid and we return true
        return true;
    } else {
        //otherwise it's invalid and we return false
        return false;
    }
}

function findInvalidCards(arrCards) {
    //filter the array of cards, to only add the invalid credit cards
    return arrCards.filter(card => validateCred(card)===false);
}

function idInvalidCardCompanies(arrInvalidCards) {
    //create empty array of invalid companies
    const arrInvalidCompanies = [];
    //create an array of companies for later us
    //const arrCompanies = ['Amex (American Express)','Visa','MasterCard','Discover'];
    const arrObjeCompanies = [{id:3,name:'Amex (American Express)'},{id:4,name:'Visa'},{id:5,name:'MasterCard'},{id:6,name:'Discover'}];

    //loop through the array of invalid cards to add the companies to the list of companies with invalid credit cards
    arrInvalidCards.forEach(invalid => {  
        
        //get the company object from the array of companies that has the id that corresponds to the first digit
        const result = arrObjeCompanies.filter((comp) => comp.id === invalid[0])
    
        //check if it has not already been added, if not add
        if (!arrInvalidCompanies.includes(result[0].name)) {
            arrInvalidCompanies.push(result[0].name)
        }

        
    })

    return arrInvalidCompanies;
}


console.log(idInvalidCardCompanies(findInvalidCards(batch)));
