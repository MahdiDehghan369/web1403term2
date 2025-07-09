const fs = require('fs');
const path = require('path');

const findUser = (username) => {
  if (!username) return false;

  const dbPath = path.join(__dirname, "..", "db", "db.json");

  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    const dataObj = JSON.parse(data);
    return dataObj.records.some(
      (element) => element.user === username.toString()
    );
  } catch (err) {
    console.error("Error reading file:", err);
    return false;
  }
};


module.exports = findUser