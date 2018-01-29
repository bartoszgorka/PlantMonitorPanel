import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['description', 'labels', 'data', 'background'],
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.description,
          backgroundColor: this.background,
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
