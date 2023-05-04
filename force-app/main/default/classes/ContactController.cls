public class ContactController {
    @AuraEnabled (cacheable=true)
    public static List<account> ContactController() {
        List<Account> acc=[select id,name from Account limit 5];
        return acc;
    }
}