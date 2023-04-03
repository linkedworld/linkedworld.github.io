var LinkActor = {
    instance:null,
    userAgent:null,

    android_marketUrl:null,
    ios_marketUrl:null,

    android_appUrl:null,
    android_intent:null,
    ios_appUrl:null,

    holder:null,
    actionType:null,
   
    init: function() {
        instance = this;
        this.userAgent = navigator.userAgent.toLowerCase();
        console.log("LinkActor: version(" + "1.0.0" + ") on " + this.userAgent);

        //Android Play Store
        this.android_marketUrl = "market://details?id=kr.co.greatbooks.grBooks";

        //Apple AppStore
        this.ios_marketUrl = "https://apps.apple.com/kr/app/%EA%B7%B8%EB%A0%88%EC%9D%B4%ED%8A%B8%EB%B6%81%EC%8A%A4/id1618583288";

        //Application Deep Links
        this.ios_appUrl = "https://cms.greatbooks.co.kr/api/link/index.html?[param]";
        this.android_appUrl = "grbooks://link?[param]";
        this.android_intent = "intent://link?[param]#Intent;scheme=grbooks;package=kr.co.greatbooks.grBooks;end";

        this.holder = "[param]";
        this.actionType = this.getParam("actiontype");

        return this;
    },
    PageAction: function(type) {
        if (instance.userAgent.match(/android/) ) {
            instance.AndroidAction(type);
        } else if(instance.userAgent.match(/iphone/)||instance.userAgent.match(/ipad/)||instance.userAgent.match(/ipod/) ) {
            instance.IosAction(type);
        } else {
            const message = "LinkActor: this actor could be run on mobile browser only!!";
            console.log(message);
            alert(message);
        }
    },

    AndroidAction: function( typeAfter ) {
       if( typeAfter === "" ) {
            const redirectTo = instance.android_appUrl.replace( instance.holder, instance.getParam(""));
            location.href = redirectTo;

            setTimeout(function() {
                const redirectTo = instance.android_intent.replace( instance.holder, instance.getParam(""));
                location.href = redirectTo;
             }, 500);
 
             if (!instance.userAgent.match(/chrome/)) {
                 var iframe = document.createElement('iframe');
                 iframe.style.visibility = 'hidden';
                 iframe.src = instance.android_marketUrl;
                 document.body.appendChild(iframe);
                 document.body.removeChild(iframe);
             }

       } else {
            setTimeout(function() {
               const redirectTo = instance.android_intent.replace( instance.holder, instance.getParam(""));
               location.href = redirectTo;
            }, 500);

            if (!instance.userAgent.match(/chrome/)) {
                var iframe = document.createElement('iframe');
                iframe.style.visibility = 'hidden';
                iframe.src = instance.android_marketUrl;
                document.body.appendChild(iframe);
                document.body.removeChild(iframe);
            }
       }
    },

    IosAction: function(typeAfter) {
        //const redirectTo = instance.ios_appUrl.replace( instance.holder, instance.getParam(""));
        alert("iOS #1" + redirectTo);
        //window.location.href = redirectTo;

        // setTimeout(function() {
        //     var iframe = document.createElement('iframe');
        //     iframe.style.visibility = 'hidden';
        //     iframe.src = instance.ios_marketUrl;
        //     document.body.appendChild(iframe);
        //     document.body.removeChild(iframe);
        // }, 500);

        const redirectTo = instance.ios_marketUrl.replace( instance.holder, instance.getParam(""));
        window.location.href = redirectTo;

    },

    getParam: function(sname) { 
        var params = location.search.substr(location.search.indexOf("?") + 1);
        var sival = "";

        if( sname == "" ) {
            if(params.length > 0) {
                sival = params; 
            } else {
                sival = "";
            }
        } else {
            params = params.split("&");
            for (var i = 0; i < params.length; i++) {
                temp = params[i].split("=");
                if ([temp[0]] == sname) { sival = temp[1]; }
            }
        } 
        return sival;
    }
}