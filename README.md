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
