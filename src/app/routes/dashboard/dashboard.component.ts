import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as echarts from 'echarts';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NzButtonModule, NzInputModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
})
export class DashboardComponent {
  visitData = [
    { x: 'Jan', y: 120 },
    { x: 'Feb', y: 180 },
    { x: 'Mar', y: 260 },
    { x: 'Apr', y: 220 },
    { x: 'May', y: 340 },
    { x: 'Jun', y: 420 },
    { x: 'Jul', y: 380 },
    { x: 'Aug', y: 480 },
    { x: 'Sep', y: 520 },
    { x: 'Oct', y: 460 },
    { x: 'Nov', y: 610 },
    { x: 'Dec', y: 720 },
  ];

  pieData = [
    {
      x: 'Customers',
      y: 72,
    },
    {
      x: 'Suppliers',
      y: 28,
    },
  ];
  contactGrowthOption = {
    tooltip: {
      trigger: 'axis',
    },

    grid: {
      left: 10,
      right: 10,
      top: 20,
      bottom: 20,
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },

    yAxis: {
      type: 'value',
    },

    series: [
      {
        data: [120, 180, 220, 280, 260, 340, 390, 420, 470, 520, 610, 700],

        type: 'line',

        smooth: true,

        areaStyle: {},

        lineStyle: {
          width: 4,
        },
      },
    ],
  };
}
