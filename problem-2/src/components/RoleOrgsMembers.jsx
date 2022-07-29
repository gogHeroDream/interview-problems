import {findTarget, findOrg, dragstart, drag, dragenter, dragover, dragleave, drop} from "./drag";
export default {
  props: {
    member: {
      type: String,
    },
    org: {
      type: Object,
    },
  },
  inject: {
    members: {
      default: [],
    },
  },
  data() {
    return {
      startTarget: null,
      startMember: null,
      endTarget: null,
    }
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
  render() {
    // console.log(this.members)
    const renderMember = (memberId) => {
      const member = this.members.find((el) => el.id === memberId);
      if (member) {
        return (
          <div is-member="true">
            <span is-member="true">{member.name || "xxx"}</span>---
            <span is-member="true">{member.age || "xxx"}</span>---
            <span is-member="true">{member.status}</span>
          </div>
        );
      } else {
        return "";
      }
    };
    return (
      <div
        class="member"
        draggable="true"
        is-member="true"
        member={this.member}
        onDragstart={this.dragstart}
        onDrag={this.drag}
        onDragenter={this.dragenter}
        onDragover={this.dragover}
        onDragleave={this.dragleave} 
        onDrop={this.drop}
      >
        {renderMember(this.member)}
      </div>
    );
  },
};
