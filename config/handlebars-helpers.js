const genreList = require("./genrelist");
module.exports = {
  // Helper function to do basic mathematical operation in handlebar

  math: function (lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue,
    }[operator];
  },
  // Helper function: Cut full-dates to year only
  slicedate: function (longdate) {
    return longdate ? longdate.slice(0, 4) : "N/A";
  },
  // Helper function: convert genre_id array to genre names
  genreconverter: function (genreArr) {
    return genreArr.slice(0, 3).map((x) => ` ${genreList[x]}`);
  },
};
