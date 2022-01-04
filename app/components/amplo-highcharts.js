import Ember from 'ember';
import Highcharts from 'ember-highcharts/components/high-charts';

export default Highcharts.extend({
  showLoading: null,

  toggleLoading: Ember.observer('showLoading', function() {
    if (this.get('showLoading')) {
      this.get('chart').showLoading();
    }
    else {
      this.get('chart').hideLoading();
    }
  }),

  buildOptions: Ember.computed('chartOptions', 'content.data.[]', function() {
    let chartOptions = $.extend(true, {}, this.get('theme'), this.get('chartOptions'));
    let chartContent = this.get('content.data.length') ? this.get('content.data') : [{
      id: 'noData',
      data: 0,
      color: '#aaaaaa'
    }];

    let defaults = { series: chartContent };
    return Ember.merge(defaults, chartOptions);
  }),

  _updateSeries() {
    const chart = this.get('chart');

    this.get('content.data').map( (series, index) => {
      if (chart.series[index]) {
        chart.series[index].update({
          name: series.name,
          data: series.data
        }, false);
      }
      else {
        chart.addSeries(series, false);
      }
    });
  },

  _deleteExtraSeries() {
    if (this.get('content.data.length') < this.get('chart').series.length) {
      while (this.get('content.data.length') < this.get('chart').series.length) {
        let lastEl = this.get('chart').series.pop()
        lastEl.remove(false);
        // decrement counters because highcharts doesn't handle it
        --this.get('chart').colorCounter;
        --this.get('chart').symbolCounter;
      }
    }
  },

  didReceiveAttrs() {
    if (!(this.get('content.data') && this.get('chart'))) {
      return;
    }

    let chart = this.get('chart');
    let noData = chart.get('noData');

    if (noData != null) {
      noData.remove();
    }

    return this.get('content.data').map((series, idx) => {
      if (chart.series[idx]) {
        return chart.series[idx].setData(series.data);
      } else {
        return chart.addSeries(series);
      }
    });

  },

  contentDidChange: Ember.observer('content.{data.[],yAxis}', function() {
    const chart = this.get('chart');

    /*
      highcharts-hack set yaxis title onto chart object so that you can access the property
      name in the custom highcharts tooltip
    */
    this.get('chart').__yAxis__ = this.get('content.yAxis');

    this.get('chart').yAxis[0].axisTitle.attr({
      text: this.get('content.yAxis')
    });

    if (!(this.get('content.data') && this.get('chart'))) {
      return;
    }

    Ember.run.once(this, function() {
      this._deleteExtraSeries();
      this._updateSeries();

      chart.redraw();
    })
  }),

});
