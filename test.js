//submit button work function
//bookmark----OBJECT
//Bookmarks---KEY TO LOCAL STORAGE
//bookmarks---TEMPORARY ARRAY


function validate()
{
    var site_url=document.getElementById("url_info")[0].value;
    var site_name=document.getElementById("url_info")[1].value;
    //if some details are missing
    if(site_url==="" ||  site_name==="")
        {
            alert("Enter all the details");
        }
    else
        {
            var bookmark={
            url:site_url,
            name:site_name,
            };
            //check wheather the entered url is valid or not
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);
            if(site_url.match(regex))
                {
                    if(localStorage.getItem('Bookmarks')===null)
                        {
                            var bookmarks=new Array();
                            bookmarks.push(bookmark);
                            //put the data into local storage in JSON format
                            localStorage.setItem('Bookmarks',JSON.stringify(bookmarks));
                        }
                    else
                        {
                            var bookmarks=new Array();
                            //fetch the data from local storage and then parse it into string to store it in array
                            bookmarks=JSON.parse(localStorage.getItem('Bookmarks'));
                            bookmarks.push(bookmark);
                            //put the data into local storage in JSON format
                            localStorage.setItem('Bookmarks',JSON.stringify(bookmarks));
                        }

                    var form=document.getElementById("url_info");
                    form.reset();
                    display_all_bookmarks();
                }
            else
                {
                    alert("Please enter a valid url");
                }
                    

        }

            
};

//delete the bookmark
function delete_link(name_of_site)
{
    //fetch all the data into array
    var bookmarks=new Array();
    bookmarks=JSON.parse(localStorage.getItem('Bookmarks'));
    for(var i=0;i<bookmarks.length;i++)
        {
            if(bookmarks[i].name==name_of_site)
                {
                    bookmarks.splice(i,1);
                }
        }
    //again store the data in local storage
    localStorage.setItem('Bookmarks',JSON.stringify(bookmarks));
    //again fetch and draw the bookmarks
    
    display_all_bookmarks();
}

//function which will be called onload
//this function fetches the info of all the bookmarks stored
//and then add the elements to the div element
//we will use wells to display the name and url

function display_all_bookmarks()
{
    var bookmarks=new Array();
    bookmarks=JSON.parse(localStorage.getItem('Bookmarks'));
    var add_wells=document.getElementById("info");
    add_wells.innerHTML="";

    for(var i=0;i<bookmarks.length;i++)
        {
            var site_name=bookmarks[i].name;
            var site_url=bookmarks[i].url;
            add_wells.innerHTML+=
                '<div class="well"> '+
                '<h3 style="display:inline;">'+
                bookmarks[i].name+
                '</h3>'+
                '<a href="'+
                bookmarks[i].url+
                '">'+
                '<button type="button" class="btn btn-success" style="margin:10px;position:relative;bottom:5px;">Visit</button>'+
                '</a>'+
                '<button type="button" class="btn btn-danger" style="margin:10px;position:relative;bottom:5px;" onclick="delete_link(\''+site_name+'\')">Delete</button>'+
                '</div>'
        }
    
      
}

