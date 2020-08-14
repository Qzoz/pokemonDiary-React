const getPokeIdFromUrl = (url) => {
  if (url[url.length - 1] === "/") url = url.substring(0, url.length - 1);
  const toklist = url.split("/");
  return parseInt(toklist[toklist.length - 1]);
};

const capitalizedName = (name) => {
  if (!name) return name;
  const nameList = name.split(" ");
  return nameList
    .map((nm) => {
      return nm[0].toUpperCase() + nm.substring(1);
    })
    .join(" ");
};

const capitalizedNameDash = (name) => {
  if (!name) return name;
  const nameList = name.split("-");
  return nameList
    .map((nm) => {
      return nm[0].toUpperCase() + nm.substring(1);
    })
    .join("-");
};

const getPokeUrlWithIdPad = (url="", id=Number, ext=String, appendSpecs="", size=3, pad="0") => {
  return url + `${id}`.padStart(size, pad) + appendSpecs + ext;
};

export { getPokeIdFromUrl, capitalizedName, getPokeUrlWithIdPad, capitalizedNameDash };
