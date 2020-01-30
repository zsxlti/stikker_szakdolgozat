export abstract class Validation
{
    public static IsEmail = (input: string) : boolean =>
    {
        const emailRegEx:RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailRegEx.test(input)
    }

    public static IsPhoneNumber = (input: string) : boolean =>
    {
        const phoneRegEx:RegExp = new RegExp(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/);
        return phoneRegEx.test(input);
    }

    public static validatecardnumber = (cardnumber: string): ICreditCardValidationResult =>
    {
        // Strip spaces and dashes
        const creditCardNumber: string = cardnumber.replace(/[ -]/g, '');
        // See if the card is valid
        // The regex will capture the number in one of the capturing groups
        const match: RegExpExecArray | null = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9][0-9])[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35\d{3})\d{11}))$/.exec(creditCardNumber);

        let result: ICreditCardValidationResult =
        {
            IsValid: false,
            Type: '',
            Number: Number(creditCardNumber),
            FormatedNumber: cardnumber,
            Message: 'Invalid card number'
        }

        if (match)
        {
          // List of card types, in the same order as the regex capturing groups
          const types: string[] = ['Visa', 'MasterCard', 'Discover', 'American Express', 'Diners Club', 'JCB'];
          // Find the capturing group that matched
          // Skip the zeroth element of the match array (the overall match)
          for (let i = 1; i < match.length; i++)
          {
            if (match[i])
            {
              // Display the card type for that group
              result =
              {
                  IsValid: true,
                  Type: types[i - 1],
                  Number: Number(creditCardNumber),
                  FormatedNumber: cardnumber,
                  Message: 'Valid card number'
              }
            }
          }
        }

        return result;
    }
}

export default interface ICreditCardValidationResult
{
    IsValid: boolean;
    Type: string;
    Number?: number
    FormatedNumber?: string;
    Message: string;
}