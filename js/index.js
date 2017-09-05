$(document).ready(function() {
  //Get Beyond the Summit Stream Info and Status API Call
  var online = true;
  var offline = true;

  function loadData() {
    var userList = [];
    var followerURL = "https://api.twitch.tv/kraken/users/beyondthesummit/follows/channels/";
    $.getJSON(followerURL, function(data2) {
      for (var i = 0; i < data2.follows.length; i++) {
        var displayName = data2.follows[i].channel.display_name;
        userList.push(displayName);
      }
      userList.push("1337_Dota_2");
      userList.push("Dilkington");
      userList.push("beyondthesummit");
      userList.push("YapzOrdota");
      userList.push("Dota2ruhub");
      userList.push("AdmiralBulldog");

      for (var j = 0; j < userList.length; j++) {
        var url2 = "https://api.twitch.tv/kraken/streams/" + userList[j] + "/?callback=?";

        $.getJSON(url2).done(function(data3) {
          var logo;
          var status;
          var name;
          if (data3.error && offline === true) {
            logo = "http://res.cloudinary.com/jamesriall/image/upload/v1467307525/offline_fn9lz6.png";
            name = data3.message;
            status = data3.error;
            $("#followerInfo").prepend("<div class='row user-row' id='not-found'>" + "<div class='col-md-2'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-6'>" + status + "</div></div>");
          }
          if (data3.stream === null) {
            $.getJSON(data3._links.channel, function(data5) {
              status = "OFFLINE";
              logo = data5.logo;
              name = data5.display_name;
              var offlineChannelUrl = data5.url;
              if (logo === null) {
                logo = "http://res.cloudinary.com/jamesriall/image/upload/v1467309128/No_Logo_wt4l5x.png";
              }
              if (offline === true) {
                $("#followerInfo").prepend("<a href='" + offlineChannelUrl + "' target='_blank'>" + "<div class='row user-row' id='offline'>" + "<div class='col-md-2'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-6'>" + status + "</div></div></a>");
              }
            });
          }

        });
      }
      for (var i = 0; i < userList.length; i++) {
        var onlineURL = "https://api.twitch.tv/kraken/streams/" + userList[i];
        $.getJSON(onlineURL, function(data4) {
          if (logo === null) {
            logo = "http://res.cloudinary.com/jamesriall/image/upload/v1467309128/No_Logo_wt4l5x.png";
          }
          var logo = data4.stream.channel.logo;
          var status = data4.stream.channel.status;
          var name = data4.stream.channel.display_name;
          var channelurl = data4.stream.channel.url;
          if (status && online === true || !status) {
            $("#followerInfo").prepend("<a href='" + channelurl + "' target='_blank'>" + "<div class='row user-row' id='online'>" + "<div class='col-md-2'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-6'>" + status + "</div></div></a>");
          }
        });
      }
    });
  }
  loadData();

  $("#online-button").click(function() {
    $("button").css("background", "#515151");
    $(this).css("background", "green");
    offline = false;
    online = true;
    $(".user-row").remove();
    loadData();
  });

  $("#offline-button").click(function() {
    $("button").css("background", "#515151");
    $(this).css("background", "green");
    online = false;
    offline = true;
    $(".user-row").remove();
    loadData();
  });

  $("#all-button").click(function() {
    $("button").css("background", "#515151");
    $(this).css("background", "green");
    online = true;
    offline = true;
    $(".user-row").remove();
    loadData();
  });

});
