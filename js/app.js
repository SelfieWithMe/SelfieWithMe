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
                Setalbum();
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

            function Setalbum(){
              var album=[],photomin=0,photomax=photomin+6,page=0;

                  function GetPhoto(photomin,photomax){
                    var Photo = Parse.Object.extend("Photo") ;
                    var photo = new Photo();
                    var photoQuery = new Parse.Query(Photo);

                        photoQuery.find({
                          success:function(photoArray){
                            console.log(photoArray);
                        for(var i=photomin; i<photomax; i++){
                            addphoto(
                            photos.get('camera'),
                            photos.get('style'),
                            photos.get('tips'),
                            photos.get('writer'),
                            photos.get('img').url(),
                            photonum=i%6+1
                            )
                          }}
                        });  
                  };
              
              $(document).on('click','#nextpage',function(e){
                  e.preventDefault();
                  setphoto(6);
                });

              $(document).on('click','#lastpage',function(e){
                  e.preventDefault();
                    setphoto(-6);
                  });
          
              function setphoto(page){
                  photomin=photomin+page;
                  photomax=photomin+6;

                  if(photomin<6){
                    photomin=0;
                  }else if(photomax>album.length){
                    photomax=album.length;
                  }
                  GetPhoto(photomin,photomax);
                      console.log(page);
                   };

                function addphoto(camera,style,tips,writer,img,photonum){
                  var modalname='.portfolio-modal'+photonum,itemname='.portfolio-item'+photonum;
                 $(modalname).children('.writer').text(writer);
                 $(modalname).children('#app').text(camera);
                 $(modalname).children('#style').text(style);
                 $(modalname).children('.tip').text(tips);
                 $(modalname).children('.photo').attr("src",img);
                 $(itemname).children('.photo').attr("src",img);
                 $(itemname).children('.photo').css({'max-height':'360px','max-width':'360px'});
                 console.log(photonum);
               }
                 
                 GetPhoto();
                 setphoto(page); 
        };