const http = require("http");
const config = require("./config");

const PORT = config.port;

let controllers = [];

function use(method, path, handler) {
  method = method.toUpperCase();

  const parts = path.split("/").filter((part) => part !== "");

  let currentLevel = { method, handler };

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    currentLevel = {
      [part]: currentLevel,
    };
  }

  controllers.push(currentLevel);
}

// const setCorsHeaders = (res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Custom-Header"
//   );
//   res.setHeader("Access-Control-Expose-Headers", "X-Custom-Header");
// };

function handleRequest(req, res) {
  try {
    const method = req.method;
    const url = req.url;

    const routeInfo = findMatchingRoute(method, url);

    if (!routeInfo) {
      return writeRes(res, 404, JSON.stringify({ message: "Not Found" }));
    }

    routeInfo.handler(req, res);
  } catch (error) {
    return writeRes(res, 500, JSON.stringify({ error }));
  }
}

function findMatchingRoute(method, url) {
  const methodUpper = method.toUpperCase();
  let urlParts = url.split("/").filter((part) => part !== "");

  const findIndex = urlParts.findIndex((url) => url.includes("."));
  if (findIndex >= 0) {
    urlParts.splice(findIndex);
  }

  for (const route of controllers) {
    let current = route;
    let match = true;
    let params = {};

    for (let i = 0; i < urlParts.length; i++) {
      const part = urlParts[i];
      const keys = Object.keys(current);

      if (keys.includes(part)) {
        current = current[part];
      } else {
        const dynamicKey = keys.find((key) => key.startsWith(":"));
        if (dynamicKey) {
          const paramName = dynamicKey.slice(1);
          params[paramName] = part;
          current = current[dynamicKey];
        } else {
          match = false;
          break;
        }
      }
    }

    if (match && current.method === methodUpper) {
      return {
        handler: (req, res) => {
          req.params = params; 
          current.handler(req, res);
        },
      };
    }
  }

  return null;
}

function start() {
  let myServer = http.createServer((request, response) => {

    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.log("WARNING: POST data is not a json.");
      }
      request.data = data;
      handleRequest(request, response);
    });
  });
  myServer.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
  });
}

function writeRes(response, status, body, cookie) {
  if (cookie) {
    response.setHeader(
      "Set-Cookie",
      `accessToken=${cookie}; HttpOnly; Max-Age=30; SameSite=Strict`
    );
  }
  response.writeHead(status);
  response.write(body);
  response.end();
}


module.exports = {
  use,
  start,
  writeRes,
};
