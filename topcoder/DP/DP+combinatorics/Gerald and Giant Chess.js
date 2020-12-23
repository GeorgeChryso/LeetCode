process.stdin.resume();process.stdin.setEncoding('utf-8');
let inp = '',cur = 0,readline=_=>inp[cur++]
process.stdin.on('data', inputStdin =>inp += inputStdin);
process.stdin.on('end', _ => {inp = inp.trim().split('\n').map(dqd =>dqd.trim());
    let [n,m,k]=readline().split(' ').map(d=>Number(d)),B=[]
    for(let i=0;i<k;i++)
      B.push(readline().split(' ').map(d=>Number(d)))
    console.log(''+solve(n,m,B))
});
let Arr=(n,m,val=0)=>(n!=1)?[...Array(n)].map(d=>[...Array(m)].map(d=>val)): [...Array(m)].map(d=>val)

//dp
let solvee=(n,m,B)=>{
    let mod=1e9+7
    let dp=Arr(n,m,0),isBlack={}
    for(let [x,y] of B)
        if(isBlack[x-1]===undefined)
            isBlack[x-1]=new Set([y-1])
        else
            isBlack[x-1].add(y-1)
    dp[0][0]=1
    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++){
            if(j>=1&&(!isBlack[i]||!isBlack[i].has(j-1)))
                dp[i][j]=(dp[i][j]+dp[i][j-1])%mod
            if(i>=1&&(!isBlack[i-1]||!isBlack[i-1].has(j)))
                dp[i][j]=(dp[i][j]+dp[i-1][j])%mod
        }        
    dp.forEach(d=>console.log(d))
    return dp[n-1][m-1]
}
//1 row op
let solve1=(n,m,B)=>{
    let mod=1e9+7
    B.sort(([x1,y1],[x2,y2])=>x1==x2?y1-y2:x1-x2)
    B.push([n-1,m-1])
    n=B.length
    let dp=Arr(1,n+1,0)
    /*
        Now, let dp[i] be the number of ways to reach the i-th blocked cell (assuming it is not blocked)
    */
    dp[0]=1
    for (let i = 0; i <= n; i++){
        for (let j = 0; j <i; j++){
            dp2[j]=0
            
        }    
    }   
    return dp[n]
}

let memo=new Map()
var combinations=(n,k,mod=BigInt(1e9+7))=>{
    let key=[n,k].toString()
    if(!memo.has(key)){
        let res
        if(k==0||n==k)
            res= 1n
        else
            res=(combinations(n-1,k-1)+combinations(n-1,k))%mod
        memo.set(key,res)
    }
    return memo.get(key)
}
let solve=(n,m,B)=>{
    let mod=BigInt(1e9+7)
    B=B.map(([x,y])=>[x-1,y-1])
    B.sort(([x1,y1],[x2,y2])=>x1==x2?y1-y2:x1-x2)
    B.push([n-1,m-1])
    n=B.length
    let dp=Arr(1,n+1,0n)

    let fact=[]
        invfact=[]
    
    /*
        Now, let dp[i] be the number of ways to reach the i-th blocked cell (assuming it is not blocked) from(1,1)
        avoiding all the inbetween  blocked cells
    */
    dp[0]=1n
    for (let i = 1; i <= n; i++){
        let [curx,cury]=B[i-1]
        dp[i]=combinations(curx+cury,curx,mod)
        for (let j = 1; j <i; j++){
            let [ox,oy]=B[j-1]
            if(ox<=curx&&oy<=cury){
                let x2=curx-ox,y2=cury-oy
                //  - the paths from (j->i)*paths(0->j)
                dp[i]=(dp[i]-(combinations(x2+y2,x2,mod)*dp[j])%mod)%mod 
                if(dp[i]<=0)
                    dp[i]=(dp[i]+mod)%mod
            }
        }    
    }  
    return dp[n]
}
