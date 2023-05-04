public with sharing class ChainedContinuationController {

    // Unique label for the initial callout request
    public String requestLabel1;
    // Unique label for the chained callout request
    public String requestLabel2;
    // Result of initial callout
    public String result1 {get;set;}
    // Result of chained callout
    public String result2 {get;set;}
    // Endpoint of long-running service
    private static final String LONG_RUNNING_SERVICE_URL1 = 
        'https://api.github.com';
    private static final String LONG_RUNNING_SERVICE_URL2 = 
        'https://api.github.com/users/hadley/orgs';
           
    // Action method
    public Object invokeInitialRequest() {
      // Create continuation with a timeout
      Continuation con = new Continuation(60);
      // Set callback method
      con.continuationMethod='processInitialResponse';
      
      // Create first callout request
      HttpRequest req = new HttpRequest();
      req.setMethod('GET');
      req.setEndpoint(LONG_RUNNING_SERVICE_URL1);
      
      // Add initial callout request to continuation
      this.requestLabel1 = con.addHttpRequest(req);              
      
      // Return the continuation
      return con;  
    }
    
    // Callback method for initial request
    public Object processInitialResponse() {   
      // Get the response by using the unique label
      HttpResponse response = Continuation.getResponse(this.requestLabel1);
      // Set the result variable that is displayed on the Visualforce page
      this.result1 = response.getBody();
           
      Continuation chainedContinuation = null;
      // Chain continuation if some condition is met
      if (response.getBody().toLowerCase().contains('current_user_url')) {
          // Create a second continuation 
          chainedContinuation = new Continuation(60);
          // Set callback method
          chainedContinuation.continuationMethod='processChainedResponse';
          
          // Create callout request
          HttpRequest req = new HttpRequest();
          req.setMethod('GET');
          req.setEndpoint(LONG_RUNNING_SERVICE_URL2);
          
          // Add callout request to continuation
          this.requestLabel2 = chainedContinuation.addHttpRequest(req); 
      }
      
      // Start another continuation 
      return chainedContinuation;  
    }    
    
    // Callback method for chained request
    public Object processChainedResponse() {   
      // Get the response for the chained request
      HttpResponse response = Continuation.getResponse(this.requestLabel2);
      // Set the result variable that is displayed on the Visualforce page
      this.result2 = response.getBody();
           
      // Return null to re-render the original Visualforce page
      return null;
    }
}