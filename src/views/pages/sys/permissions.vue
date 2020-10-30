<template lang="pug">
	#sys
		div
			el-button(type="primary" icon="el-icon-plus" @click="allOpenNodes") 全部展开
			el-button(type="primary" icon="el-icon-minus" @click="allCloseNodes") 全部折叠
			el-button(type="primary" icon="el-icon-refresh" @click="onRefreshNodes") 刷新
			.sys-premission
				el-tree(
					ref="tree"
					:check-strictly="checkStrictly"
					:data="routesData"
					:props="defaultProps"
					accordion
					highlight-current
					:default-expanded-keys='[1]'
					:current-node-key='1'
					node-key="id"
					class="permission-tree"
					@node-click="nodeClick"
				)

		div
			el-button(type="primary" icon="el-icon-plus" @click="showDialog=true") 插入节点
			el-button(type="warning" icon="el-icon-edit" @click="editNode") 修改节点
			el-button(type="danger" icon="el-icon-delete" @click="delNode") 删除节点

			.permission-detail
				el-input(:value="curSelectedNode.code" readonly)
					template(slot="prepend") 权限编码
				el-input(:value="curSelectedNode.permissionName" readonly)
					template(slot="prepend") 权限名称
				el-input(:value="curSelectedNode.uri" readonly)
					template(slot="prepend") 权限URI
				el-input(:value="permissionMenu" readonly)
					template(slot="prepend") 权限类型
				el-input(:value="curSelectedNode.icon" readonly)
					template(slot="prepend") 菜单图标
				el-input(:value="curSelectedNode.checkCode" readonly)
					template(slot="prepend") 校验字符
				el-input(:value="curSelectedNode.permissionSort" readonly)
					template(slot="prepend") 展示顺序
		el-dialog(title="新增权限" :visible.sync="showDialog" @closed="resetForm")

			el-form.form(:model="permissionForm" :rules="rules" ref="permissionForm")
				el-form-item(label="父节点名称" label-width="120px" required)
					el-input(:value="parentNodeName" autocomplete="off" disabled)

				el-form-item(label="权限编码" label-width="120px" prop="code")
					el-input(v-model="permissionForm.code" autocomplete="off")

				el-form-item(label="权限名称" label-width="120px" prop="permissionName")
					el-input(v-model="permissionForm.permissionName" autocomplete="off")

				el-form-item(label="权限地址" label-width="120px" prop="uri")
					el-input(v-model="permissionForm.uri" autocomplete="off")

				el-form-item(label="权限类型" label-width="120px" prop="permissionType")
					el-select(v-model="permissionForm.permissionType" placeholder="请选择" style="width: 100%")
						el-option(label="菜单" value="menu")
						el-option(label="操作" value="operation")

				el-form-item(label="菜单图标" label-width="120px" prop="icon")
					el-input(v-model="permissionForm.icon" autocomplete="off")

				el-form-item(label="校验字符" label-width="120px" prop="checkCode")
					el-input(v-model="permissionForm.checkCode" autocomplete="off")

				el-form-item(label="展示顺序" label-width="120px" prop="permissionSort")
					el-input(v-model="permissionForm.permissionSort" autocomplete="off")

			.dialog-footer(slot="footer")
				el-button.confirm(@click="validForm" type="primary" icon="el-icon-circle-check") 保 存
				el-button(@click="showDialog = false" icon="el-icon-circle-close") 关 闭
</template>

<script>
import { getAllPermissions } from '@/api/role'

