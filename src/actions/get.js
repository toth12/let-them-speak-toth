export const get = (url, success, err, progress) => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status === 200) {
        if (success) success(xmlhttp.responseText)
      } else {
        if (err) err(xmlhttp)
      }
    }
  };
  xmlhttp.onprogress = (e) => {if (progress) progress(e)};
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
};