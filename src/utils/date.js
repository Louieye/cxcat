export function formatDate(time) {
    var da = parseInt(time)
    da = new Date(da)
    var year = da.getFullYear()+''
    var month = da.getMonth()+1+''
    var date = da.getDate()+''
    return [year,month,date].join('-')
}