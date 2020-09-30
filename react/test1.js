// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S, K) {
    // Lets count the number of messages needed
    // let number_of_messages = Math.ceil(S.trim().length / K);
    const a = S.trim().split(' ');
    let msg = '';
    let arr = [];
    let i = 0;


    for(i = 0; i < a.length; i++) {
        if(a[i].length >= K) {
            let s = `.{1,${K}}`;
            let re = new RegExp(s, 'g');
            let a2 = a[i].match(re);
            arr = arr.concat(a2);
        } else {
            if((msg.trim() + a[i] + ' ').length < (K + 1)) {
                msg = msg.trim() + ' ' + a[i];
            } else {
                arr.push(msg);
                msg = a[i];
            }
        }
    }

    arr.push(msg)
    const number_of_messages = arr.length;
    return number_of_messages;
}
