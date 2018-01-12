
function formatDate(strDate){
  var dtDate = new Date(strDate);
  var month = dtDate.getMonth() +1;
  var strDate = dtDate.getFullYear();
  strDate += "-";
  strDate += (month <10 ? "0"+month : month );
  strDate += "-";
  strDate += (dtDate.getDate()<10 ? "0"+dtDate.getDate():dtDate.getDate() );
  strDate += " ";
  strDate += (dtDate.getHours() <10 ? "0"+dtDate.getHours() : dtDate.getHours());
  strDate += ":";
  strDate += (dtDate.getMinutes() <10 ? "0"+dtDate.getMinutes() : dtDate.getMinutes());
  strDate += ":";
  strDate += (dtDate.getSeconds() <10 ? "0"+dtDate.getSeconds() : dtDate.getSeconds());
  return strDate;
}

function formatDate2(strDate){
  var dtDate = new Date(strDate);
  var month = dtDate.getMonth() +1;
  var strDate ="";
  strDate += (month <10 ? "0"+month : month );
  strDate += "月";
  strDate += (dtDate.getDate()<10 ? "0"+dtDate.getDate():dtDate.getDate() );
  strDate += " ";
  strDate += dtDate.getFullYear();

  return strDate;
}