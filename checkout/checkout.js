let today = new Date();
let dd = today.getDate() + 1;
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("date").setAttribute("min", today);

//checkbox limits
var queue = [];
function checking(id) {
  queue.push(id);
  if (queue.length === 3) {
    queue[0].checked = false;
    queue.shift();
  }
  console.log(queue);
}
