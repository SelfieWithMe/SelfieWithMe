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
              var photomin=0,photomax=6,page=0,change;
                      GetPhoto();
                      
                      function setnum(){
                        photomin=0,photomax=6,page=0;
                      }

                      $(document).on('click','#latest',function(e){
                         e.preventDefault();
                         change="latest";
                         setnum();
                         GetPhoto();
                         $('.picNav li').removeClass("active");
                         $('#latest').parents().addClass("active");
                      });
                      $(document).on('click','#natural',function(e){
                        e.preventDefault();
                        change="清新自然";
                        setnum();
                        GetPhoto();
                        $('.picNav li').removeClass("active");
                        $('#natural').parents().addClass("active");

                      });
                      $(document).on('click','#cute',function(e){
                       e.preventDefault();
                       change="可愛甜美";
                       setnum();
                       GetPhoto();
                       $('.picNav li').removeClass("active");
                       $('#cute').parents().addClass("active");
                      });
                      $(document).on('click','#city',function(e){
                        e.preventDefault();
                        change="成熟都會";
                        setnum();
                        GetPhoto();
                        $('.picNav li').removeClass("active");
                        $('#city').parents().addClass("active");
                      });
                      $(document).on('click','#weird',function(e){
                        e.preventDefault();
                        change="搞怪扮醜";
                        setnum();
                        GetPhoto();
                        $('.picNav li').removeClass("active");
                        $('#weird').parents().addClass("active");
                      });
                      $(document).on('click','#festival',function(e){
                        e.preventDefault();
                        change="活動節慶";
                        setnum();
                        GetPhoto();
                        $('.picNav li').removeClass("active");
                        $('#festival').parents().addClass("active");
                      });
                      $(document).on('click','#mood',function(e){
                        e.preventDefault();
                        change="心情小語";
                        setnum();
                        GetPhoto();
                        $('.picNav li').removeClass("active");
                        $('#mood').parents().addClass("active");
                      });
                      $(document).on('click','#group',function(e){
                        e.preventDefault();
                        change="團體群拍";
                        setnum();
                        GetPhoto();
                        $('.picNav li').removeClass("active");
                        $('#group').parents().addClass("active");
                      });

                  function GetPhoto(){
                    var Photo = Parse.Object.extend("Photo") ;
                    var photo = new Photo();
                    var photoQuery = new Parse.Query(Photo);

                     if(change && change!="latest"){
                      photoQuery.equalTo("style",change);
                     }else{
                      photoQuery.descending("createdAt");
                     }

                        photoQuery.find({
                          success:function(photoArray){
                            console.log(photoArray);

                            photomin+=page;
                            photomax+=page;
                            
                            if(photoArray.length<=6){
                               photomin=0;
                               photomax=photoArray.length;}

                           if(photomin < 0){
                                photomin=0;
                                photomax=6;                             
                            }else if(photomax>=photoArray.length){
                                photomax=photoArray.length;
                                if(photomin>=photomax){
                                  photomin-=page;
                                }   
                                page=0;
                            }else if(photomax%6!=0){
                              photomax=photomin+6;
                            }
                            
                            console.log(photomin);
                            console.log(photomax);
                        for(var i=photomin; i<photomax; i++){
                            photos=photoArray[i];
                            addphoto(
                            photos.get('camera'),
                            photos.get('style'),
                            photos.get('tips'),
                            photos.get('writer'),
                            photos.get('img').url(),
                            photos.id,
                            photonum=i%6+1
                            )
                          }
                          removephoto();
                        }
                        });  
                  };
                   
              $(document).on('click','#nextpage',function(e){
                  e.preventDefault();
                  page+=6;
                  GetPhoto();
                });

              $(document).on('click','#lastpage',function(e){
                  e.preventDefault();
                    page-=6;
                    GetPhoto();
                  });
          
              

               function addphoto(camera,style,tips,writer,img,objectId,photonum){
                var modalname='#portfolioModal'+photonum,itemname='#portfolio-item'+photonum;
                 $(modalname).find('.fb-comments').attr('data-href','http://selfiewithme.github.io/selfiewithme/#'+objectId);
                 $(modalname).find('.fb-like').attr('data-href','http://selfiewithme.github.io/selfiewithme/#'+objectId);
                 $(modalname).find('.writer').text(writer);
                 $(modalname).find('#app').text(camera);
                 $(modalname).find('#style').text(style);
                 $(modalname).find('.tip').text(tips);
                 $(modalname).find('.photo').attr("src",img);
                 $(itemname).find('a').attr("href","#"+objectId);
                 $(itemname).show();
                 $(itemname).find('.photo').attr("src",img);
                 $(itemname).find('.photo').css({'max-height':'360px','max-width':'360px'});
               };

               function removephoto(){
                 if(photomax-photomin<6){
                  var i=0,itemname;
                  for(i=photomax-photomin+1;i<7;i++){
                    itemname='#portfolio-item'+i;
                 $(itemname).hide();
                  }
                }
               };
            };
