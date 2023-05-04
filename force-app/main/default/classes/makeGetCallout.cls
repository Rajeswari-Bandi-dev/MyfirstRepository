public class makeGetCallout {
    
    Public string getContent(string url){
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://th-apex-http-callout.herokuapp.com/');
        req.setMethod('GET');
        
        HttpResponse res = h.send(req);
        return res.getBody();
        //System.debug('getResponse' + res.getBody());

        
    }
        

}