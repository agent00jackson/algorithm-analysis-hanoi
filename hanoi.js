function safePush(board, dest, disk){
    var pole = board[dest];
    var last = pole[pole.length - 1];
    if(last == null || last > disk){
        pole.push(disk);
    }
    else{
        throw `WRONG!\n${board}`;
    }
}

function move(board, source, dest){
    var popped = board[source].pop();
    if(popped == null)
    {
        return;
    }
    console.log(`Moving disk ${popped} from pole ${source} to pole ${dest}`);
    safePush(board, dest, popped);
}

function solve(board, n, source, aux, target){
    if(n > 1){
        solve(board, n-1, source, target, aux);
    }
        
    move(board, source, target);

    if(n > 1){
        solve(board, n-1, aux, source, target);
    }
}

function solveIter(board, n)
{
    var src = 0;
    var aux = 1;
    var targ = 2;
    var src_temp = 2;

    while(board[2].length < n)
    {
        targ = src_temp;

        move(board, src, aux);
        move(board, src, targ);
        move(board, aux, targ);

        src_temp = src;
        src = aux;
        aux = targ;
    }
}

function populate(n)
{
    var res = [];
    for(var i = n-1; i >= 0; i--)
    {
        res.push(i);
    }

    return [
        res,
        [],
        []
    ];
}

function main(){
    var disks = 3;
    var board = populate(disks);

    //solve(board, disks, 0, 1, 2);
    solveIter(board, disks);
    console.log(board);
}

main();