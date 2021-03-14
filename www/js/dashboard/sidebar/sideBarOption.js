import {optionTemplate} from './sideBarTemplates.js'
import renderToElement from '../../utils/renderToElement.js'
import renderTemplate from '../../utils/renderTemplate.js'
import EventsManager from '../events/EventManager.js'

const eventManager = EventsManager.getInstance();
const updateEvent = new CustomEvent('sideBarSelect', {bubbles:true, detail:{name:null}})

const sideBarOption = function(data){
   const template =   renderTemplate(optionTemplate, data)     
   const elem = renderToElement(template)
   elem.addEventListener('click', onSelect)
      return elem
}

const onSelect = (e)=>{
      updateEvent.detail.name = e.currentTarget.dataset.name 
      eventManager.handle.dispatchEvent(updateEvent)
}

export default sideBarOption 
 