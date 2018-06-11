define([], function() {
  var headerArray;
  return {
    name: 'chapter_views_by_user',
    transformer: function() {
      this.transformHeader = function(header) {
        headerArray = header;
        return header;
      };
      this.transformRow = function(row) {
        var chaptersIndex = headerArray.indexOf('Chapters');
        var chaptersAry = row[chaptersIndex].split(',');
        var chapters = '';

        chaptersAry.forEach(function(chapter) {
          if (chaptersAry.indexOf(chapter) !== 0) {
            return (chapters += '<br/>' + chapter);
          } else {
            return (chapters += chapter);
          }
        });

        row[chaptersIndex] = chapters;

        return row;
      };
      this.onReportRendered = function() {};
    }
  };
});
