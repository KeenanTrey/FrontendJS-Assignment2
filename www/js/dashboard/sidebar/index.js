import sideBarOptions from "./sideBarOptions.js";
import sideBarOpiton from "./sideBarOption.js";
import sideBarOption from "./sideBarOption.js";

const container = document.querySelector("#sidebar");


const SideBar = function(){

const init = function (data) {
  const parentElement = sideBarOptions();
  data.forEach((item) => {
    const childElement = sideBarOption(item);
    parentElement.append(childElement);
  });

  container.append(parentElement);
};

    return {init}
}

 

export default SideBar;
