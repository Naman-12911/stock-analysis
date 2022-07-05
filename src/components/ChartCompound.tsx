import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'
import "../css/Chart.css"
import { YearlyCompounds, yearly_compounds, get_years } from './compound/calculation.ts';
import { initGA, PageView, Event } from './compound/tracking.ts';

export const ChartCompound = () => {
  const [years, setYears] = useState(0);
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [monthlyContributions, setMonthlyContributions] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);

  useEffect(() => {
    initGA();
    PageView();
  }, []);

  useEffect(() => {
    let chart: any;
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const options: YearlyCompounds = {
      years: years,
      principal: initialDeposit,
      monthlyContribution: monthlyContributions,
      interestRate: annualInterestRate / 100.0,
    }

    const yearlyCompounds = yearly_compounds(options)

    const labels: string[] = get_years(options.years);

    chart = new Chart(context, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '₹ per year',
          data: yearlyCompounds,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderWidth: 2,
          borderColor: "skyblue"
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        },
      }
    });

    return () => {
      chart.destroy()
    };
  }, [years, initialDeposit, monthlyContributions, annualInterestRate]);

  const handleYearsChange = (years: number) => {
    Event({ category: 'input', action: 'change', label: "handleYearsChange" })
    setYears(years);
  }
  const handleInitialDepositChange = (deposit: number) => {
    Event({ category: 'input', action: 'change', label: "handleInitialDepositChange" })
    setInitialDeposit(deposit);
  }

  const handleMonthlyContributionsChange = (contribution: number) => {
    Event({ category: 'input', action: 'change', label: "handleMonthlyContributionsChange" })
    setMonthlyContributions(contribution);
  }

  const handleAnnualInterestRateChange = (annualRate: number) => {
    Event({ category: 'input', action: 'change', label: "handleAnnualInterestRateChange" })
    setAnnualInterestRate(annualRate)
  }

  return (
    <>
      <div className="container">
        <h1 className="title" id="text-align-center">Calculate the Compound Interst</h1>
        <div className="field is-grouped decoration">
          <div className="control ">
            <label className="label">Years </label>
            <input className="input"
              min="0"
              type="number"
              placeholder="years"
              value={years}
              onChange={(e) => handleYearsChange(parseInt(e.target.value))} />
          </div>
          <div className="control">
            <label className="label">Principal Amt </label>
            <input className="input"
              min="0"
              type="number"
              placeholder="Principal Amount"
              value={initialDeposit}
              onChange={(e) => handleInitialDepositChange(parseInt(e.target.value))} />
          </div>
          <div className="control">
            <label className="label">Monthly Amt </label>
            <input className="input"
              min="0"
              type="number"
              placeholder="Monthly Amount"
              value={monthlyContributions}
              onChange={(e) => handleMonthlyContributionsChange(parseInt(e.target.value))} />
          </div>
          <div className="control">
            <label className="label">Yearly Interest rate </label>
            <input className="input"
              type="number"
              placeholder="Yearly Interest rate %"
              value={annualInterestRate}
              onChange={(e) => handleAnnualInterestRateChange(parseInt(e.target.value))} />
          </div>
        </div>
        <div className="container">
          <canvas id="chart" width="20" height="200"></canvas>
        </div>
      </div>
    </>
  )
}
export {}

export default ChartCompound;