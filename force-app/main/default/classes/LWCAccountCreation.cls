public with sharing class LWCAccountCreation {
        @AuraEnabled
        public static string acct(string n)
        {
            Account a = new Account(name = n);
            insert a;
            if(a.id != Null)
            {
                return 'Success';
            }
            else
            {
                return 'error';
            }
        }
    }