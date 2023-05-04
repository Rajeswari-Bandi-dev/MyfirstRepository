public with sharing class ContactApexController {

    @AuraEnabled
    public static Contact insertContactMethod(Contact contactObj) {
    try {
            insert contactObj;
            return contactObj;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }
}