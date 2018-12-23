<template inline-template>
  <div class="v-table-container">
    <table :width="tableWidth">
      <thead>
        <tr>
          <th style="padding-bottom: 20px" :colspan="this.columns.length">
            <b>Search</b>
            <input v-model="searchValue" v-on:input="changeFilterValue" />
          </th>
        </tr>
        <tr>
          <th
            v-for="column in columns"
            v-on:click="changeSortedCol(column.accessor)"
            :class="headerLineStyle(column.accessor)">
              {{ column.header }}
          </th>
        </tr>
        <tr>
          <td
            v-for="filteredCol in filteredCols">
            <input v-model="filteredCol.value" v-on:input="changeFilterValue" />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in vtRows">
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
      <tfoot>

      </tfoot>
    </table>
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
  const defaultSort = (a, b) => {
    return a.id > b.id ? 1 : -1
    return a.id < b.id ? -1 : 1
    return 0
  }
  const defaultSelectedEditCell = {
    id: null,
    accessor: '',
    onChange: null,
    originalValue: null,
  }

  export default Vue.component('VueTable', {
    props: ['columns', 'rows'],
    data () {
      return {
        vtRows: [],
        searchValue: '',
        selectedEditCell: defaultSelectedEditCell,
        sortedCol: {
          direction: '',
          accessor: '',
        },
        tableWidth: 0,
      }
    },
    computed: {
      filteredCols: function () {
        let fitlteredObj = {}
        this.columns.forEach(col => {
          fitlteredObj[col.accessor] = {
            filterMethod: col.filterMethod,
            value: ''
          }
        })

        return fitlteredObj
      }
    },
    methods: {
      changeEditCol: function (id, column, originalValue) {
        this.selectedEditCell = {
          id,
          accessor: column.accessor,
          onChange: column.onChange,
          originalValue: originalValue,
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
        let newRows = [ ...addIds(this.rows) ];

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
            const re = new RegExp(String(selectedFilterCol.value), 'i');
            newRows = newRows.filter(row => String(row[accessor]).search(re) >= 0)
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
              if(a[this.sortedCol.accessor].toLowerCase() < b[this.sortedCol.accessor].toLowerCase()) { 
                return this.sortedCol.direction === 'ascending' ? -1 : 1;
              }
              if(a[this.sortedCol.accessor].toLowerCase() > b[this.sortedCol.accessor].toLowerCase()) {
                return this.sortedCol.direction === 'ascending' ? 1 : -1;
              }
              return 0;
            } else if (typeof this.rows[0][this.sortedCol.accessor] === 'number') {
              if(a[this.sortedCol.accessor] < b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? -1 : 1;
              }
              if(a[this.sortedCol.accessor] > b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? 1 : -1;;
              }
              return 0;
            } else if (typeof this.rows[0][this.sortedCol.accessor] === 'boolean') {
              if(a[this.sortedCol.accessor] && !b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? -1 : 1;
              }
              if(!a[this.sortedCol.accessor] && b[this.sortedCol.accessor]) {
                return this.sortedCol.direction === 'ascending' ? 1 : -1;;
              }
              return 0;
            }
          })
        }

        return newRows.sort(defaultSort)
      }
    },
    watch: {
      selectedEditCell: function (val) {
        setTimeout(() => {
          if (val.id) {
            this.$refs[`vt-edit-input-${val.id}-${val.accessor}`][0].focus()
          }
        }, 1);
      },
      rows: function (val) {
        this.vtRows = addIds(this.rows).sort(defaultSort)
      }
    },
    created () {
      this.tableWidth = this.columns.map(column => column.minWidth || 100).reduce((total, num) => total + num)
    },
  })
</script>

<style scoped>
.v-table-container {
  width: 90vw;
  overflow: auto;
}
table {

}
th {
  cursor: pointer;
}
td {
  padding: 10px 1px;
}
input {
  width: 100%;
}
.overline {
  text-decoration: overline;
}
.underline {
  text-decoration: underline;
}
.header {

}
.column {

}
.row {

}
</style>
