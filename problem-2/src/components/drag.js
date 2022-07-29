export const findTarget= function (e, timing) {
  let target = e.target;
  let i = 0;
  // debugger
  // console.log(this)
  if(target.getAttribute('is-member') && timing === 'dragstart') {
    while((target && !target.classList.contains('member'))&&i<10) {
      target = target.parentNode;
      i++;
    }
    // debugger
    // this.$emit('startMemberFn', target.getAttribute('member'));
    this.onStartMemberFn(target.getAttribute('member'))
  } else if(timing === 'dragstart') {
    this.onStartMemberFn(null)
  }
  while((target && !target.classList.contains('box-card'))&&i<10) {
    target = target.parentNode;
    i++;
  }
  return target;
}
export const findOrg=function (targetId) {
  let orgs = [this.org];
  let target;
  // const target = orgs.find(el=> el.id === targetId);
  while(!target&&orgs.length) {
    const arr=[];
    for(let i = 0;i<orgs.length;i++) {
      if(orgs[i].children) {
        arr.concat(orgs[i].children);
      }
      if(orgs[i].id===targetId) {
        target = orgs[i]
      }
    }
    orgs = arr;
  }
  // console.log(target, targetId)
  return target;
}
export const dragstart= function(e){
  // debugger
  e.stopPropagation();
  // console.log(122, e.target)
  const targetId = this.findTarget(e, 'dragstart')?.getAttribute('org-id');
   
  this.startTarget =this.findOrg(targetId)
  // this.$emit("dragStartFn", this.startTarget);
  // debugger
  this.onDragStartFn(this.startTarget)

  // console.log(this.startTarget)
  // console.log(e)
}
export const drag= function(e){
  // debugger
  e.stopPropagation();
}
export const dragenter= function(e){
  // debugger
  e.stopPropagation();
  e.preventDefault();
  // console.log(11)
  // console.log(e, e.target.parentNode)
  const target = this.findTarget(e);
  // console.log(target)
  target.classList.add('enter-card')
}
export const dragover= function(e) {
  e.stopPropagation();
  e.preventDefault();
  // console.log(this)
  const target = this.findTarget(e);
  // console.log(target)
  target.classList.add('enter-card')
}
export const dragleave= function(e) {
  e.stopPropagation();
  const target = this.findTarget(e);
  target.classList.remove('enter-card')
}
export const drop = function(e) {
  // debugger
  e.stopPropagation();
  e.preventDefault();
  const targetId = this.findTarget(e)?.getAttribute('org-id');
  this.endTarget = this.findOrg(targetId)
  // this.$emit('dropEndFn', this.endTarget);
  this.onDropEndFn(this.endTarget)
  this.startTarget = null;
  this.endTarget = null;
  // console.log(this.startTarget,this.endTarget)
} 