public class webhookcallout {  
	@future(callout = true) public static void callWebhook (String name){
		Http http = new Http();
		HttpRequest request = new HttpRequest();
		request.setEndpoint('https://webhook.site/7ac0dd12-6717-438e-8214-2350023eed75');
		request.setMethod('POST');
		request.setHeader('Content-Type', 'application/json');
		request.setBody('{"name": "'+name+'"}');
		
    		HttpResponse response = http.send(request);
    		System.debug('responseStatusCode: '+response.getStatusCode());
		System.debug('responseBody: '+response.getBody());
	}

}