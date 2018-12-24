<template inline-template>
  <div>
    <div :style="vtContainerStyle" :ref="'vt-container'">
      <table :width="tableWidth">
        <thead>
          <tr>
            <th style="padding-bottom: 15px" :colspan="columns.length">
              <input v-model="searchValue" v-on:input="changeFilterValue" placeholder="Search All" />
            </th>
          </tr>
          <tr>
            <th
              v-for="column in columns"
              v-on:click="changeSortedCol(column.accessor)">
              <button :class="headerLineStyle(column.accessor)">{{ column.header }}</button>
            </th>
          </tr>
          <tr v-if="showFilters">
            <td
              v-for="filteredCol in filteredCols">
              <input v-model="filteredCol.value" v-on:input="changeFilterValue" />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in vtRows" v-if="showPagination ? index >= startIndex && index <= endIndex : true">
            <td
              v-for="column in columns"
              v-on:click="() => {if(column.editable){changeEditCol(row.id, column, row[column.accessor])}}"
              :style="{width: column.minWidth || 100}">
              <span
                v-if="!column.editable || selectedEditCell.id !== row.id || selectedEditCell.accessor !== column.accessor"
                name="vt-edit-input">
                <span v-if="!column.customCell" style="text-overflow: ellipsis;">{{ row[column.accessor] }}</span>
                <span>
                  <slot
                    :name="column.accessor"
                    :colData="row[column.accessor]"
                    :rowData="row">
                  </slot>
                </span>
              </span>
              <span
                v-if="column.editable"
                v-show="column.editable && selectedEditCell.id === row.id && selectedEditCell.accessor === column.accessor">
                <input
                  v-model="row[column.accessor]"
                  v-on:keyup.enter="resetEditCol(row)"
                  v-on:keyup.27="resetEditCol(row, true)"
                  v-on:focusout="focusOut(row)"
                  :ref="`vt-edit-input-${row.id}-${column.accessor}`"
                  :maxlength="column.maxLength">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div :style="{width: vtContainerStyle.width}" v-if="showPagination">
      <table style="width: 100%;">
        <tr>
          <th style="width: 30%; text-align: center;"
            :class="page > 1 ? '' : 'disabled'"
            v-on:click="handlePrevClick">
            <button>Previous</button>
          </th>
          <th style="width: 40%; text-align: center; font-weight: normal; font-size: 12px">
            <p>
              Rows per page
              <select v-model="pageSize">
                <option v-for="pageS in pageSizes">{{ pageS }}</option>
              </select>
            </p>
            <p>
              Page {{ page }}
            </p>
          </th>
          <th
            style="width: 30%; text-align: center;"
            :class="vtRows.length > page * pageSize ? '' : 'disabled'"
            v-on:click="handleNextClick">
            <button>Next</button>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import uniqid from 'uniqid'
  const addIds = (rows) => {
    return rows.map(row => {
      let id
      if (row.ID) {
        id = row.ID
      } else if (row.id) {
        id = row.id
      } else {
        id = uniqid()
      }
      return { ...row, id }
    })
  }
  const defaultSort = (a, b) => a.id > b.id ? 1 : -1
  const defaultSelectedEditCell = {
    id: null,
    accessor: '',
    onChange: null,
    originalValue: null
  }

  export default Vue.component('VueTable', {
    props: ['columns', 'rows', 'showFilters', 'showPagination', 'containerStyle'],
    data () {
      return {
        vtRows: [],
        searchValue: '',
        selectedEditCell: defaultSelectedEditCell,
        sortedCol: {
          direction: '',
          accessor: ''
        },
        tableWidth: 0,
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100],
        startIndex: 0,
        endIndex: 9
      }
    },
    computed: {
      idRows: function () {
        return addIds(this.rows)
      },
      filteredCols: function () {
        let fitlteredObj = {}
        this.columns.forEach(col => {
          fitlteredObj[col.accessor] = {
            filterMethod: col.filterMethod,
            value: ''
          }
        })

        return fitlteredObj
      },
      vtContainerStyle: function () {
        let style = { height: '425px', overflow: 'auto' }
        if (this.containerStyle) {
          style = { ...style, ...this.containerStyle }
        }
        return style
      }
    },
    methods: {
      changeEditCol: function (id, column, originalValue) {
        this.selectedEditCell = {
          id,
          accessor: column.accessor,
          onChange: column.onChange,
          originalValue: originalValue
        }
      },
      focusOut: function (row) {
        if (this.selectedEditCell.onChange) {
          let newRow = {}
          const originalRowKeys = Object.keys(this.rows[0])
          originalRowKeys.forEach(key => {
            newRow[key] = row[key]
          })
          this.selectedEditCell.onChange(newRow)
        }
        this.selectedEditCell = defaultSelectedEditCell
      },
      resetEditCol: function (row, esc) {
        if (esc) {
          row[this.selectedEditCell.accessor] = this.selectedEditCell.originalValue
        }
        this.focusOut(row)
      },
      changeSortedCol: function (accessor) {
        if (this.sortedCol.accessor === accessor) {
          if (!this.sortedCol.direction) {
            this.sortedCol = {
              accessor,
              direction: 'ascending'
            }
          } else if (this.sortedCol.direction === 'ascending') {
            this.sortedCol = {
              accessor,
              direction: 'descending'
            }
          } else {
            this.sortedCol = {
              accessor: '',
              direction: ''
            }
          }
        } else {
          this.sortedCol = {
            accessor,
            direction: 'ascending'
          }
        }
        this.vtRows = this.sortRows(this.vtRows)
      },
      changeFilterValue: function () {
        let newRows = [ ...this.idRows ]

        if (this.searchValue) {
          newRows = newRows.filter(row => {
            let pass = false
            this.columns.some(col => {
              if (col.filterMethod) {
                const match = col.filterMethod(row[col.accessor], this.searchValue)
                if (match) { pass = true }
                return match
              }

              const re = new RegExp(String(this.searchValue), 'i')
              const match = String(row[col.accessor]).search(re) >= 0
              if (match) { pass = true }
              return match
            })
            return pass
          })
        }

        Object.keys(this.filteredCols).forEach(accessor => {
          const selectedFilterCol = this.filteredCols[accessor]
          if (selectedFilterCol.filterMethod) {
            newRows = newRows.filter(row => selectedFilterCol.filterMethod(row[accessor], selectedFilterCol.value))
          } else {
            if (selectedFilterCol.value) {
              const re = new RegExp(String(selectedFilterCol.value), 'i')
              newRows = newRows.filter(row => String(row[accessor]).search(re) >= 0)
            }
          }
        })

        this.vtRows = this.sortRows(newRows)
      },
      headerLineStyle: function (accessor) {
        if (this.sortedCol.accessor === accessor) {
          return this.sortedCol.direction === 'ascending' ? 'overline' : 'underline'
        }

        return ''
      },
      sortRows: function (newRows) {
        if (this.sortedCol.accessor) {
          const selectedCol = this.columns.find(col => col.accessor === this.sortedCol.accessor)

          if (selectedCol.sortMethod) {
            if (this.sortedCol.direction === 'descending') {
              return newRows.sort(selectedCol.sortMethod).reverse()
            }

            return newRows.sort(selectedCol.sortMethod)
          }
          return newRows.sort((a, b) => {
            if (typeof this.rows[0][this.sortedCol.accessor] === 'string') {
              if (a[this.sortedCol.accessor].toLowerCase() < b[this.sortedCol.accessor].toLowerCase()) {
                return this.sortedCol.direction === 'ascending' ? -1 : 1
              }
              if (a[this.sortedCol.accessor].toLowerCase() > b[this.sortedCol.accessor].toLowerCase()) {
                return this.sortedCol.direction === 'ascending' ? 1 : -1
              }
              return 0
            } else if (typeof this.rows[0][this.sortedCol.accessor] === 'number') {
              if (a[this.sortedCol.accessor] < b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? -1 : 1
              }
              if (a[this.sortedCol.accessor] > b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? 1 : -1
              }
              return 0
            } else if (typeof this.rows[0][this.sortedCol.accessor] === 'boolean') {
              if (a[this.sortedCol.accessor] && !b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? -1 : 1
              }
              if (!a[this.sortedCol.accessor] && b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? 1 : -1
              }
              return 0
            }
          })
        }

        return newRows.sort(defaultSort)
      },
      handlePrevClick: function () {
        if (this.page > 1) {
          this.page = this.page - 1
        }
      },
      handleNextClick: function () {
        if (this.vtRows.length > this.page * this.pageSize) {
          this.page = this.page + 1
        }
      },
      paginationChange: function () {
        this.endIndex = this.page * this.pageSize - 1
        this.startIndex = this.endIndex + 1 - this.pageSize
        this.$refs['vt-container'].scrollTop = 0
      }
    },
    watch: {
      selectedEditCell: function (val) {
        setTimeout(() => {
          if (val.id) {
            this.$refs[`vt-edit-input-${val.id}-${val.accessor}`][0].focus()
          }
        }, 1)
      },
      rows: function (val) {
        this.vtRows = addIds(this.rows).sort(defaultSort)
      },
      page: function () {
        this.paginationChange()
      },
      pageSize: function () {
        this.paginationChange()
      }
    },
    created () {
      this.tableWidth = this.columns.map(column => column.minWidth || 100).reduce((total, num) => total + num)
    }
  })
</script>

<style scoped>
td {
  padding: 10px 4px;
}
input {
  width: 100%;
}
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
.overline {
  text-decoration: overline;
}
.underline {
  text-decoration: underline;
}
.disabled {
  color: grey;
  cursor: none;
}
</style>
