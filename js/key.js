//Parse key
Parse.initialize("3Ct29PJCet8L8kfhLvbLTJ3DLKRC61RAp7ysXFU6", "3yHxjy4EBgJTMWYBuP1T7rG4qOHiiOuAnokZB5jb");

//FB key
window.fbAsyncInit = function() {
 Parse.FacebookUtils.init({
      appId      : '376624765869068',
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true, 
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=376624765869068";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

