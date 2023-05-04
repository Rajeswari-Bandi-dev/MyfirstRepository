//trigger HelloWorldTrigger on Account (before insert) {
  //  for(Account a : Trigger.new) {
    //    a.Description = 'New description';
    //}   
//}

trigger HelloWorldTrigger on Account (before insert) {
 List<Account> dup = new List<Account>();
 dup = [Select id, Name,Description from Account];
 for(Account a:Trigger.New){
 for(Account a1:dup){
 if(a.Description==a1.Description || a.Name==a1.Name ){
 a.Description.addError('Name already Exist ');
 }
 }
 }   
 }

//trigger AccountTrigger on Account (before insert, before update) {
   //    List<Account> lst = [Select id, name from Account];
 //       for(Account acc:lst){
     //       for(Account accnew: Trigger.New){
   //             if(acc.Name == accnew.Name && acc.Id!= accnew.Id){
        //            acc1.addError('Duplicate Account Found, Please update the Unique name to Update');
      //          }
    //        }
  //      }
//    }