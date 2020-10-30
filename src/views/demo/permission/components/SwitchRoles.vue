<template>
  <div>
    <div style="margin-bottom:15px;">
      当前角色: {{ roles }}
    </div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      const roles = this.$store.getters.roles
      return roles.map(item => Object.values(item).toString())
    },
    switchRoles: {
      get() {
        return JSON.stringify(this.roles).includes('demo_admin') ? 'admin' : 'editor'
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
