**Fourcast-Server API**
----

**Register User**
----
  To save user data to Database

* **URL**

  /register

* **Method:**
  
     `POST`
  
*  **URL Params**

   **Required:**
 
   `None`

* **Data Params**

  `None`

* **Data Body**

  ```
  {
    email: String,
    password: String
  }
  ```

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** 
     `````` 
    {
        "msg": "Success Create User"
    }
    ``````
 
* **Error Response:**

 * **Code:** 400 UNPROCESSABLE ENTRY <br />
    **Content:** 
    ```
    { error : "Bad Reuest" }
    ```

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```
----------------------------------------------------------------
<br/>

**Login User**
----
  To check user data and compare the data in the database

* **URL**

  /login

* **Method:**

     `POST`
  
*  **URL Params**

     `none`

   **Required:**
 
    `none`

* **Data Body**

  ```
  {
    email: String,
    password: String
  }
  ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     ``````
    {
    "email": "yesia@mail.com"
    }
    ``````
 
* **Error Response:**

    
  * **Code:** 400 UNPROCESSABLE ENTRY <br />
    **Content:** {
       ````
       error : "Invalid email or password" }
       ````

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

----------------------------------------------------------------

**Add Location**
----
  Add Location 

* **URL**

 /locations

* **Method:**
  

     `POST` 

*  **URL Params**

     `none`

   **Required:**
 
    `none`

*  **Headers**
 
     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````


* **Data Body**

  `````
  {
    "name": string,
    "waterLevel": Double,
    "latitude": Double,
    "longitude": Double
  }
  ``````

* **Success Response:**
  
  * **Code:** 201 <br />
   **Content:** 
    `````` 
    {
    "msg": "Success Create Location"
    }
    ``````
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ``````
     { error : "invalid input" }
    ``````

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

----------------------------------------------------------------
**Show All Location**
----
   To show all location with arduino

* **URL**

     /location

* **Method:**

    `GET` 

*  **URL Params**

      **Required:**
    
      `none`
  
*  **Headers**
 
     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Data Body**

    `none`
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `````` 
    {
      "results": [
          {
              "id": 1,
              "name": "pancoran",
              "waterLevel": 3.4,
              "latitude": -6.2523,
              "longitude": 106.847336,
              "createdAt": "2020-10-17T03:13:31.762Z",
              "updatedAt": "2020-10-17T03:13:31.762Z"
          }
      ],....,....]
    }
    ``````
   
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```


----------------------------------------------------------------
**Show Location By Id**
----
   To show location by id location

* **URL**

     /location/:id

* **Method:**

    `GET` 

*  **URL Params**

      **Required:**
    
      `id=[integer]`
  
*  **Headers**
 
     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Data Body**

    `none`
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `````` 
       {
    "result": {
        "id": 1,
        "name": "pancoran",
        "waterLevel": 3.4,
        "latitude": -6.2523,
        "longitude": 106.847336,
        "createdAt": "2020-10-17T03:13:31.762Z",
        "updatedAt": "2020-10-17T03:13:31.762Z"
    }
    }
    ``````
   
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```


----------------------------------------------------------------
<br/>

**Edit Location By Id Location**
----
   To Edit Product by Id Location


* **URL**

    /location/:id

* **Method:**

     `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Headers**


     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     ``````
    {
    "data": {
        "id": 1,
        "name": "pancoran 2",
        "waterLevel": "3.4",
        "latitude": "-6.252300",
        "longitude": "106.847336",
        "createdAt": "2020-10-17T03:13:31.762Z",
        "updatedAt": "2020-10-17T03:22:22.455Z"
    }
    }
    ``````
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { error : "Data not found" }
    ```

  OR

    * **Code:** 500 NOT FOUND <br />
      **Content:** 
      ```
      { error : "Internal Server Error" }
      ```

 

----------------------------------------------------------------
<br/>

**Delete Location By Id Location**
----
   To Delete Location by Id Location


* **URL**

    /location/:id

* **Method:**

     `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Headers**


     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     `````` 
    {
    "msg": "Success Delete Location"
    }
    ``````
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { error : "Data not found" }
    ```

  OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
      **Content:** 
      ```
      { error : "Internal Server Error" }
      ```

 

----------------------------------------------------------------
<br>
**Add Subscribe**
----
  To Add Subscribe

* **URL**

 /subscribes

* **Method:**
  

     `POST` 

*  **URL Params**

     `none`

   **Required:**
 
    `none`

*  **Headers**
 
     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````


* **Data Body**

  `````
  {
    "UserId": Int,
    "LocationId": Int
  }
  ``````

* **Success Response:**
  
  * **Code:** 201 <br />
   **Content:** 
    `````` 
   {
    "msg": "subscribe location succeed"
   }
    ``````
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ``````
     { error : "invalid input" }
    ``````

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```
----------------------------------------------------------------
<br/>

**Show All Subscribed**
----
   To show all Subscribed

* **URL**

     /subscribes

* **Method:**

    `GET` 

*  **URL Params**

      **Required:**
    
      `none`
  
*  **Headers**
 
     ``````
         {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Data Body**

    `none`
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `````` 
    [
       "results": [
        {
            "id": 10,
            "UserId": 1,
            "LocationId": 1,
            "createdAt": "2020-10-17T04:13:25.050Z",
            "updatedAt": "2020-10-17T04:13:25.050Z",
            "Location": {
                "id": 1,
                "name": "pancoran 2",
                "waterLevel": 3.4,
                "latitude": -6.2523,
                "longitude": 106.847336,
                "createdAt": "2020-10-17T03:13:31.762Z",
                "updatedAt": "2020-10-17T03:22:22.455Z"
            }
        },....,....
    ]
    ``````
   
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```


