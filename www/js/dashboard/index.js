import api from './api/index.js'
import dataFetcher from '../utils/dataFetcher.js'
import EventManager from './events/EventManager.js'
import SideBar from './sidebar/index.js';
import DisplayPanel from './display-panel/index.js'

 
const displayPanel = DisplayPanel();
const sideBar = SideBar()
const eventManager = EventManager.getInstance();




eventManager.handle.addEventListener('updateDisplay', (e)=>{
      displayPanel.updateDisplay(e.detail)
})



 

const appInit = async function (){
       const departmentData = await dataFetcher.getRequest(api.getAllDepartments)
       const defaultWidgitData = await dataFetcher.getRequest(api.getDepartment("training"))
       console.log(departmentData)
       sideBar.init(departmentData)
       displayPanel.init(defaultWidgitData)
}

appInit()
 


 
 