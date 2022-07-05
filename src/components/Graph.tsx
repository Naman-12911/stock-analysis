import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'

import { YearlyCompounds, yearly_compounds, get_years } from './compound/calculation';
import { initGA, PageView, Event } from './compound/tracking';

export const Graph = () => {
  const [years, setYears] = useState(15);
  const [initialDeposit, setInitialDeposit] = useState(150);
  const [monthlyContributions, setMonthlyContributions] = useState(25);
  const [annualInterestRate, setAnnualInterestRate] = useState(7);

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
          label: '$ per year',
          data: yearlyCompounds,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderWidth: 2,
          borderColor: "red"
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
        <h1 className="title">Compound Interests with monthly contributions</h1>
        <div className="field is-grouped">
          <div className="control">
            <label className="label">Years</label>
            <input className="input"
              min="0"
              type="number"
              placeholder="years"
              value={years}
              onChange={(e) => handleYearsChange(parseInt(e.target.value))} />
          </div>
          <div className="control">
            <label className="label">Initial Deposit</label>
            <input className="input"
              min="0"
              type="number"
              placeholder="Initial deposit $"
              value={initialDeposit}
              onChange={(e) => handleInitialDepositChange(parseInt(e.target.value))} />
          </div>
          <div className="control">
            <label className="label">Monthly Contributions</label>
            <input className="input"
              min="0"
              type="number"
              placeholder="Monthly contributions $"
              value={monthlyContributions}
              onChange={(e) => handleMonthlyContributionsChange(parseInt(e.target.value))} />
          </div>
          <div className="control">
            <label className="label">Annual Interest rate</label>
            <input className="input"
              type="number"
              placeholder="Annual Interest rate %"
              value={annualInterestRate}
              onChange={(e) => handleAnnualInterestRateChange(parseInt(e.target.value))} />
          </div>
        </div>
        <div className="container">
          <canvas id="chart" width="400" height="400"></canvas>
        </div>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Hello, my name is Diogo Batista.
          </p>
          <p>
            If you liked this small tool, check out my linkedin:
            <a onClick={() => {
              Event({ category: 'link', action: 'click', label: "linkedin_profile" })
            }} href="https://www.linkedin.com/in/diogobvbatista/" target="_blank" rel="noopener noreferrer"> Diogo Batista</a> <br />
            From time to time I share my small tools and tests with you all 😎
          </p>
          <p>
            Check out the medium articles for this tool <br />
            <a onClick={() => {
              Event({ category: 'link', action: 'click', label: "medium_post_1" })
            }} href="https://medium.com/@diogobv.batista/a-story-about-a-graph-part-1-77fc29977322" target="_blank" rel="noopener noreferrer"> A story about a graph (Part 1)</a>
            <a onClick={() => {
              Event({ category: 'link', action: 'click', label: "medium_post_2" })
            }} href="https://medium.com/@diogobv.batista/a-story-about-a-graph-part-2-e70daa91c9a9" target="_blank" rel="noopener noreferrer"> A story about a graph (Part 2)</a>
          </p>
        </div>
      </footer>
    </>
  )
}
export {}

export default Graph;