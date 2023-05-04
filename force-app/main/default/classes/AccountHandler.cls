//public with sharing class LWCAccountCreation {
    // public LWCAccountCreation() {
        //@AuraEnabled
        //public static string acct(string n)
        //{
         //   Account a = new Account(name='Acme');
          //  insert a;
          ///  if(a.Id != Null)
          //  {
           //     return 'Success';
           // }
           //// else
            //{
            //    return 'error';
            //}
      //  }
  //  }

    // }
// }
public class AccountHandler {



   public static Account insertNewAccount (String accName){ 

   if(accName!=''){    
       try{
           Account a = new Account(Name=accName);
           insert a;
           System.debug('Bravo User5633! Account created');
           return a;
       } catch(Exception e){
           System.Debug('Account not created');
           return null;
       }
   } else {
       return null;
   }

}    


}