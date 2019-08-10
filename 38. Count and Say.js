// The count-and-say sequence is the sequence of integers with the first five terms as following:

// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
// 1 is read off as "one 1" or 11.
// 11 is read off as "two 1s" or 21.
// 21 is read off as "one 2, then one 1" or 1211.

// Given an integer n where 1 ≤ n ≤ 30, generate the nth term of the count-and-say sequence.

// Note: Each term of the sequence of integers will be represented as a string.

 


var countAndSay = function(n) {
    
};



var countAndSay=(x)=>{
    if(x==1){return '1'}
    let z=countAndSay(x-1).split('')
    let cont=[]
    
    for (let i = 0; i < z.length; i++) {
        let c=0
        for (var j = i; j<z.length&&z[i]==z[j]; j++) {
            c++
        }
        cont.push(c,z[i])
        i=j-1
    }
    return cont.join('')
}

var countAndSay=(x)=>{
    if(x==1){return '1'}
    let z=countAndSay(x-1)
    let cont=''
    
    for (let i = 0; i < z.length; i++) {
        let c=0
        for (var j = i; j<z.length&&z.charAt(i)==z.charAt(j); j++) {
            c++
        }
        cont=cont+c+z.charAt(i);
        i=j-1
    }
    return cont
}

console.log(
    countAndSay(
        5
    )
)