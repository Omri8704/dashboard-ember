export default {
  colors: [
    '#8460EA',
    '#457FE5',
    '#DC6464',
    '#FAB566',
    '#F0D26E',
    '#987CEA',
    '#DC6464',
    '#FAB566',
    '#FAB566',
    '#F0D26E',
    '#EE6F27',
    '#BE3237'
  ],

  chart: {
    spacing: [20, 20, 20, 20],
    backgroundColor: null,
    style: {
      fontFamily: '"proxima_nova_alt_rgregular", sans-serif',
      color: '#555555'
    }
  },

  title: {
    style: {
      fontSize: '18px',
      fontWeight: 'bold'
    }
  },

  tooltip: {
    backgroundColor: '#ffffff',
    style: {
      color: '#6b7b90',
      fontSize: '14px'
    }
  },

  lang: {
      noData: "No Data Available"
  },

  noData: {
    style: {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#303030'
    }
  },

  legend: {
    padding: 20,
    backgroundColor: '#f7f7f9',
    align: 'center',
    verticalAlign: 'top',
    floating: false,
    borderWidth: 1,
    borderColor: '#c1d1dc',
    borderRadius: 2,
    itemStyle: {
      fontWeight: 'bold',
      fontSize: '14px'
    }
  },

  xAxis: {
    labels: {
      style: {
        color: '#6b7b90',
        fontSize: '14px'
      }
    },
    title: {
      style: {
        fontSize: '14px'
      }
    }
  },

  yAxis: {
    labels: {
      style: {
        color: '#6b7b90',
        fontSize: '14px'
      }
    },
    title: {
      style: {
        fontSize: '14px'
      }
    }
  },

  plotOptions: {

    series: {
      lineWidth: 1.5,
      marker: {
        fillColor: null,
        lineWidth: 2,
        lineColor: '#ffffff',
        radius: 5
      },
      states: {
        hover: {
          lineWidthPlus: 0.5
        }
      }
    },
    candlestick: {
      lineColor: '#404048'
    }
  },

  navigator: {
    xAxis: {
      gridLineColor: '#D0D0D8'
    }
  },

  rangeSelector: {
    buttonTheme: {
      fill: 'white',
      stroke: '#C0C0C8',
      'stroke-width': 1,
      states: {
        select: {
          fill: '#D0D0D8'
        }
      }
    }
  },

  scrollbar: {
    trackBorderColor: '#C0C0C8'
  },

  background2: '#E0E0E8',

  global: {
    timezoneOffset: new Date().getTimezoneOffset()
  }
}
