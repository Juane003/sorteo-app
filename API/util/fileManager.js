const fs = require("fs");

fs.readFile("./alumnosApi", "UTF-8", (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const array = data.toString().split('\r\n\"');

    const json = [];
    let index = 0;

    for (let persona of array) {

      const surname = persona.replace('"', "").replace(" ", "").split(",")[0];

      const name = persona.replace('"', "").replace(" ", "").split(",")[1];

      json.push({
        apellido : surname,
        nombre : name,
        id : index + 1
      });
      index++;
    }
    saveJson(JSON.stringify(json));
  }
  
});

const saveJson = (json) => {
  fs.writeFile("alumnos.json", json, (err) => console.log(err));
}




