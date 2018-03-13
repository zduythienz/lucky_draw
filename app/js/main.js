var arrayCustomer = [
    {
        sdt: "01668888888",
        name: "Nguyễn Văn A",
        address: "HCM"
    },
    {
        sdt: "01668812388",
        name: "Nguyễn Văn B",
        address: "HCM"
    },
    {
        sdt: "01664556745",
        name: "Nguyễn Văn C",
        address: "HN"
    },
    {
        sdt: "04568867458",
        name: "Nguyễn Văn D",
        address: "HN"
    },
    {
        sdt: "01668269888",
        name: "Nguyễn Văn E",
        address: "HCM"
    },
    {
        sdt: "01668467388",
        name: "Nguyễn Văn F",
        address: "HCM"
    },
    {
        sdt: "01897666745",
        name: "Nguyễn Văn G",
        address: "HN"
    },
    {
        sdt: "04545345618",
        name: "Nguyễn Văn H",
        address: "HN"
    },
]
function startCount(){
    document.getElementById("main_sdt").value =  Math.floor((Math.random()*100000000000)+1)
}
var start;
var listCustomerFollowAddress = [];

//start spin
function startRandom() {
    //reset field
    document.getElementById('main_name').value = "";

    // get value of select
    var addressForSortElement = document.getElementById("main_addres"); 
    var addressForSort = addressForSortElement.options[addressForSortElement.selectedIndex].value;
    
    // selected address for spin
    if(addressForSort){ 
        listCustomerFollowAddress = arrayCustomer.filter(function( obj ) {
            //get list customer for spin
            return obj.address == addressForSort;
        });

        // start random number in FE
        start = setInterval('startCount()',10);

        // control button
        document.getElementById('btn_startRandom').setAttribute("hidden", true);
        document.getElementById('btn_endRandom').removeAttribute("hidden");
        document.getElementById('btn_chooseWinner').disabled = true;
    }else{
        alert("Vui lòng chọn nơi quay thưởng!!!")
    }
}
var winner = {};
//end spin 
function endRandom(){
    //select winnder's index
    var randomItem = listCustomerFollowAddress[Math.floor(Math.random()*listCustomerFollowAddress.length)];
    var winnderObj = listCustomerFollowAddress[randomItem];
    winner = randomItem;
    clearInterval(start);
    document.getElementById('main_sdt').value = randomItem.sdt;
    document.getElementById('main_name').value = randomItem.name;

    // control button
    document.getElementById('btn_startRandom').removeAttribute("hidden");
    document.getElementById('btn_endRandom').setAttribute("hidden", true);
    document.getElementById('btn_chooseWinner').disabled = false;
}
var listWinner = [];
//choose winner
function chooseWinner(){
    if(winner.sdt){
        // list winner
        listWinner.push(winner);
    
        //remove user have been choose
        var indexWinner = arrayCustomer.findIndex(x => x.sdt == winner.sdt);
        arrayCustomer.splice(indexWinner,1);
    
        // render list winner
        var text = "";
        var len = listWinner.length;
        for (var index = 0; index < len; index ++) {
            var stt = (index + 1) % 2 == 0 ? "Dự bị" : index + 1;
            text += '<div class="col-md-10 col-md-offset-2" style="padding-left:0; padding-right:0">';
            text += '<div class="name-contact">' + stt + '</div>';
            text += '<div class="wrap-contact3">';
            text += '<div class="contact2-form">';
            text += '<div class="winner-information-form">' + listWinner[index].sdt + '</div>';
            text += '<hr class="red-line">';
            text += '<div class="winner-information-form">' + listWinner[index].name + '</div>';
            text += '</div>';
            text += '</div>';
            text += '</div>';
        }
        document.getElementById('test').innerHTML = text;
        winner = {};
    }else{
        alert("Vui lòng quay số!!!")
    }
}