const defaultNode = {
  data: {
    attr: {
      permissionName: '系统权限',
      permissionType: 'operation',
      permissionSort: 1,
      icon: '',
      code: 1,
      checkCode: '',
      uri: ''
    },
    id: 1,
    label: '系统权限'
  }
}
export default {
  name: 'Permissions',
  components: {},
  mixins: [],
  data() {
    return {
      str: '',
      defaultProps: {
        label: 'label',
        childrend: 'children'
      },
      checkStrictly: false,
      routes: [],
      curNode: defaultNode,
      showDialog: false,
      permissionForm: {
        permissionName: '',
        code: '',
        icon: '',
        uri: '',
        checkCode: '',
        permissionSort: '',
        permissionType: ''
      },
      rules: {
        permissionName: [{ required: true, message: '请输入活动名称' }],
        permissionType: [{ required: true, message: '请选择权限类型' }],
        code: [{ required: true, message: '请输入权限编码' }]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    },
    parentNodeName() {
      if (this.curNode && this.curNode.data) {
        return this.curNode.data.label
      }
      return ''
    },
    curSelectedNode() {
      if (this.curNode && this.curNode.data) {
        return this.curNode.data.attr
      }
      return {}
    },
    permissionMenu() {
      if (!this.curSelectedNode.permissionType) {
        return ''
      }
      if (this.curSelectedNode.permissionType === 'menu') {
        return '菜单'
      }
      return '操作'
    },
    isRootNode() {
      return this.curNode.data.label === '系统权限'
    }
  },
  created() {
    this.getAllPermissions()
  },
  methods: {
    async getAllPermissions() {
      const allPermission = await getAllPermissions(1)
      this.routes = this.generateTree(allPermission, 0)
    },
    allOpenNodes() {
      const allNodes = this.$refs.tree.store._getAllNodes()
      for (let i = 0; i < allNodes.length; i++) {
        allNodes[i].expanded = true
      }
    },
    allCloseNodes() {
      const allNodes = this.$refs.tree.store._getAllNodes()
      for (let i = 0; i < allNodes.length; i++) {
        allNodes[i].expanded = false
      }
    },
    onRefreshNodes() {
      this.getAllPermissions()
    },
    nodeClick(obj, node) {
      this.curNode = node
    },
    editNode() {
      if (this.isRootNode) {
        this.$message.error(`根节点不允许修改`)
        return
      }
      this.showDialog = true
    },
    delNode() {
      if (this.isRootNode) {
        this.$message.error(`根节点不允许删除`)
        return
      }
      this.$confirm('确认删除该节点，删除后不可恢复，是否继续？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const tree = this.$refs.tree
          tree.remove(this.curNode)
          tree.setCurrentKey(1)
          this.curNode = defaultNode
          this.$message.success('删除成功')
        })
        .catch(() => this.$message.info('已取消删除'))
    },
    addNode() {
      this.$refs.tree.append(
        {
          id: 1e9 + ~~(Math.random() * 1e4),
          label: this.permissionForm.permissionName,
          attr: Object.assign({}, this.permissionForm)
        },
        this.curNode
      )
      this.showDialog = false
      this.$message.success('添加成功')
      this.curNode.expanded = true
    },
    validForm() {
      this.$refs['permissionForm'].validate(result => {
        console.log(result)
        if (result) {
          this.addNode()
        } else {
          this.$message.error('验证未通过')
        }
      })
    },
    resetForm() {
      this.$refs['permissionForm'].resetFields()
    },
    /**
     * 根据数据生成相应节点树，生成树的格式为{label, id, children, attr}
     * @param permissions 权限列表
     * @param parentId 父节点ID
     * @param treeList 生成的节点数列表
     * @returns {*[]}
     */
    generateTree(permissions, parentId, treeList = []) {
      permissions.map(item => {
        // 找出当前父节点的所有子节点
        if (parentId === item.parentId) {
          // permissionId为1时，为树的根节点
          // 此处判断当uri(节点的权限地址)是#或为空时，表示该节点是一个父节点
          if (item.uri === '' || item.uri === '#' || item.permissionId === 1) {
            treeList.push({
              id: item.permissionId,
              label: item.permissionName,
              attr: item,
              children: []
            })
            // 深度递归父节点权限列表，找出所有子节点
            this.generateTree(
              permissions,
              item.permissionId,
              treeList[treeList.length - 1].children
            )
          } else {
            treeList.push({
              attr: item,
              id: item.permissionId,
              label: item.permissionName
            })
          }
        }
      })
      return treeList
    }
  }
}
</script>

<style scoped lang="scss">
#sys {
  display: flex;
  flex-wrap: nowrap;
  padding: 20px 10px 0;
  font-size: 16px;
  .el-button,
  .el-button span {
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  & > div {
    flex-basis: 50%;
  }
  .sys-premission {
    width: 60%;
    margin-top: 20px;
  }

  .dialog-footer {
    text-align: center;

    .confirm {
      margin-right: 10px;
    }
  }

  .form {
    display: flex;
    flex-wrap: wrap;
    margin-right: 70px;

    .el-form-item {
      flex-basis: 50%;
    }
  }

  .permission-detail {
    margin-top: 20px;
    .el-input {
      margin-bottom: 14px;
    }
  }
}
</style>
<style>
.el-input-group__prepend {
  width: 97px;
}
</style>
