import axios from '@/libs/api.request'
import Vue from 'vue'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getData = (name, path) => {
  // return axios.request({
  //   url: 'get_table_data',
  //   method: 'get'
  // })
  const filterData = []
  const data = sessionStorage.getItem('originalData')
  const originalData = {
    'histories': [
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'API', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'Batch', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'POST', grade: 1, end_time: '2018/12/11', attribution_application: 'Batch', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'POST', grade: 0, end_time: '2018/12/11', attribution_application: 'Fuse', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'Batch', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'API', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'API', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'Batch', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'POST', grade: 0, end_time: '2018/12/11', attribution_application: 'Batch', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'POST', grade: 0, end_time: '2018/12/11', attribution_application: 'Fuse', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'Batch', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 },
      { occurrence_time: '2018/12/12', task_type: 'OPTION', grade: 0, end_time: '2018/12/11', attribution_application: 'API', attribution_nterface: 789, interface_description: 787, alarm_information: 232, current_value: 0 }
    ]
  }
  if (data) {
    originalData.histories = JSON.parse(data)
  }
  sessionStorage.setItem('originalData', JSON.stringify(originalData.histories))
  debugger
  for (let i = 0; i < originalData.histories.length; i++) {
    if (name && !path) {
      if (originalData.histories[i].attribution_application.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
        const filterCol = originalData.histories[i]
        filterData.push(filterCol)
      } else if (name === 'All') {
        const filterCol = originalData.histories[i]
        filterData.push(filterCol)
      }
    } else if (!name && path) {
      if (originalData.histories[i].task_type.toLowerCase().indexOf(path.toLowerCase()) !== -1) {
        const filterCol = originalData.histories[i]
        filterData.push(filterCol)
      }
    } else if (name && path) {
      if (originalData.histories[i].attribution_application.toLowerCase().indexOf(name.toLowerCase()) !== -1 && originalData.histories[i].task_type.toLowerCase().indexOf(path.toLowerCase()) !== -1) {
        const filterCol = originalData.histories[i]
        filterData.push(filterCol)
      } else if (name === 'All') {
        const filterCol = originalData.histories[i]
        filterData.push(filterCol)
      }
    } else {
      const filterCol = originalData.histories[i]
      filterData.push(filterCol)
    }
  }
  console.log('filterData', filterData)
  return filterData
}

export const removeData = (index) => {
  // return axios.request({
  //   url: 'get_table_data',
  //   method: 'get'
  // })
  const data = sessionStorage.getItem('originalData')
  const dataArray = JSON.parse(data)
  dataArray.splice(index, 1)
  sessionStorage.setItem('originalData', JSON.stringify(dataArray))
  return dataArray
}

export const addData = (newArray) => {
  const data = sessionStorage.getItem('originalData')
  const dataArray = JSON.parse(data)
  dataArray.push(newArray)
  sessionStorage.setItem('originalData', JSON.stringify(dataArray))
  return dataArray
}
export const editData = (index, form) => {
  const data = sessionStorage.getItem('originalData')
  const dataArray = JSON.parse(data)
  Vue.set(dataArray, index, form)
  sessionStorage.setItem('originalData', JSON.stringify(dataArray))
  return dataArray
}
