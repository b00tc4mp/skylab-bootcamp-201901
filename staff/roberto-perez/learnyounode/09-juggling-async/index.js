let http = require("http");
let bl = require("bl");

let result = [];
let count = 0;

const httpGet = index => {
  http.get(process.argv[2 + index], response => {
    response.pipe(
      bl((err, data) => {
        if (err) return console.error(err);
        result[index] = data.toString();
        count++;
        if (count === 3) {
          result.forEach(element => console.log(element));
        }
      })
    );
  });
};

for (var i = 0; i < 3; i++) {
  httpGet(i);
}
