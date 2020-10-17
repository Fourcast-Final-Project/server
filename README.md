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
