@isTest
public class ContinuationTestingForHttpRequest {
    public static testmethod void testWebService() {
        
        // calling the controller
        continuationexample2 controller = new continuationexample2();
        
        // Invoke the continuation by calling the action method name(startRequest)
        Continuation conti = (Continuation)controller.startRequest();
        
        // Verify that the continuation has the proper requests
        Map<String, HttpRequest> requests = conti.getRequests();
        system.assert(requests.size() == 1);
        system.assert(requests.get(controller.requestLabel_1) != null);
        
        // Perform mock callout 
        // (i.e. skip the callout and call the callback method)
        HttpResponse response = new HttpResponse();
        
        response.setBody('Mock response body');  
        // Set the fake response for the continuation     
        Test.setContinuationResponse(controller.requestLabel_1, response);
        
        // Invoke callback method
        Object result = Test.invokeContinuationMethod(controller, conti);
        
        // result is the return value of the callback
        System.assertEquals(null, result);
        
        // Verify that the controller's result variable
        //   is set to the mock response.
        System.assertEquals('Mock response body', controller.result1);
    }
}