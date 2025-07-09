const fs = require("fs");
const path = require("path");
const { use, start, writeRes } = require("./httpFramework");
const jwt = require("jsonwebtoken");
const config = require("./config");

const generateId = require("./utils/generateId");
const verifyToken = require("./utils/verifyToken");
const parseCookie = require("./utils/parseCookie");

use("GET", "page", (req, res) => {
  try {
    let url = req.url.split("/");
    let page = url[2];

    const pagePath = path.join(__dirname, "views", page);

    const extNameisValid = path.extname(pagePath) === ".html" || ".jpg";

    if (fs.existsSync(pagePath) && extNameisValid) {
      fs.readFile(pagePath, (err, data) => {
        if (err) {
          return writeRes(res , 500 , JSON.stringify({err}))
        }
        data = data.toString();
        return writeRes(res, 200, data);
      });
    } else {
      writeRes(res, 404, "Page Not Found");
    }
  } catch (error) {
    return writeRes(res, 500, JSON.stringify({ error }));
  }
});

use("POST", "api/signup", (req, res) => {
    try {
        const dbPath = path.join(__dirname , "db" , "db.json")
        const initDB = {records: []}

        if(!fs.existsSync(dbPath)){
            fs.writeFileSync(dbPath , JSON.stringify(initDB))
        }

        const { user, email, pass } = req.data;

        if(!user || !email || !pass){
            return writeRes(res , 422 , JSON.stringify({
                message: "Please fill in the entries."
            }))
        }

        fs.readFile(dbPath , (err , data) => {
            if(err) return writeRes(res, 500, JSON.stringify({ err }));

            let dataObj = JSON.parse(data)
            let found = false
            dataObj.records.forEach(element => {
                if (
                  element.user === user.toLowerCase() ||
                  element.email === email.toLowerCase()
                ) {
                  found = true;
                } 
            });

            if (found) {
              return writeRes(
                res,
                403,
                JSON.stringify({
                  message: "Username or email already exists",
                })
              );
            }

            let newUser = {
              user: user.toLowerCase(),
              email: email.toLowerCase(),
              pass,
            };

            dataObj.records.push(newUser);

            fs.writeFile(dbPath , JSON.stringify(dataObj) , (err) => {
                if(err) return writeRes(res, 500, JSON.stringify({ err }));
            })

            writeRes(
              res,
              200,
              JSON.stringify({ message: "User registered successfully " })
            );

        })

    } catch (error) {
      return writeRes(res, 500, JSON.stringify({ error }));
    }
});

use("POST" , "api/login" , (req, res) => {
    try {
        let {user , pass} = req.data

        user = user.toLowerCase()

        if (!user || !pass) {
          return writeRes(
            res,
            422,
            JSON.stringify({
              message: "Please fill in the entries.",
            })
          );
        }
        const dbPath = path.join(__dirname, "db", "db.json");
        fs.readFile(dbPath , (err , data) => {
            if(err) return writeRes(res, 500, JSON.stringify({ err }));

            const dataObj = JSON.parse(data)

            let found = false
            dataObj.records.forEach((element) => {
                if(element.user === user && element.pass === pass){
                    return found = true
                }
            })

            if(!found){
                return writeRes(res , 404 , JSON.stringify({message: "User not found"}))
            }

            const accessToken = jwt.sign({user} , config.auth.accessTokenSecretKey , {
                expiresIn: "30s"
            })

            writeRes(res , 200 , JSON.stringify({message: "User log in successfully" , accessToken}) , accessToken)
        })


    } catch (error) {
      return writeRes(res, 500, JSON.stringify({ error }));
    }
})


use("POST", "api/article", (req, res) => {
  try {
    const dbPath = path.join(__dirname, "db", "data.json");
    const initDB = { records: [] };

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(initDB));
    }

    const { title, body } = req.data;

    if (!title || !body) {
      return writeRes(
        res,
        422,
        JSON.stringify({
          message: "Please fill in the entries.",
        })
      );
    }

    fs.readFile(dbPath, (err, data) => {
      if (err) return writeRes(res, 500, JSON.stringify({ err }));

      let dataObj = JSON.parse(data);
      const articleId = generateId()

      let newArticle = {
        id: articleId,title,body
      };

      dataObj.records.push(newArticle);


      fs.writeFile(dbPath, JSON.stringify(dataObj), (err) => {
        if (err) return writeRes(res, 500, JSON.stringify({ err }));
      });

      writeRes(
        res,
        200,
        JSON.stringify({ message: "Article created successfully " })
      );
    });
  } catch (error) {
    return writeRes(res, 500, JSON.stringify({ error }));
  }
});

use("DELETE" , "api/article/:id" , (req , res) => {
   
  try {
    const { id } = req.params;
    console.log(id);

    const accessToken = parseCookie(req.headers.cookie, "accessToken");

    const isAccessTokenValid = verifyToken(
      accessToken,
      config.auth.accessTokenSecretKey,
      config.auth.accessTokenExpiresInSeonds
    );

    if (!isAccessTokenValid) {
      return writeRes(res, 401, JSON.stringify({ message: "Not Logged in" }));
    }

    if (id.length != 8) {
      return writeRes(
        res,
        422,
        JSON.stringify({ message: "Article ID is not valid" })
      );
    }

    const dbPath = path.join(__dirname, "db", "data.json");

    fs.readFile(dbPath, (err, data) => {
      if (err) return writeRes(res, 500, JSON.stringify({ err }));

      let dataObj = JSON.parse(data);

      const indexArticle = dataObj.records.findIndex(
        (article) => article.id == id
      );

      dataObj.records.splice(indexArticle, 1);

      if (indexArticle == -1) {
        return writeRes(
          res,
          404,
          JSON.stringify({ message: "Article not found" })
        );
      }

      fs.writeFile(dbPath, JSON.stringify(dataObj), (err) => {
        if (err) return writeRes(res, 500, JSON.stringify({ err }));
      });

      return writeRes(
        res,
        200,
        JSON.stringify({ message: "Article removed successfully" })
      );
    });
  } catch (error) {
    return writeRes(res, 500, JSON.stringify({ error }));
  }

})


use("GET" , "api/article" , (req, res) => {
    const accessToken = parseCookie(req.headers.cookie, "accessToken");

    const isAccessTokenValid = verifyToken(
      accessToken,
      config.auth.accessTokenSecretKey,
      config.auth.accessTokenExpiresInSeonds
    );

    if (!isAccessTokenValid) {
      return writeRes(res, 401, JSON.stringify({ message: "Not Logged in" }));
    }

    const dbPath = path.join(__dirname, "db", "data.json");

    fs.readFile(dbPath , (err , data) => {
        if(err) throw err

        const dataObj = JSON.parse(data)

        return writeRes(res , 200 , JSON.stringify(dataObj.records))
    })
    
})


start();
