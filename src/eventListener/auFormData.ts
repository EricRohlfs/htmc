
export function getSelects(hostEle:HTMLElement) {
  // todo: might be helpful to return the the options too
  // todo: how to handle multiple selects
  const selects = hostEle.querySelectorAll(':scope select')
  if (selects === null) { return null }
  return Array.from(selects).map( (selectEle :HTMLSelectElement)=> {
    const selectedOption = selectEle.options[selectEle.selectedIndex];
    const val = {
      name: selectEle.name,
      value: selectedOption.value
    }
    // add in the text just for good measure
    const text ={
      name: selectEle.name + '_text',
      value: selectedOption.text
    }
    return [val, text]
  })
}


/**
 * Most targets are buttons that are clicked on 
 * but could be input elements that are being triggered on every keyup
 * This is one way to communicate to the component or even the server this information.
 *  Also remember that the orginial element will soon be destroyed so we can't pass that around.
 */
function addEventTarget(controls, ele){
  controls.push({
    name:'_event_target_tagname',
    value:ele.tagName.toLowerCase()
  })

  // think e.target.name like as in an input element that has a name and a value
  // but not every element will have a name value
  controls.push({
    name:'_event_target_name',
    // @ts-ignore
    value:ele?.name?.toLowerCase() ?? ''
  })
  controls.push({
    name:'_event_target_value',
    value:ele.tagName.toLowerCase()
  })
}


/**
 * query known form element types and make new FormData out of them.
 * the list of form control elements https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
 * 
 * To support
 * - button
 * - input
 * - textarea
 * - select
 * - output
 * 
 *  Not supported
 * - fieldset
 * - object
 * @node - this could be the element target or it could be the included wrapping element like as in the form
 * @param ele - the element the event was triggered on basically e.target
 */
export function makeFormData(node: HTMLElement, ele:HTMLElement): FormData {
  // todo: could see if it is already a form and just return all the controls 
  
  // is single input element so no children to query
  const controls = []
  if (node.tagName === 'INPUT') {
    controls.push(node);
  }
  if (node.tagName === 'BUTTON') {
    controls.push(node)
  }
  // todo:get all form controls
  const inputs = node.querySelectorAll(':scope input')
  controls.push(...inputs)// might not want to spread here, but quick and easy
  // todo: need to do other controls here
  const selects = getSelects(node)
  selects.forEach(sel=>{
    controls.push(...sel)
  })

  addEventTarget(controls, ele)

  const fd = new FormData()

  controls.forEach(ctrol => {
    if (fd.has(ctrol.name)) {
      console.warn(`Developer, you may have a copy/paste error in your form or au-include tree. There is more than one form control with the name ${ctrol.name}`)
    }
    fd.set(ctrol.name, ctrol.value)
  })

  return fd;
}
