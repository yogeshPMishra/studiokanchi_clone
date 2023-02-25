# API References

## Setup
 
```
    $ git clone https://github.com/yogeshPMishra/studiokanchi_clone.git
    $ cd studiokanchi_clone
    $ npm install
```

# User Routes :

###### BaseUrl
  `GET :  http://localhost:4000/api/v1 `

###### loginUrl :
  `POST :  http://localhost:4000/api/v1/login` 

###### signupUrl : 
  `POST : http://localhost:4000/api/v1/signup`    

###### signupUrl :
  `GET : http://localhost:4000/api/v1/logout`     

###### forgotpasswrodUrl :
  `POST : http://localhost:4000/api/v1forgotpassword `                           

###### resetpasswordUrl : 
  `POST : http://localhost:4000/api/v1/password/reset/:token`

##### dashboardUrl :  
  `GET : http://localhost:4000/api/v1/userdashboard`              

##### updatepasswordUrl :
  `PUT : http://localhost:4000/api/v1/password/update`  

##### userdashboardUpdateUrl :
  `PUT : http://localhost:4000/api/v1/userdashboard/update ` 


## Manager Routes :

  ###### viewalluserUrl :
   `GET : http://localhost:4000/api/v1/manager/users` 

## Admin route :
  ###### viewalluserUrl :
   `GET : http://localhost:4000/api/v1/admin/users `

  ###### viewsingleuserUrl :
  `GET : http://localhost:4000/api/v1/admin/user/:id ` 

  ###### updatesingleuserUrl :
  `GET : http://localhost:4000/api/v1/admin/user/:id ` 

  ###### deletesingleuserUrl :
  `GET : http://localhost:4000/api/v1/admin/user/:id ` 


## Products Routes : 

  ###### getproductUrl : 
  `GET : http://localhost:4000/api/v1/product/getproducts`

  ###### getSinglProducteUrl :
  `GET : http://localhost:4000/api/v1/product/getproduct/:id `

  ###### getrecommendedProductsUrl :  
  `GET : http://localhost:4000/api/v1/product/getrecomendeditems`

  ###### addproductsUrl :
  `POST : http://localhost:4000/api/v1/product/addproduct`

  ###### updateproductsUrl :
  `PUT : http://localhost:4000/api/v1/product/updateproduct/:id` 

  ###### deleteproductsUrl :
  `DELETE : http://localhost:4000/api/v1/product/deleteproduct/:id ` 

## Category Routes :

  ###### getcategoryUrl : 
  `GET : http://localhost:4000/api/v1/category/getcategory` 

  ###### addcategoryUrl : 
   `POST : http://localhost:4000/api/v1/category/addcategory`

  ###### updatecategoryUrl :
   `PUT : http://localhost:4000/api/v1/category/updatecategory/:id`

  ######  deletecategoryUrl :
  `DELETE : http://localhost:4000/api/v1/category/deletecategory/:id `

## Subcategory Routes :

  ###### getcategoryUrl :
   `GET : http://localhost:4000/api/v1/subcategory/getsubcategory`

  ###### addcategoryUrl :
   `POST : http://localhost:4000/api/v1/subcategory/addsubcategory`

  ###### updatecategoryUrl :
   `PUT :http://localhost:4000/api/v1/subcategory/updatesubcategory/:id `

  ###### deletecategoryUrl :
   `DELETE :  http://localhost:4000/api/v1/subcategory/deletesubcategory/:id`

  ###### getallsubcategorybycategoryUrl :
   `GET : http://localhost:4000/api/v1/subcategory/getallsubcategorybycategory/:id`

