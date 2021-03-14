import ejs from '../../_snowpack/pkg/ejs.js'



function renderTemplate(template, data){ 
    return ejs.render(template, {data})
}


export default renderTemplate