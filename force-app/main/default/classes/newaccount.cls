public with sharing class newaccount {

    public class contwrapper {
        @AuraEnabled public String Id;
        @AuraEnabled public String Name;
        @AuraEnabled public String AccountName;
        @AuraEnabled public String Title;
        @AuraEnabled public String Email;
        @AuraEnabled public String Phone;
    }

    @AuraEnabled(cacheable=true)
    public static List<contwrapper> getconct( String searchKey, String sortBy, String sortDirection) {

        String query = 'SELECT Id,Name,Account.Name,Title,Email,Phone FROM Contact';
        
        system.debug('query---'+query);

        if ( searchKey != null && searchKey != '' ) {

            String key = '%' + searchKey + '%';

            query += ' WHERE Name LIKE :key';
        }
 
        if ( sortBy != null && sortDirection != null ) {

            query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
 
        query = query + ' LIMIT 200';

        List<Contact> conlist = (List<contact>) Database.query( query );
        List<contwrapper> wraplist = new List<contwrapper>();
        for(Contact con: conlist)
        {
            contwrapper cw = new contwrapper();
            cw.Name = con.Name;
            cw.AccountName = con.Account.Name;
            cw.Title = con.Title;
            cw.Email = con.Email;
            cw.Phone = con.Phone;
            wraplist.add(cw);
        }
        return wraplist;
        
    }
}