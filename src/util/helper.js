function printDate() {
  const time = new Date();
  console.log("The current date is :", time.getDate());
  printMonth();
}
function printMonth() {
  const time = new Date();
  console.log("The current month is :", time.getMonth() + 1);
  getBatchInfo;
}
function getBatchInfo() {
  console.log(
    "our batch is -> plutonium,week 3 Day 5, the topic of today nodejs modulev system"
  );
}
module.exports.printDate = printDate;
module.exports.getBatchInfo = getBatchInfo;
