const date=new Date()
const price=100

const Payment1= {date:new Date(date),amount:price/4}
const Payment2= {date:new Date(date.setMonth(date.getMonth()+4)),amount:price/4}
const Payment3= {date:new Date(date.setMonth(date.getMonth()+4)),amount:price/4}
const Payment4= {date:new Date(date.setMonth(date.getMonth()+4)),amount:price/4}
console.log(Payment1)
console.log(Payment2)
console.log(Payment3)
console.log(Payment4)
