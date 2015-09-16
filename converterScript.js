(function () {
  var Defaults = {
    itemListLayout: 'List_Layout_1',
    itemListBgImage: "",
    itemDetailsBgImage: "",
    description: '<p>&nbsp;<br></p>'
  };

  var fetchUserName = function (rssUrl) {
    var regex = /vimeo\.com\/([a-zA-Z0-9_\-]{1,})\/?/;
    var res = rssUrl.match(regex);
    if (res && res.length) {
      return res.pop();
    } else {
      return null;
    }
  };

  var getFeedUrl = function (rssUrl) {
    var userName = fetchUserName(rssUrl);
    if (userName)
      return "https://vimeo.com/" + userName;
    else
      return null;
  };

  var getPlayListId = function (rssUrl) {

  };

  var _convertTo = function (section) {

    // Check if the plugin data is for Vimeo
    if (section.Title == "Vimeo" && section.EventSource == "feed") {
      //Check if RSS feed is valid and we have valid UserName
      if (fetchUserName(section.RssUrl)) {
        var vimeoInfo = {
          content: {
            carouselImages: [],
            description: section.Summary || "",
            type: "Channel Feed",
            rssUrl: getFeedUrl(section.RssUrl),
            feedID: fetchUserName(section.RssUrl)
          },
          design: {
            itemListLayout: Defaults.itemListLayout,
            itemListBgImage: Defaults.itemListBgImage,
            itemDetailsBgImage: Defaults.itemDetailsBgImage
          }
        };
        return {
          vimeoInfo: vimeoInfo
        };
      } else
        return null;
    }
  };

  var VimeoMigrator = (function () {
    var VimeoMigrator = {
      convert: function (oldInfo) {
        var currentVimeoList = [];
        var content = oldInfo.Content;
        if (typeof content == 'undefined') {
          return currentVimeoList;
        }
        var sections = content.Sections;
        var widgetInfo = content.Info;
        if (!Array.isArray(sections)) {
          return currentVimeoList;
        }
        sections.forEach(function (section) {
          var convertedData = _convertTo(section);
          if (convertedData)
            currentVimeoList.push(convertedData);
          else
            console.log("Error converting data for Id: " + section.Id);
        });
        return currentVimeoList;
      }
    };
    return VimeoMigrator;
  })();
  exports = module.exports = VimeoMigrator;
})();