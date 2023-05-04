public with sharing class insertContactApexWeb {
   
    @AuraEnabled
    public static void saveContactRecord(Contact con){
        System.debug('acc--'+con);
        try{
            insert con;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}