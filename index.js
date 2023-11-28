const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const { application } = require("express");
const e = require("express");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
useremail = " ";

//1. USER
// REGISTER

app.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const emailaddress = req.body.emailaddress;
  const password = req.body.password;

  db.query(
    "INSERT INTO user (firstname,lastname,emailaddress, password) VALUES (?,?,?,?)",
    [firstname, lastname, emailaddress, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

//LOGIN

app.post("/login", (req, res) => {
  useremail = req.body.emailaddress;
  const password = req.body.password;
  console.log(useremail);
  db.query(
    "SELECT emailaddress,password FROM user WHERE emailaddress = ? AND password = ?",
    [useremail, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        //console.log(err);
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username or password" });
      }
    }
  );
});

app.get("/profile", (req, res) => {
  console.log(useremail);
  db.query(
    "SELECT firstname,lastname,emailaddress,designation,phone,location FROM user WHERE emailaddress = ?",
    [useremail],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        //console.log(err);
      } else {
        res.send(result);
        console.log("profile");
      }
    }
  );
});

//2. PRODUCTS
//reading all values in database
app.get("/api/ge", (req, res) => {
  db.query(
    "SELECT id,name,price,quantity,description FROM products",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// inerting values
app.post("/create", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const category_id = req.body.category_id;
  const currency = 0;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const description = req.body.description;

  db.query(
    "INSERT INTO products (id,name, category_id, currency, quantity, price,description) VALUES (?,?,?,?,?,?,?)",
    [id, name, category_id, currency, quantity, price, description],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send("Values Inserted");
    }
  );
});

// deleting a value
app.delete("/deleteproduct/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("DELETE FROM products WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// updating a value
app.put("/update/:id", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const description = req.body.description;
  db.query(
    "UPDATE products SET name= ? , quantity = ? , price = ? , description= ? where id = ?",
    [name, quantity, price, description, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// 3. CATEGORY

app.get("/api/gete", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// inerting values
app.post("/cre", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;

  db.query(
    "INSERT INTO category (id,name) VALUES (?,?)",
    [id, name],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// deleting a value
app.delete("/deletecategory/:category_id", (req, res) => {
  const category_id = req.params.category_id;
  console.log(category_id);
  db.query("DELETE FROM category WHERE id= ?", category_id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// updating a value
app.put("/updatecategory/:category_id", (req, res) => {
  const category_id = req.body.id;
  const name = req.body.name;
  console.log("Updating category_id: " + category_id);
  db.query(
    "UPDATE category SET  name = ? where id = ?",
    [name, category_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// 4. EMPLOYEES

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/gettt", (req, res) => {
  db.query("SELECT id,name,branch_id,status FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// inerting values

//Sales
app.get("/api/getsales", (req, res) => {
  db.query("SELECT * FROM sales", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//tables
app.get("/api/gettables", (req, res) => {
  db.query("SELECT * FROM tables", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/creat", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const branch_id = req.body.branch_id;

  const salary = req.body.salary;
  const joining_date = req.body.joining_date;

  db.query(
    "INSERT INTO employees (id, name, branch_id, salary,joining_date) VALUES (?,?,?,?,?)",
    [id, name, branch_id, salary, joining_date],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// deleting a value
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// updating a value
app.put("/update/:id", (req, res) => {
  const id = req.body.id;
  const salary = req.body.salary;
  db.query(
    "UPDATE SET employees salary = ? where id = ?",
    [salary, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// 5. ORDER

app.get("/api/gett", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// inerting values
app.post("/crea", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const location = req.body.location;
  const price = req.body.price;
  const time = req.body.time_remaining;

  db.query(
    "INSERT INTO orders (id,name, location,price,time) VALUES (?,?,?,?,?)",
    [id, name, location, price, time],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// deleting a value
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM order WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// updating a value
app.put("/update/:id", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const location = req.body.location;
  const price = req.body.price;
  const time = req.body.time_remaining;

  db.query(
    "UPDATE SET order id=?,name=?,location = ?,price = ?,time=? and  where id = ?",
    [name, location, price, time, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("running on port ${PORT}.");
});
