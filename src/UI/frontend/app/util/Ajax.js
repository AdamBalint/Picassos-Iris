/**
 * Utility module to make Ajax calls
 */

function getHttpRequestObject() {
    if (window.XMLHttpRequest) {
        // Mozilla/Safari/Non-IE
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Browser does not support Ajax
    return false;
}

export function ajax(url, method, responseHandler, data) {
     // Set the variables
     url = url || "";
     method = method || "GET";
     var async = true;
     data = data || null;

     if (url == "") {
         alert("URL can not be null/blank");
         return false;
     }

     var xmlHttpRequst = getHttpRequestObject();

     // If AJAX supported
     if(xmlHttpRequst) {
         xmlHttpRequst.open(method, url, async);
         // Set request header (optional if GET method is used)
         if(method == "POST") {
             xmlHttpRequst.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         }
         // Assign (or define) response-handler/callback when ReadyState is changed.
         xmlHttpRequst.onreadystatechange = responseHandler;
         // Send data
         xmlHttpRequst.send(data);
     } else {
         console.log("Browser does not support Ajax.");
     }
 }
