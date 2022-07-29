import RoleOrgs from "./RoleOrgs"
import {reactive, toRefs} from 'vue'
import { ElMessage } from 'element-plus'
export default{
  components: {
    RoleOrgs
  },
  props: {
    orgs: {
      type: Array
    }
  },
  setup(props) {
    // 处理成树状数据
    const orgsData = dealOrgs(props.orgs, [])
    // console.log(orgsData)
    const state = reactive({
      orgsData,
      dragStartData: null,
      dropEndData: null,
      startMember: null,
    })
    const resetDragData=()=> {
      state.dragStartData = null;
      state.dropEndData = null;
      state.startMember = null;
    }
    return {...toRefs(state),resetDragData}
  },
  render() {
    const checkStartIsEndOrg=() => {
      // debugger
      if(this.dragStartData === this.dropEndData&&!this.startMember) {
        ElMessage({
          message: 'Warning, start and end is same card.',
          type: 'warning',
        })
        return this.resetDragData();
      } else {
        let endData = this.dropEndData
        let isSame= false;
        // debugger
        while(endData.parentEl&&!isSame) {
          endData = endData.parentEl;
          // debugger
          if(this.dragStartData === endData) {
            isSame = true;
          }
        };

        if(isSame && !this.startMember) {
          ElMessage({
            message: 'Warning, start is end origin.',
            type: 'warning',
          });
          return this.resetDragData();
        } else {
          // 如果移动的是一个成员
          if(this.startMember) {
            // debugger
            // console.log(this.dragStartData)
            const index = this.dragStartData.members.findIndex(member=>member===this.startMember)
            if(index>-1) {
              // debugger
              this.dropEndData.members??=[];
              this.dropEndData.members.push(...this.dragStartData.members.splice(index,1));
              ElMessage({
                message: 'Success, move member success.',
                type: 'success',
              });
            }
          } else { //移动的是一个组织
            // debugger
            let startIndex;
            let startData;
            if(this.dragStartData.parent) {
              startIndex = this.dragStartData.parentEl.children.findIndex(el=> el === this.dragStartData);
              startData = this.dragStartData.parentEl.children.splice(startIndex,1)[0];
            } else {
              startIndex = this.orgsData.findIndex(el=> el === this.dragStartData);
              startData = this.orgsData.splice(startIndex,1)[0];
            }
            const endTarget =  this.dropEndData;
            startData.parent = endTarget.id;
            startData.parentEl = endTarget;
            endTarget.children= endTarget.children ? endTarget.children.concat(startData): [startData];
            console.log(this.orgsData)
            ElMessage({
              message: 'Success, move org success.',
              type: 'success',
            });
          }
          // debugger
          return this.resetDragData();
        }

      }
    }
    const dragStartFn = (msg) => {
      this.dragStartData = msg;
    }
    const dropEndFn = (msg)=> {
      // debugger
      console.log(msg)
      this.dropEndData = msg;
      checkStartIsEndOrg();
    }
    const startMemberFn=(msg)=> {
      // debugger
      this.startMember = msg;
      // console.log(this.startMember)
    }
    const renderOrgs = (list) => {
      return list.map((item,i)=> {
        return <RoleOrgs onStartMemberFn={startMemberFn} onDragStartFn={dragStartFn} onDropEndFn={dropEndFn} org={item} key={item.id}></RoleOrgs>
      })
    }
    return (
      <div class="role">
        <header>组织管理</header>
        <main>
          {renderOrgs(this.orgsData)}
          <span>添加组织</span>
        </main>
        <footer>Footer</footer>
      </div>
    )
      // <el-footer>Footer</el-footer>

      
    
  }
}
function dealOrgs(orgs) {
  const maps = new Map();
  orgs.forEach(el=> {
    maps.set(el.id, el)
  });
  let isHas = true
  const _orgs = [];
  orgs.forEach((el,i)=> {
    if(!el.parent) {
      _orgs.push(el)
      maps.delete(el.id);
    }
  })
  let otherOrgs = _orgs;

  while(maps.size&&isHas&&otherOrgs.length) {
    otherOrgs = deal(otherOrgs);
  }
  function deal(orgs=[]) {
    const _orgs = []
    maps.forEach((el,i)=> {
      const it = orgs.find(item=>item.id=== el.parent)
      if(it) {
        el.parentEl= it;
        Array.isArray(it.children) ?  (it.children.push(el)): (it.children = [el]); 
        _orgs.push(el)
        maps.delete(el.id);
      }
    })
    if(_orgs.length ===0) {
      isHas = false;
    }
    return _orgs
  }
  return _orgs
}

