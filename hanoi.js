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

//Recursive Solution
function solve(board, n, source, aux, target){
    if(n > 1){
        solve(board, n-1, source, target, aux);
    }
        
    move(board, source, target);

    if(n > 1){
        solve(board, n-1, aux, source, target);
    }
}

//Iterative Solution
function solveIter(board, n)
{
    //each move is [n, src, targ, checked]
    moveStack = [];
    moveStack.push([n, 0, 1, 2, false]);
    while(moveStack.length > 0)
    {
        curMove = moveStack.pop();
        curN = curMove[0];
        curSrc = curMove[1];
        curAux = curMove[2];
        curTarg = curMove[3];
        curChecked = curMove[4];
        if(curN === 1 || curChecked)
        {
            move(board, curSrc, curTarg);
        }
        else
        {
            moveStack.push([curN-1, curAux, curSrc, curTarg, false]);
            moveStack.push([curN, curSrc, curAux, curTarg, true]);
            moveStack.push([curN-1, curSrc, curTarg, curAux, false]);
        }
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
    var disks = process.argv[3];
    var board = populate(disks);

    //solve(board, disks, 0, 1, 2);
    if(process.argv[2] == "recurse"){
        console.log("Running recursive algorithm...");
        console.time(`Time for ${disks} disks recursively`);
        solve(board, disks, 0, 1, 2);
        console.timeEnd(`Time for ${disks} disks recursively`);
    }
    else{
        console.log("Running iterative algorithm...");
        console.time(`Time for ${disks} disks iteratively`);
        solveIter(board, disks);
        console.timeEnd(`Time for ${disks} disks iteratively`);
    }

    console.log(board);
}
main();