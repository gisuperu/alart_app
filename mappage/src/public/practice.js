var mapobj; //mapオブジェクト
var pline; //map上の直線オブジェクト

function init() {
    let mapcenter = [34.6476991, 135.7589965];
    let mapZoom = 16;
    mapobj = L.map("mapid", {
        center : mapcenter,
        zoom : mapZoom,
        dragging : false,
        touchZoom : false,
        scrollWheelZoom : false,
        doubleClickZoom : false,
        boxZoom : false,
        tap : false,
        keyboard : false,
        closePopupOnClick : true,
        zoomControl : false
    });
    // mapobj.setView(mapcenter, mapZoom);
    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png", {
        attribution : "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(mapobj);

    // async evt => {
    //     let bd = {
    //         lat: mapcenter[0],
    //         lng: mapcenter[1],
    //         zoom: mapZoom,
    //     }
    //     console.log(bd)
    //     await fetch("/database", {
    //         method: "POST",
    //         body: "hogehogehoge",
    //         headers: {
    //             "Content-Type" : "application/json",
    //         },
    //     });
    // }

    mapobj.on("click", onMapClick); //地図のクリックイベントでonMapClick関数を呼び出す

    //plineをpolylineオブジェクトとし空座標を入れて地図に追加．
    //bubblingMouseEvents属性をfalseに設定して，イベントがmapobjオブジェクトに連鎖するのを防ぐ
    pline = L.polyline([], {color : "blue", width : 5, bubblingMouseEvents : false}).addTo(mapobj);
    pline.on("click", onLineClick); //clickイベントでonLineClick関数を呼び出す
};

function onMapClick(e) {
    pline.addLatLng(e.latlng); //plineにクリック地点の座標を追加
    let mk = L.marker(e.latlng).bindTooltip(e.latlng+"<br>クリックで削除可能").on("click", onMkClick).addTo(mapobj);
};

function onLineClick(e) {
    pline.setLatLngs([]);
};

function onMkClick(e) {
    let dots = pline.getLatLngs(e);
    dots.pop();
    pline.setLatLngs(dots);
    mapobj.removeLayer(e.target);
}