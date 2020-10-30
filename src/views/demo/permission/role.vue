<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新增角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色状态" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleStatus === 'valid' ? '有效' : '无效' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" destroy-on-close>
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="权限列表">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            accordion
            node-key="id"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, deleteRole, getAllPermissions, getPermissions } from '@/api/role'

const defaultRolePermission = {
  code: null,
  createDate: '2017-05-05 09:25:56',
  description: '系统管理员',
  haveNolist: null,
  havelist: null,
  orgName: null,
  roleId: 1,
  roleName: '系统管理员',
  roleSort: null,
  roleStatus: 'valid'
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRolePermission),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    },
    dialogTitle() {
      return this.dialogType === 'edit' ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    async getAllPermissions(scope) {
      const allPermission = await getAllPermissions(scope.row.roleId)
      this.routes = this.generateTree(allPermission, 0)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    generateTree(permissions, parentId, list = []) {
      permissions.map(item => {
        if (parentId === item.parentId) {
          if (item.uri === '' || item.uri === '#' || item.permissionId === 1) {
            list.push({
              id: item.permissionId,
              label: item.permissionName,
              children: []
            })
            this.generateTree(permissions, item.permissionId, list[list.length - 1].children)
          } else {
            list.push({
              id: item.permissionId,
              label: item.permissionName
            })
          }
        }
      })
      return list
    },
    generateCheckedNodes(permissions, parentId, list = []) {
      permissions.map(item => list.push({ id: item.permissionId }))
      return list
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRolePermission)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    async handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      await this.getAllPermissions(scope)
      const res = await getPermissions(scope.row.roleId)
      this.$nextTick(async() => {
        this.$refs.tree.setCheckedNodes(this.generateCheckedNodes(res.permissions, 0))
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认删除该角色吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      console.log('checkedKeys => ', checkedKeys)

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
