User Routes
    baseUrl :  http://localhost:4000/api/v1                                       method : get
    loginUrl : http://localhost:4000/api/v1/login                                 method : post 
    signupUrl : http://localhost:4000/api/v1/signup                               method : post
    signupUrl : http://localhost:4000/api/v1/logout                               method : get
    forgotpasswrodUrl : http://localhost:4000/api/v1forgotpassword                method : post
    resetpasswordUrl : http://localhost:4000/api/v1/password/reset/:token         method : post
    dashboardUrl : http://localhost:4000/api/v1/userdashboard                     method : get
    updatepasswordUrl : http://localhost:4000/api/v1/password/update              method : put
    userdashboardUpdateUrl : http://localhost:4000/api/v1/userdashboard/update    method : put

Manager Routes :
    viewalluserUrl : http://localhost:4000/api/v1/manager/users                   method : get

Admin route :
    viewalluserUrl : http://localhost:4000/api/v1/admin/users                     method : get
    viewsingleuserUrl : http://localhost:4000/api/v1/admin/user/:id               method : get
    updatesingleuserUrl : http://localhost:4000/api/v1/admin/user/:id             method : put
    deletesingleuserUrl : http://localhost:4000/api/v1/admin/user/:id             method : delete  


Products Routes : 
    getproductUrl :  http://localhost:4000/api/v1/product/getproducts             method : get
    getSinglProducteUrl : http://localhost:4000/api/v1/product/getproduct/:id     method : get
    getrecommendedProductsUrl : http://localhost:4000/api/v1/product/getrecomendeditems  method : get
    addproductsUrl :  http://localhost:4000/api/v1/product/addproduct             method : post
    updateproductsUrl :  http://localhost:4000/api/v1/product/updateproduct/:id   method : put
    deleteproductsUrl :  http://localhost:4000/api/v1/product/deleteproduct/:id   method : delete

Category Routes :
    getcategoryUrl : http://localhost:4000/api/v1/category/getcategory            method : get
    addcategoryUrl : http://localhost:4000/api/v1/category/addcategory            method : post
    updatecategoryUrl : http://localhost:4000/api/v1/category/updatecategory/:id  method : put
    deletecategoryUrl : http://localhost:4000/api/v1/category/deletecategory/:id  method : delete

Subcategory Routes :
   getcategoryUrl :  http://localhost:4000/api/v1/subcategory/getsubcategory      method : get
   addcategoryUrl : http://localhost:4000/api/v1/subcategory/addsubcategory       method : post
   updatecategoryUrl : http://localhost:4000/api/v1/subcategory/updatesubcategory/:id   method : put
   deletecategoryUrl : http://localhost:4000/api/v1/subcategory/deletesubcategory/:id   method : delete
   getallsubcategorybycategoryUrl : http://localhost:4000/api/v1/subcategory/getallsubcategorybycategory/:id  method : get
