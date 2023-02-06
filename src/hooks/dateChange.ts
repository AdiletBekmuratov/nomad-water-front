export function padTo2Digits(num: number) {
   return num.toString().padStart(2, '0');
 }

export function formatDate(date: Date) {
   return [
     padTo2Digits(date.getDate()),
     date.toLocaleString('en', { month: 'long' })
     //date.getFullYear()
   ].join(' ');
 }