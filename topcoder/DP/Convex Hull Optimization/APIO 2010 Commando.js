// You are given:

// A sequence of N positive integers (1 <= N <= 10^6).
// The integer coefficients of a quadratic function f(x) = ax^2 + bx + c, where a < 0.
// The objective is to partition the sequence into contiguous subsequences such that the sum of f taken over all subsequences is maximized, where the value of a subsequence is the sum of its elements.


let Commando=(A,a,b,c)=>{
    let f=x=>a*(x**2)+b*x+c,n=A.length,prefixSum=[0]
    for(let i=0;i<n;i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+A[i])
    /*  
            dp[i]: Max achievable sum up to index i
        dp[i]=Max( dp[j]+ f( prefixSum[i+1]-prefixSum[j])) j<i  //essentially means pick [j,i] as the last group
    */
    let dp=[...Array(n+1)].map(d=>-Infinity)
    dp[0]=0
    for (let i = 1; i <=n; i++)
        for (let j = 0; j < i; j++) 
            dp[i]=Math.max(
                    dp[i],  
                    dp[j]+ f(prefixSum[i]-prefixSum[j])
                  )            
    return dp[n]
}

let tests=[
    [[2,2,3,4],-1,10,-20],
    [[1,2,3,4,5],-1,10,-20],
    [[100,12,3,4,5,2,4,2],-2,4,3]
]

//output 9 13 -19884
console.log(
    tests.map( ([A,a,b,c])=>Commando(A,a,b,c))
)


// O(N)
let CommandoCHT=(A,a,b,c)=>{

    let y=([M,C],x)=> M*x+C
    let Intersection=(l1,l2)=>{
        let [m1,c1]=l1,[m2,c2]=l2
        return {'x':(c2-c1)/(m1-m2),'y': (m1*(c2-c1)/(m1-m2)+c1)}
    }
    let n=A.length,prefixSum=[0]
    for(let i=0;i<n;i++)
        prefixSum.push(prefixSum[prefixSum.length-1]+A[i])
    /*  
            dp[i]: Max achievable sum up to index i
        dp[i]=Max( dp[j]+ f( prefixSum[i+1]-prefixSum[j])) j<i  //essentially means pick [j,i] as the last group
            So, in order to apply the CHT here:
            expand the formula of f, 
    
        dp[i]=Max( -2 a Pj *Pi  + aPj^2 -bPj+dp[j]) + bPi+c+aPi^2
            y=        M     x           c               
    
        So each line inside the queue is gonna be of the form [M,c]=[ -2*a*Pj, aPj^2 -bPj+dp[j]]

        whereas dp[i]= M*P[i]+C +bPi+c+aPi^2
    */
    let dp=[...Array(n+1)].map(d=>-Infinity),Q=[[0,0]]
    for (let i = 1; i <=n; i++){
        while(Q.length>=2&& y(Q[0],prefixSum[i])<=y(Q[1],prefixSum[i]))
            Q.shift()
        dp[i]= y(Q[0],prefixSum[i]) + b*prefixSum[i]+c+a*prefixSum[i]**2
        nextLine=[-2*a*prefixSum[i], a*prefixSum[i]**2-b*prefixSum[i]+dp[i]]
        while(Q.length>=2 && Intersection(nextLine,Q[Q.length-2]).x <= Intersection(Q[Q.length-2],Q[Q.length-1]).x )
            Q.pop()
        Q.push(nextLine)
    }
    return dp[n]
}

console.log(
    tests.map( ([A,a,b,c])=>CommandoCHT(A,a,b,c))
)





