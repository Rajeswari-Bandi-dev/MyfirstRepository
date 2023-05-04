public class contactListCtrl {
    @AuraEnabled(cacheable=true)
    public static List<Contact>getConList() {
        List<Contact> conList = [select id, lastname from contact limit 10];
        return conList;
    }
}