<template>
  <Role class="role-page" :orgs="orgs"></Role>
</template>
<script>
import Role from "./components/Role"
import { reactive, toRefs, provide } from 'vue';
import orgs from "../public/orgs.json"
import members from "../public/members.json"
export default {
  components: {
    Role
  },
  setup() {
    const state = reactive({
      orgs,
      members,
    })
    provide('members', state.members);
    return {...toRefs(state)}
  },
}

</script>
<style lang="scss" scoped>
::v-deep{
  .flex-center{
    display:flex;
    justify-content: center;
    align-items: center;
  }
}
::v-deep.role-page{
  height: 100vh;
  width: 100vw;
  display:flex;
  flex-direction: column;
  header{
    height: 50px;
    display: flex;
    align-items: center;
    padding-left:10px;
  }
  main{
    // min-height: calc(100% - 100px);
    display: flex;
    align-items: flex-start;
    padding-left:10px;
    flex-direction: column;
    .role-card{
      margin-top:25px;
      margin-left: 25px;
      .el-card{
        width: 350px;
        &.enter-card{
          border: 1px solid red;
        }
      }
      .enter-card{
        border: 1px solid red;
      }
    }
    .card-header{
      display: flex;
      flex-direction: row;
      >span{
        flex:3;
      }
      >div.el-input{
        flex:7;
      }
    }
  }
  footer{
    height: 50px;
    display: flex;
    align-items: center;
    padding-left:10px;
  }
}
</style>