let t="59 29 3 17 27 65 62 34 100 99 92 8 90 10 23 72 65 99 59 25 56 59 70 40 20 63 97 41 39 82 97 85 58 5 48 60 16 6 22 44 24 13 47 34 18 75 34 73 37 79 66 41 99 39 68 38 45 10 12 53 57 72 20 70 34 19 87 39 22 15 41 79 46 56 88 62 41 58 46 100 9 30 84 45 55 67 30 4 17 67 16 47 7 63 36 93 49 45 29 61 50 8 36 42 42 89 57 52 39 40 44 90 30 60 88 4 72 83 68 63 19 41 40 94 68 45 78 27 45 89 82 91 63 13 11 14 100 2 3 83 25 15 68 50 31 5 87 78 99 8 46 46 12 77 81 23 48 52 58 88 38 21 26 16 58 43 89 47 56 21 41 63 2 97 42 33 85 69 29 84 43 76 47 94 3 81 75 17 48 74 80 27 58 11 8 49 53 56 16 100 19 37 29 25 2 76 10 63 43 88 66 98 5 72 76 55 40 58 62 53 67 41 96 73 79 29 13 93 66 29 22 42 49 5 53 89 54 30 3 71 1 99 50 83 83 65 90 16 19 16 50 66 93 39 49 62 88 10 66 9 9 55 56 80 76 15 42 34 13 82 6 62 3 100 37 28 35 1 31 37 49 59 82 45 82 67 64 37 82 18 21 81 52 72 22 95 14 86 24 61 63 8 23 83 66 92 86 13 49 82 63 55 81 24 8 38 47 73 57 78 68 53 74 16 65 38 76 79 22 6 99 65 49 27 78 87 57 40 62 41 3 86 36 46 75 13 10 84 100 53 96 46 66 15 91 79 44 24 61 27 1 91 2 63 77 81 15 69 16 74 29 72 11 11 84 93 76 60 45 79 7 55 65 37 76 64 70 61 75 85 7 7 98 61 75 62 50 89 62 98 32 24 91 59 8 36 33 89 35 99 1 77 70 71 39 22 75 100 17 7 80 23 96 68 37 64 24 95 97 87 38 14 4 20 52 10 27 53 89 30 16 64 73 19 16 49 43 82 82 15 38 57 6 57 29 58 22 16 30 18 8 28 44 100 40 88 87 24 63 74 48 87 96 86 59 76 33 45 25 36 30 37 9 2 26 23 29 4 2 34 5 42 70 78 4 81 97 23 41 58 36 22 60 8 26 29 89 38 38 3 85 77 97 26 12 62 75 69 38 7 68 60 36 72 63 86 94 52 73 17 98 91 31 76 60 78 6 20 36 53 42 47 7 41 6 7 61 46 53 27 50 38 92 43 45 35 64 52 9 86 15 26 74 96 58 21 67 61 80 57 72 62 18 50 62 67 22 2 46 22 84 13 14 14 23 28 54 16 8 57 31 94 44 41 57 1 59 66 90 20 69 67 72 29 32 66 12 39 59 5 85 45 57 23 98 55 88 89 92 58 95 63 30 29 62 20 70 57 2 63 25 100 4 10 18 73 82 69 67 79 4 66 7 64 87 70 90 56 59 4 91 94 50 84 59 50 80 15 43 40 14 84 52 16 66 10 88 75 92 9 92 84 61 11 39 82 82 48 62 54 85 47 82 80 28 46 94 58 23 48 38 87 87 49 70 25 42 91 71 34 44 56 38 25 74 22 15 64 15 2 9 24 29 92 71 31 45 95 30 61 57 4 88 86 73 59 68 23 100 46 87 79 56 96 11 80 4 21 69 62 85 57 13 18 63 46 64 83 14 53 81 74 32 3 65 20 21 28 19 81 84 61 28 57 68 95 1 33 83 59 38 19 89 87 4 62 40 12 38 34 38 98 81 86 72 93 40 26 70 94 17 11 19 57 89 77 14 36 85 45 93 84 66 35 13 18 71 54 87 96 5 33 17 53 19 92 80 59 90 36 92 35 6 66 40 91 35 71 28 83 95 15 28 80 29 36 75 20 53 30 44 1 49 95 16 90 99 97 68 83 64 68 84 17 56 38 59 77 67 26 1 84 47 85 87 95 43 71 22 19 44 7 99 27 21 49 22 97 85 44 64 11 40 1 73 51 17 94 1 37 55 22 22 66 13 100 23 41 55 11 27 82 54 5 81 10 11 90 55 78 20 86 5 89 6 1 79 100 31 7 69 53 39 29 6 44 80 19 59 66 90 21 57 64 52 83 65 82 45 64 27 85 74 47 6 99 84 61 18 10 20 61 43 75 65 41 29 43 25 99 67 14 36 88 44 67 54 77 72 44 84 43 79 22 97 94 27 16 32 64 35 4 96 43 16 18 11 74 63 40 80 15 63 29 21 22 45 42 68 97".split(' ').map(d=>Number(d))
console.log(Commando(
    t,-1,120,-1200
))
console.log(CommandoCHT(
    t,-1,120,-1200
))//1588599