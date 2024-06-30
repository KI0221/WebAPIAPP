$(document).ready(function () {
    $('#randomBtn').click(function(){
    // ランダムな郵便番号を作る
    const randomPostalCode = NewRandomPostalCode();
    $('#postalCode').text(`郵便番号:${randomPostalCode}`);

    // 郵便番号から住所を取得する（郵便番号APIを利用する）
    $.getJSON(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${randomPostalCode}`,function(data){
        if (data.results) {
            // 複数の部分（都道府県、市区町村、町域）を連結させる
            const address = data.results[0].address1 + data.results[0].address2 + data.results[0].address3;
            $('#address').text(`住所: ${address}`);
        } else {
            $('#address').text('住所が見つかりません');
        }
    }).fail(function() {
        $('#address').text('エラーが発生しました');
    });
    });

    function NewRandomPostalCode(){
        // 生成された郵便番号を格納する変数を初期化する
        let postalCode = '';
        // ７桁の数字をランダムに作成する
        for(let i = 0; i < 7 ; i ++){
        // 0から９までのランダムな整数を生成し、postalCodeに表示する
        postalCode += Math.floor(Math.random()*10)
        }
        return postalCode;            
    }
});
