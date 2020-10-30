<template lang="pug">
	div
		el-table(v-bind="$attrs" v-on="$listeners")
			slot
		el-pagination.pagination-container(
			v-bind="$attrs"
			v-if="isShowPage"
			:current-page.sync="curPage"
			:page-size.sync="pageSize"
			:layout="layout"
			:total="total"
			:background="background"
			@size-change="onSizeChange"
			@current-change="onCurrentChange"
		)
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'ExTable',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    },
    curPage: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val)
      }
    },
    isShowPage() {
      return (this.total / this.limit) > 1
    }
  },
  methods: {
    onSizeChange(val) {
      this.$emit('pageChange', { currentPage: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    onCurrentChange(val) {
      this.$emit('pageChange', { currentPage: 1, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
	.pagination-container {
		background: #fff;
		padding: 16px;
	}
	.pagination-container.hidden {
		display: none;
	}
</style>
