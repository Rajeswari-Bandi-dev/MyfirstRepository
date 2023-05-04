public with sharing class CustomComp {

    @AuraEnabled(cacheable=true)
    public static List<sObject> getChilds(String recordId,String payload) {

     String childObjectName = '';
     String parentField = '';
     String fields = '';
     String query = '';

     //Spliting the payload coming from lwc properties. 
     childObjectName = payload.split('-')[0];
     parentField = payload.split('-')[1];
     fields = payload.split('-')[3];
 
     //Null check for incoming field values.
     if( String.isBlank(childObjectName) || String.isBlank(parentField)){
         throw new AuraHandledException('Child Object or Parent Relationship Field is missing.');
     }
     else{      
         if(!String.isBlank(fields)){ 
           query = 'Select id,Name,' + fields + ' FROM ' + childObjectName + ' Where ' + parentField + ' = \'' + recordId + '\'';
        }     
        else{
            query = 'Select id,Name' + ' FROM ' + childObjectName + ' Where ' + parentField + ' = \'' + recordId + '\'';
         }
     }
        return Database.query( query );
    }

}