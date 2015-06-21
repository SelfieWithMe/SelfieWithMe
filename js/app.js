//step1:https://www.parse.com/docs/js/guide#users-facebook-users
// Initialize Parse
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
                              }
                          }); 
                      },
                      error: function(user, error) {
                          alert("使用者取消登入或沒有授權");
                      }
                  });
              };
              
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
                          }
                         });   
                    },3000);
                    indexView();
                }
                else{
                    loginView();
                }
                GetPhoto();
                
            });

            $(document).on('click','#loginBtn',function(e){
                e.preventDefault();
                fblogin();
            });

            $(document).on('click','#logoutBtn',function(e){
                e.preventDefault();
                logout();
                alert("登出成功");
                window.location = 'index.html' ;

            });

            function loginView(){
                $('#logoutBtn').hide();
                $('#dashboardBtn').hide();
                $('#loginBtn').show();
                $('#fbPic').html('');
            }

            function indexView(){
                $('#loginBtn').hide();
                $('#dashboardBtn').show();
                $('#logoutBtn').show();
            }

            function logout(){
               Parse.User.logOut();
               FB.logout(function(response) {
                 // user is now logged out
               });
               loginView(); 
            }

            function GetPhoto(){

              eventObject.preventDefault();
              var Photo = Parse.Object.extend("Photo") ;
              var Photo = new Photo();
              var photoQuery = new Parse.Query(photo);

                  photoQuery.find({
                    success:function(photoArray){
                      console.log(photoArray);

                      for(var i=0; i<photoArray.length ; i++){
                        photo = photoArray[i];
                        addphoto(
                        photo.get('camera'),
                        photo.get('style'),
                        photo.get('tips'),
                        photo.get('writer'),
                        photo.get('img'),
                        Photonum = i
                        );
                      }
                    }
                  });  
            };

            function addphoto(camera,style,tips,writer,img,Photonum){
             $('.portfolio-modal:eq(Photonum) .writer').text(writer);
             $('.portfolio-modal:eq(Photonum) #app').text(camera);
             $('.portfolio-modal:eq(Photonum) #style').text(style);
             $('.portfolio-modal:eq(Photonum) .tip').text(tips);
             $('.portfolio-modal:eq(Photonum) .img').html('<img src='+img+'class="img-responsive img-centered" alt="">');
            };