----------------------------------------------------------------
<br/>

**Show All Subscribed by Id**
----
   To show all Subscribed by Id

* **URL**

     /subscribes/:id

* **Method:**

    `GET` 

*  **URL Params**

      **Required:**
    
      `id=[integer]`
  
*  **Headers**
 
     ``````
         {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Data Body**

    `none`
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `````` 
    {
    "result": {
        "id": 10,
        "UserId": 1,
        "LocationId": 1,
        "createdAt": "2020-10-17T04:13:25.050Z",
        "updatedAt": "2020-10-17T04:13:25.050Z"
    }
    }
    ``````
   
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

----------------------------------------------------------------
<br/>


**Delete Subscribed By Id Subscribed**
----
   To Delete Subscribed by Id Subscribed


* **URL**

    /subscribes/:id

* **Method:**

     `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Headers**


     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     `````` 
    {
    "msg": "success removing city from your subscribed list"
    }
    ``````
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { error : "Data not found" }
    ```

  OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
      **Content:** 
      ```
      { error : "Internal Server Error" }
      ```

 

----------------------------------------------------------------
<br/>

**Delete All Subscribed **
----
   To Delete All Subscribed 
 

* **URL**

    /subscribes/:id

* **Method:**

     `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Headers**


     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     `````` 
    {
    "msg": "success removing all cities from user subscribed list"
    }
    ``````
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { error : "Data not found" }
    ```

  OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
      **Content:** 
      ```
      { error : "Internal Server Error" }
      ```

 

----------------------------------------------------------------
<br/> 

**Add History**
----
  To Add history

* **URL**

 /histories

* **Method:**
  

     `POST` 

*  **URL Params**

     `none`

   **Required:**
 
    `none`

*  **Headers**
 
     ``````
          {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````


* **Data Body**

  `````
  {
    "location": string,
    "time": string,
    "waterLevel": Double,
    "UserId": Int
  }
  ``````

* **Success Response:**
  
  * **Code:** 201 <br />
   **Content:** 
    `````` 
   {
    "msg": "Success Create History"
   }
    ``````
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ``````
     { error : "invalid input" }
    ``````

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```

----------------------------------------------------------------
<br/>

**Show All History**
----
   To show all History

* **URL**

     /histories

* **Method:**

    `GET` 

*  **URL Params**

      **Required:**
    
      `none`
  
*  **Headers**
 
     ``````
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Data Body**

    `none`
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `````` 
    {
      "results": [
          {
              "id": 3,
              "location": "pancoran",
              "time": "11 january 2021",
              "waterLevel": 2.3,
              "UserId": 1,
              "createdAt": "2020-10-17T04:35:36.013Z",
              "updatedAt": "2020-10-17T04:35:36.013Z"
          }
      ]
      }....,....]
    }
    ``````
   
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```


----------------------------------------------------------------
<br/>
**Show History By Id**
----
   To show history by id user

* **URL**

     /histories/:id

* **Method:**

    `GET` 

*  **URL Params**

      **Required:**
    
      `id=[integer]`
  
*  **Headers**
 
     ``````
     {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Data Body**

    `none`
    
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `````` 
    {
      "result": {
          "id": 3,
          "location": "pancoran",
          "time": "11 january 2021",
          "waterLevel": 2.3,
          "UserId": 1,
          "createdAt": "2020-10-17T04:35:36.013Z",
          "updatedAt": "2020-10-17T04:35:36.013Z"
      }
    }
    ``````
   
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** 
    ```
    { error : "Internal Server Error" }
    ```


----------------------------------------------------------------
<br/>

**Delete History By Id History**
----
   To Delete History by Id History


* **URL**

    /histories/:id

* **Method:**

     `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Headers**


     ``````
     {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     `````` 
    {
    "msg": "success removing city from user history"
    }
    ``````
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { error : "Data not found" }
    ```

  OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
      **Content:** 
      ```
      { error : "Internal Server Error" }
      ```

 

----------------------------------------------------------------
<br/>


**Delete History**
----
   To Delete History


* **URL**

    /histories

* **Method:**

     `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

*  **Headers**


     ``````
     {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5ZXNpYUBnbWFpbC5jb20iLCJpYXQiOjE1OTg5MjE4OTB9.SYXtZ_jojsEUvo2hiHKhctPLwYmKebGTN6zBvpnCUvE"
    }
    ``````

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     `````` 
    {
    "msg": "success removing all cities from user history"
    }
    ``````
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    { error : "Data not found" }
    ```

  OR

    * **Code:** 500 INTERNAL SERVER ERROR<br />
      **Content:** 
      ```
      { error : "Internal Server Error" }
      ```

 

----------------------------------------------------------------
<br/>



