var sum_to_n_a = function(n: number) {
    // your code here
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
   
};

var sum_to_n_b = function(n: number) {
    // your code here
    return n * (n + 1) / 2;
   
};

var sum_to_n_c = function(n:number) {
    // your code here
    return  Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc + val, 0);
};


