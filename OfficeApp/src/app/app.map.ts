export class MapCreator{
    static HeatMap(map,objects){

          var layer = Loca.visualLayer({
            container: map,
            type: 'heatmap',
            shape: 'normal'
          });
    
          var list = [];
          var i = -1, length = objects.length;
          while (++i < length) {
            var item = objects[i];
            if(i==0){
                //alert(JSON.stringify(item));
            }
            list.push({
              coordinate: [item.lng, item.lat],
              count: item.index
            })
          }
    
          layer.setData(list, {
            lnglat: 'coordinate',
            value: 'count'
          });
    
          layer.setOptions({
            style: {
              radius: 25,
              opacity: [0.1, 0.9],
            },
            gradient: {
              0.5: '#2c7bb6',
              0.65: '#abd9e9',
              0.7: '#ffffbf',
              0.9: '#fde468',
              1.0: '#d7191c'
            }
          });
    
          layer.render();
    }
}