import 'sugar';
import 'flot/jquery.flot';
import 'flot/jquery.flot.categories';

let chart = () => {
  let parseDataForCharts = (sourceArray, sourceProp,
      referenceArray, referenceProp) => {

      var data = [];
      referenceArray.each(function (r) {
          var count = sourceArray.count(function (s) {
              return s[sourceProp] == r[referenceProp];
          });
          data.push([r[referenceProp], count]);
      });
      return data;
  };

  let linker = (scope, element, attrs) => {
      scope.$watch('sourceArray', function () {
          scope.data = parseDataForCharts(
              scope.sourceArray,
              attrs['sourceProp'],
              scope.referenceArray,
              attrs['referenceProp']
          );

          if ($(element).is(':visible')) {
              $.plot(element, [ scope.data ], {
                  series: {
                      bars: {
                          show: true,
                          barWidth: 0.6,
                          align: "center"
                      }
                  },
                  xaxis: {
                      mode: "categories",
                      tickLength: 0
                  }
              });
          }
      });
  };

  return {
      restrict: 'A',
      link: linker,
      scope: {
          sourceArray: '=',
          referenceArray: '='
      }
  };
}

export default chart;
