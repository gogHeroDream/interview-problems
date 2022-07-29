import RoleOrgsMembers from "./RoleOrgsMembers";
import { reactive, toRefs } from "vue";
import {findTarget, findOrg, dragstart, drag, dragenter, dragover, dragleave, drop} from "./drag";
export default {
  name: "RoleOrgs",
  props: {
    org: {
      type: Object,
    },
  },
  components: {
    RoleOrgsMembers,
  },
  methods: {
    findTarget, findOrg, dragstart, drag, dragenter, dragover, dragleave, drop,
  },
  created() {
    this.findTarget = this.findTarget.bind(this);
    this.findOrg = this.findOrg.bind(this);
    this.dragstart= this.dragstart.bind(this);
    this.drag = this.drag.bind(this);
    this.dragenter= this.dragenter.bind(this);
    this.dragover = this.dragover.bind(this);
    this.dragleave = this.dragleave.bind(this);
    this.drop = this.drop.bind(this);
    
    for(let key in this.$attrs) {
      if(typeof this.$attrs[key] === 'function') {
        this[key]= this.$attrs[key].bind(this);
      }
    }
  },
  setup() {
    const state = reactive({
      startTarget: null,
      endTarget: null,
    });
    return { ...toRefs(state) };
  },
  render() {
    const renderMembers = (list) => {
      return list.map((item) => (
        <RoleOrgsMembers
          {
            ...this.$attrs
          }
          org={this.org}
          member={item}
        />
      ));
    };
    const renderChildren = (list) => {
      if (Array.isArray(list)) {
        // onDragStartFn={(data) => this.$emit("dragStartFn", data)}
        // onDropEndFn={(data) => this.$emit("dropEndFn", data)}
        return list.map((item) => (
          <RoleOrgs
            {
              ...this.$attrs
            }
            org={item}
            key={item.id}
          ></RoleOrgs>
        ));
      } else return "";
    };
    /**
    // let startTarget,endTarget;
    const findTarget = (e) => {
      let target = e.target;
      let i = 0;
      // console.log(target.classList.contains('box-card'))
      while (target && !target.classList.contains("box-card") && i < 10) {
        target = target.parentNode;
        i++;
      }
      return target;
    };
    const findOrg = (targetId) => {
      let orgs = [this.org];
      let target;
      // const target = orgs.find(el=> el.id === targetId);
      while (!target && orgs.length) {
        const arr = [];
        for (let i = 0; i < orgs.length; i++) {
          if (orgs[i].children) {
            arr.concat(orgs[i].children);
          }
          if (orgs[i].id === targetId) {
            target = orgs[i];
          }
        }
        orgs = arr;
      }
      // console.log(target, targetId)
      return target;
    };
    const dragstart = (e) => {
      // debugger
      e.stopPropagation();
      // console.log(122, e.target)
      const targetId = findTarget(e)?.getAttribute("org-id");

      this.startTarget = findOrg(targetId);
      // this.$emit("dragStartFn", this.startTarget);
      this.onDragStartFn(this.startTarget);
      // console.log(this.startTarget)
      // console.log(e)
    };
    const drag = (e) => {
      // debugger
      e.stopPropagation();
    };
    const dragenter = (e) => {
      // debugger
      e.stopPropagation();
      e.preventDefault();
      // console.log(11)
      // console.log(e, e.target.parentNode)
      const target = findTarget(e);
      // console.log(target)
      target.classList.add("enter-card");
    };
    const dragover = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = findTarget(e);
      // console.log(target)
      target.classList.add("enter-card");
    };
    const dragleave = (e) => {
      e.stopPropagation();
      const target = findTarget(e);
      target.classList.remove("enter-card");
    };
    const drop = (e) => {
      // debugger
      e.stopPropagation();
      e.preventDefault();
      const targetId = findTarget(e)?.getAttribute("org-id");
      this.endTarget = findOrg(targetId);
      // this.$emit("dropEndFn", this.endTarget);
      this.onDropEndFn(this.endTarget)
      this.startTarget = null;
      this.endTarget = null;
      // console.log(this.startTarget,this.endTarget)
    };
    */
    return (
      <div className="role-card">
        <el-card
          org-id={this.org.id}
          class="box-card"
          draggable="true"
          onDragstart={this.dragstart}
          onDrag={this.drag}
          onDragenter={this.dragenter}
          onDragover={this.dragover}
          onDragleave={this.dragleave}
          onDrop={this.drop}
          v-slots={{
            header: () => (
              <el-row gutter={20} class="card-header flex-center">
                <span class="flex-center">组织名称: </span>
                <el-input v-model={this.org.name} placeholder="Please input" />
              </el-row>
            ),
          }}
        >
          {renderMembers(this.org.members || [])}
        </el-card>
        {renderChildren(this.org.children||[])}
      </div>
    );
  },
};
