public class continuationexample2 {
    
    // Unique label corresponding to the continuation request
    public String requestLabel_1;
    // Result of callout
    public String result1 {get;set;}
    // Endpoint of long-running service
    private static final String LONG_RUNNING_SERVICE_URL1 = 'LONG_RUNNING_SERVICE_URL';
   
    
  /*  public String requestLabel_2;
    public String result2 {get;set;}
    private static final String LONG_RUNNING_SERVICE_URL2 = 'https://api.github.com/users/hadley/orgs';
    
    public String requestLabel_3;
    public String result3 {get;set;}
    private static final String LONG_RUNNING_SERVICE_URL3 = 'https://api.github.com';*/
    
   /* public String requestLabel_4;
    public String result4 {get;set;}
	private static final String LONG_RUNNING_SERVICE_URL4 = 'https://api.github.com/users/hadley/orgs';*/
    
   // Action method
    public Object startRequest() {
      // Create continuation with a timeout
      Continuation con = new Continuation(40);
      // Set callback method
      con.continuationMethod='processResponse';
      
      // Create 1st callout request
      HttpRequest req1 = new HttpRequest();
      req1.setMethod('GET');
      req1.setEndpoint(LONG_RUNNING_SERVICE_URL1);
      // Add callout request to continuation
      this.requestLabel_1 = con.addHttpRequest(req1);
        
    /*    // Create 2nd callout request
      HttpRequest req2 = new HttpRequest();
      req2.setMethod('GET');
      req2.setEndpoint(LONG_RUNNING_SERVICE_URL2);
      // Add callout request to continuation
      this.requestLabel_2 = con.addHttpRequest(req2);
        
        
        // Create 3rd callout request
      HttpRequest req3 = new HttpRequest();
      req3.setMethod('GET');
      req3.setEndpoint(LONG_RUNNING_SERVICE_URL3);
      // Add callout request to continuation
      this.requestLabel_3 = con.addHttpRequest(req3);*/
        
        
     /*   // Create 4th callout request
      HttpRequest req4 = new HttpRequest();
      req4.setMethod('GET');
      req4.setEndpoint(LONG_RUNNING_SERVICE_URL4);
      // Add callout request to continuation
      this.requestLabel_4 = con.addHttpRequest(req4);*/
      
      // Return the continuation
      return con;  
    }
    
    // Callback method 
    public Object processResponse() {   
      // Get the response by using the unique label
      HttpResponse response1 = Continuation.getResponse(this.requestLabel_1);
      // Set the result variable that is displayed on the Visualforce page
      this.result1 = response1.getBody();
      
    /*  HttpResponse response2 = Continuation.getResponse(this.requestLabel_2);
      // Set the result variable that is displayed on the Visualforce page
      this.result2 = response2.getBody();
        
      HttpResponse response3 = Continuation.getResponse(this.requestLabel_3);
      // Set the result variable that is displayed on the Visualforce page
      this.result3 = response3.getBody();*/
        
      /*HttpResponse response4 = Continuation.getResponse(this.requestLabel_4);
      // Set the result variable that is displayed on the Visualforce page
      this.result4 = response4.getBody();*/
        
        
      // Return null to re-render the original Visualforce page
      return null;
    }
}