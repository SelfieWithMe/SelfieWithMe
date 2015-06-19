//step1:https://www.parse.com/docs/js/guide#users-facebook-users
// Initialize Parse
Parse.initialize("3Ct29PJCet8L8kfhLvbLTJ3DLKRC61RAp7ysXFU6", "3yHxjy4EBgJTMWYBuP1T7rG4qOHiiOuAnokZB5jb");



window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
        appId      : '376624765869068', // Facebook App ID
        status     : true,  // check Facebook Login status
        cookie     : true,  // enable cookies to allow Parse to access the session
        xfbml      : true,  // initialize Facebook social plugins on the page
        version    : 'v2.3' // point to the latest Facebook Graph API version
    });
    // Run code after the Facebook SDK is loaded.
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));




$(document).ready(function(){
    console.log(Parse.User.current());
    var Comment = Parse.Object.extend("Comment") ;
    var queryComments = new Parse.Query (Comment) ;

    queryComments.find({
        success : function(arrayOfQueriedObjects){
            console.log (arrayOfQueriedObjects);

            for (var i = 0 ; i < arrayOfQueriedObjects.length ; i++){
                comment = arrayOfQueriedObjects[i] ;
                $("#comments").append("<blockquote>"+"<img src='"+ comment.get("img").url()+"' height='100px'>"+ "</blockquote>");
            }
        },
        error : function(errorObject){
            alert(errorObject.message) ;
        }
    });
});


$(document).ready(function(){
  var current = Parse.User.current();
  console.log(current);
  if(current){
      var a = setTimeout(function(){
          FB.getLoginStatus(function(response) {
               if (response.status === 'connected') {
                   uid = response.authResponse.userID;
                   accessToken = response.authResponse.accessToken;
                   FB.api('/me/picture?type=large', function (response) {
                      $('#fbPic').html("<img src="+response.data.url+" crossorigin=\"anonymous\" id=preview1 />" );          
                   });

                   $('#fbImgView').html("<img src="+response.data.url+" crossorigin=\"anonymous\" id=dashboardImg />");          
                   });

                   FB.api('/me', function (response) {
                      console.log(response);
                      $('#fbImgView').append("<h1>HELLO , "+" "+response['first_name']+"</h1>");
                   });
            }
           });   
      },3000);
      indexView();
  }
  else{
      loginView();
  }
});


$(document).on('click','#loginBtn',function(e){
    e.preventDefault();
    fblogin();
});

$(document).on('click','#logoutBtn',function(e){
    e.preventDefault();
    logout();
});

function loginView(){
    $('#logoutBtn').hide();
    $('#indexView').hide();
    $('#dashboardBtn').hide();
    $('#loginView').show();
    $('#loginBtn').show();
    $('#fbPic').html('');
}

function indexView(){
    $('#loginView').hide();
    $('#loginBtn').hide();
    $('#dashboardBtn').show();
    $('#indexView').show();
    $('#logoutBtn').show();
}

function fblogin(){
    //step2:https://developers.facebook.com/docs/graph-api/using-graph-api/v2.3 
    Parse.FacebookUtils.logIn(null, {
        success: function(user) {
            if (!user.existed()) {
                alert("註冊完成並且透過臉書登入");
            } else {
                alert("透過臉書登入成功");
            }

            indexView();//切換至預先寫好登入後的介面

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    FB.api('/me/picture?type=large', function (response) {
                        $('#fbPic').html("<img src="+response.data.url+" crossorigin=\"anonymous\" id=preview1 />");          
                    });
               
                    FB.api('/me', function (response) {
                        console.log(response);
                        $('#fbImgView').append("<h1>Welcome , "+(response['gender']=="male"?"Mr. ":"Miss ")+" "+response['first_name']+"</h1>");
                    });            
                }
            }); 
        },
        error: function(user, error) {
            alert("使用者取消登入或沒有授權");
        }
    });
}

function logout(){
   Parse.User.logOut();
   FB.logout(function(response) {
     // user is now logged out
   });
   loginView(); 
   window.location = 'index.html' ;
}